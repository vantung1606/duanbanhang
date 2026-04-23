package com.example.DIY.dtos.catalog;

import lombok.Data;

@Data
public class InventoryAdjustmentRequest {
    private Long variantId;
    private Integer amount;
    private String reason;
}
