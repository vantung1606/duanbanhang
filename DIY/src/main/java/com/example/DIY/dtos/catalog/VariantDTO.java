package com.example.DIY.dtos.catalog;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VariantDTO {
    private Long id;
    private String sku;
    private BigDecimal price;
    private Integer stockQuantity;
    private Set<AttributeValueDTO> attributeValues;
}
