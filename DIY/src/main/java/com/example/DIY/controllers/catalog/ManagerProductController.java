package com.example.DIY.controllers.catalog;

import com.example.DIY.dtos.catalog.ProductResponse;
import com.example.DIY.dtos.catalog.ProductSaveRequest;
import com.example.DIY.services.catalog.ProductAdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/manager/products")
@RequiredArgsConstructor
public class ManagerProductController {

    private final ProductAdminService productAdminService;

    @GetMapping
    public ResponseEntity<List<ProductResponse>> getAllProducts() {
        return ResponseEntity.ok(productAdminService.getAllProductsForAdmin());
    }

    @PostMapping
    public ResponseEntity<ProductResponse> createProduct(@RequestBody ProductSaveRequest request) {
        return ResponseEntity.ok(productAdminService.createProduct(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductResponse> updateProduct(@PathVariable Long id, @RequestBody ProductSaveRequest request) {
        return ResponseEntity.ok(productAdminService.updateProduct(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productAdminService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
}
