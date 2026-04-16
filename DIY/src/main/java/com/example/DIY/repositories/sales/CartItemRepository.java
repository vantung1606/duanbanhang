package com.example.DIY.repositories.sales;

import com.example.DIY.entities.sales.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
}
