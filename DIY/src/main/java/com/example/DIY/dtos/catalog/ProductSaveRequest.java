package com.example.DIY.dtos.catalog;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductSaveRequest {
    private String name;
    private String slug;
    private String description;
    private Long categoryId;
    private Long brandId;
    private String imageUrl;
    private String ribbon;
    private boolean active = true;
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

    private List<VariantRequest> variants;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class VariantRequest {
        private String sku;
        private BigDecimal price;
        private BigDecimal originalPrice;
        private Integer stock;
        private boolean isStockUnlimited;
        private List<Long> attributeValueIds;
    }
}
