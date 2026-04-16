package com.example.DIY.dtos.sales;

import lombok.Data;

@Data
public class CheckoutRequest {
    private Long shippingAddressId;
    private String paymentMethod; // COD, VNPAY, etc.
}
