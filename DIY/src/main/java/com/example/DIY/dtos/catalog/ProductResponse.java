package com.example.DIY.dtos.catalog;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponse {
    private Long id;
    private String name;
    private String slug;
    private String brandName;
    private String categoryName;
    private String thumbnailUrl;
    private BigDecimal minPrice;
    private BigDecimal maxPrice;
    private BigDecimal minOriginalPrice;
    private boolean hasDiscount;
    private Double rating;
    private String ribbon;
    private boolean active;
    private String description;
    private String specifications;

    // Odoo fields
    private String productType;
    private String internalReference;
    private String barcode;
    private String internalNote;
    private String shortDescription;
    private boolean canBeSold;
    private boolean canBePurchased;
    private Double salesTax;
    private Double purchaseTax;
}
