package com.example.DIY.services.sales;

import com.example.DIY.dtos.sales.CheckoutRequest;
import com.example.DIY.dtos.sales.OrderResponse;
import com.example.DIY.entities.iam.User;
import com.example.DIY.entities.iam.UserAddress;
import com.example.DIY.entities.sales.Cart;
import com.example.DIY.entities.sales.Order;
import com.example.DIY.entities.sales.OrderItem;
import com.example.DIY.entities.sales.OrderStatusHistory;
import com.example.DIY.repositories.catalog.ProductVariantRepository;
import com.example.DIY.repositories.iam.UserAddressRepository;
import com.example.DIY.repositories.sales.CartRepository;
import com.example.DIY.repositories.sales.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final CartRepository cartRepository;
    private final UserAddressRepository addressRepository;
    private final ProductVariantRepository variantRepository;

    @Transactional
    public OrderResponse checkout(User user, CheckoutRequest request) {
        // 1. Get Cart
        Cart cart = cartRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Cart is empty"));
        
        if (cart.getItems().isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        // 2. Validate Address
        UserAddress address = addressRepository.findById(request.getShippingAddressId())
                .orElseThrow(() -> new RuntimeException("Shipping address not found"));
        
        if (!address.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Invalid address for this user");
        }

        // 3. Create Order
        BigDecimal total = cart.getItems().stream()
                .map(item -> item.getVariant().getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        Order order = Order.builder()
                .user(user)
                .shippingAddress(address)
                .totalAmount(total)
                .status(Order.OrderStatus.PENDING)
                .items(new ArrayList<>())
                .statusHistory(new ArrayList<>())
                .build();

        // 4. Map Cart Items to Order Items & Update Stock
        List<OrderItem> orderItems = cart.getItems().stream().map(cartItem -> {
            // Check Stock
            if (cartItem.getVariant().getStockQuantity() < cartItem.getQuantity()) {
                throw new RuntimeException("OutOfStock: " + cartItem.getVariant().getProduct().getName());
            }

            // Update Stock
            cartItem.getVariant().setStockQuantity(cartItem.getVariant().getStockQuantity() - cartItem.getQuantity());
            variantRepository.save(cartItem.getVariant());

            return OrderItem.builder()
                    .order(order)
                    .variant(cartItem.getVariant())
                    .price(cartItem.getVariant().getPrice())
                    .quantity(cartItem.getQuantity())
                    .build();
        }).collect(Collectors.toList());

        order.setItems(orderItems);

        // 5. Add Initial Status History
        order.getStatusHistory().add(OrderStatusHistory.builder()
                .order(order)
                .status(Order.OrderStatus.PENDING)
                .note("Order placed by customer.")
                .build());

        // 6. Save Order & Clear Cart
        Order savedOrder = orderRepository.save(order);
        cart.getItems().clear();
        cartRepository.save(cart);

        return mapToOrderResponse(savedOrder);
    }

    @Transactional(readOnly = true)
    public List<OrderResponse> getMyOrders(User user) {
        return orderRepository.findByUserId(user.getId()).stream()
                .map(this::mapToOrderResponse)
                .collect(Collectors.toList());
    }

    private OrderResponse mapToOrderResponse(Order order) {
        return OrderResponse.builder()
                .id(order.getId())
                .orderNumber("ORD-" + order.getId()) // Simple generation
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
