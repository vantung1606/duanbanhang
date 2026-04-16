package com.example.DIY.repositories.sales;

import com.example.DIY.entities.sales.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
}
