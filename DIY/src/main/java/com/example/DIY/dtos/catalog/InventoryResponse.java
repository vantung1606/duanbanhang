package com.example.DIY.dtos.catalog;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InventoryResponse {
    private Long variantId;
    private String productName;
    private String sku;
    private String attributes; // Concatenated string of attributes like "Màu: Đỏ, RAM: 8GB"
    private Integer currentStock;
    private String warehouseName;
}
