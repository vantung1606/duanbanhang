package com.example.DIY.controllers.catalog;

import com.example.DIY.dtos.catalog.ProductFilterRequest;
import com.example.DIY.dtos.catalog.ProductDetailResponse;
import com.example.DIY.dtos.catalog.ProductResponse;
import com.example.DIY.services.catalog.CatalogService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/public/catalog")
@RequiredArgsConstructor
public class CatalogController {

    private final CatalogService catalogService;

    @GetMapping
    public ResponseEntity<Page<ProductResponse>> getCatalog(@ModelAttribute ProductFilterRequest request) {
        return ResponseEntity.ok(catalogService.getFilteredProducts(request));
    }

    @GetMapping("/{slug}")
    public ResponseEntity<ProductDetailResponse> getProductDetail(@PathVariable String slug) {
        return ResponseEntity.ok(catalogService.getProductDetail(slug));
    }
}
