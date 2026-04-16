package com.example.DIY.controllers.sales;

import com.example.DIY.dtos.sales.CheckoutRequest;
import com.example.DIY.dtos.sales.OrderResponse;
import com.example.DIY.entities.iam.User;
import com.example.DIY.services.sales.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping("/checkout")
    public ResponseEntity<OrderResponse> checkout(
            @AuthenticationPrincipal User user,
            @RequestBody CheckoutRequest request) {
        return ResponseEntity.ok(orderService.checkout(user, request));
    }

    @GetMapping("/my-orders")
    public ResponseEntity<List<OrderResponse>> getMyOrders(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(orderService.getMyOrders(user));
    }
}
