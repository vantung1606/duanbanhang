package com.example.DIY.dtos.sales;

import com.example.DIY.dtos.catalog.AttributeValueDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CartResponse {
    private Long id;
    private List<CartItemDTO> items;
    private BigDecimal totalAmount;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CartItemDTO {
        private Long id;
        private Long variantId;
        private String productName;
        private String productSlug;
        private String sku;
        private String imageUrl;
        private BigDecimal price;
        private Integer quantity;
        private Set<AttributeValueDTO> attributes;
    }
}
