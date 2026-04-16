package com.example.DIY.controllers.sales;

import com.example.DIY.dtos.sales.OrderResponse;
import com.example.DIY.services.sales.StaffOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/staff/orders")
@RequiredArgsConstructor
public class StaffOrderController {

    private final StaffOrderService staffOrderService;

    @GetMapping
    public ResponseEntity<List<OrderResponse>> getAllOrders(
            @RequestParam(required = false) String status) {
        return ResponseEntity.ok(staffOrderService.getOrdersByStatus(status));
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderResponse> getOrderDetail(@PathVariable Long id) {
        return ResponseEntity.ok(staffOrderService.getOrderDetail(id));
    }

    @PutMapping("/{id}/confirm")
    public ResponseEntity<OrderResponse> confirmOrder(@PathVariable Long id) {
        return ResponseEntity.ok(staffOrderService.updateOrderStatus(id, "CONFIRMED", "Order confirmed by staff."));
    }

    @PutMapping("/{id}/ship")
    public ResponseEntity<OrderResponse> shipOrder(@PathVariable Long id) {
        return ResponseEntity.ok(staffOrderService.updateOrderStatus(id, "SHIPPING", "Order dispatched for delivery."));
    }

    @PutMapping("/{id}/complete")
    public ResponseEntity<OrderResponse> completeOrder(@PathVariable Long id) {
        return ResponseEntity.ok(staffOrderService.updateOrderStatus(id, "COMPLETED", "Order delivered successfully."));
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<OrderResponse> cancelOrder(@PathVariable Long id) {
        return ResponseEntity.ok(staffOrderService.updateOrderStatus(id, "CANCELLED", "Order cancelled by staff."));
    }
}
