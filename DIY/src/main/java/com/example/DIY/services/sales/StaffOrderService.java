package com.example.DIY.services.sales;

import com.example.DIY.dtos.sales.OrderResponse;
import com.example.DIY.entities.sales.Order;
import com.example.DIY.entities.sales.OrderStatusHistory;
import com.example.DIY.repositories.sales.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StaffOrderService {

    private final OrderRepository orderRepository;

    @Transactional(readOnly = true)
    public List<OrderResponse> getOrdersByStatus(String status) {
        List<Order> orders;
        if (status == null || status.isBlank()) {
            orders = orderRepository.findAll();
        } else {
            Order.OrderStatus orderStatus = Order.OrderStatus.valueOf(status.toUpperCase());
            orders = orderRepository.findByStatus(orderStatus);
        }
        return orders.stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public OrderResponse getOrderDetail(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        return mapToResponse(order);
    }

    @Transactional
    public OrderResponse updateOrderStatus(Long id, String newStatus, String note) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        Order.OrderStatus status = Order.OrderStatus.valueOf(newStatus);
        order.setStatus(status);

        order.getStatusHistory().add(OrderStatusHistory.builder()
                .order(order)
                .status(status)
                .note(note)
                .build());

        return mapToResponse(orderRepository.save(order));
    }

    private OrderResponse mapToResponse(Order order) {
        return OrderResponse.builder()
                .id(order.getId())
                .orderNumber("ORD-" + order.getId())
                .orderDate(order.getCreatedAt())
                .totalAmount(order.getTotalAmount())
                .status(order.getStatus().name())
                .items(order.getItems().stream().map(item -> OrderResponse.OrderItemDTO.builder()
                        .productName(item.getVariant().getProduct().getName())
                        .variantSku(item.getVariant().getSku())
                        .price(item.getPrice())
                        .quantity(item.getQuantity())
                        .build()).collect(Collectors.toList()))
                .build();
    }
}
