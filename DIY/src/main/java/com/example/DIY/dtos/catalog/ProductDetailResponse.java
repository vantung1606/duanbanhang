package com.example.DIY.dtos.catalog;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductDetailResponse {
    private Long id;
    private String name;
    private String slug;
    private String description;
    private String brandName;
    private String categoryName;
    private List<String> imageUrls;
    private List<VariantDTO> variants;
    private String specifications;
    
    // Summary
    private Double rating;
    private Integer reviewCount;
}
