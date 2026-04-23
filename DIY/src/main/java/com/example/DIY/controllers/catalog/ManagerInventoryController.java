package com.example.DIY.controllers.catalog;

import com.example.DIY.dtos.catalog.InventoryResponse;
import com.example.DIY.entities.catalog.InventoryLog;
import com.example.DIY.entities.catalog.ProductVariant;
import com.example.DIY.entities.iam.User;
import com.example.DIY.repositories.catalog.InventoryLogRepository;
import com.example.DIY.repositories.catalog.ProductVariantRepository;
import com.example.DIY.repositories.iam.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/manager/inventory")
@RequiredArgsConstructor
public class ManagerInventoryController {

    private final ProductVariantRepository productVariantRepository;
    private final InventoryLogRepository inventoryLogRepository;
    private final UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<InventoryResponse>> getInventory() {
        List<InventoryResponse> responses = productVariantRepository.findAll().stream()
                .map(variant -> {
                    String attributes = variant.getAttributeValues().stream()
                            .map(av -> av.getAttribute().getName() + ": " + av.getValue())
                            .collect(Collectors.joining(", "));
                    
                    return InventoryResponse.builder()
                            .variantId(variant.getId())
                            .productName(variant.getProduct().getName())
                            .sku(variant.getSku())
                            .attributes(attributes.isEmpty() ? "Bản chuẩn" : attributes)
                            .currentStock(variant.getStockQuantity())
                            .warehouseName("Kho Chính (Hà Nội)") // Default for now
                            .build();
                })
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }

    @PostMapping("/adjust")
    @Transactional
    public ResponseEntity<Void> adjustStock(@RequestBody com.example.DIY.dtos.catalog.InventoryAdjustmentRequest request) {
        ProductVariant variant = productVariantRepository.findById(request.getVariantId())
                .orElseThrow(() -> new RuntimeException("Variant not found"));

        // Update stock
        variant.setStockQuantity(variant.getStockQuantity() + request.getAmount());
        productVariantRepository.save(variant);

        User admin = userRepository.findByUsername("admin").orElse(null);

        // Log transaction
        InventoryLog log = InventoryLog.builder()
                .variant(variant)
                .changeAmount(request.getAmount())
                .reason(request.getReason())
                .performedBy(admin)
                .build();
        
        inventoryLogRepository.save(log);

        return ResponseEntity.ok().build();
    }
}
