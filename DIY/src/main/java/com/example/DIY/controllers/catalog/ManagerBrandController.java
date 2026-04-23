package com.example.DIY.controllers.catalog;

import com.example.DIY.dtos.catalog.BrandResponse;
import com.example.DIY.entities.catalog.Brand;
import com.example.DIY.repositories.catalog.BrandRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/manager/brands")
@RequiredArgsConstructor
public class ManagerBrandController {

    private final BrandRepository brandRepository;

    @GetMapping
    public ResponseEntity<List<BrandResponse>> getAllBrands() {
        List<BrandResponse> responses = brandRepository.findAll().stream()
                .map(brand -> BrandResponse.builder()
                        .id(brand.getId())
                        .name(brand.getName())
                        .build())
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }
}
