package com.example.DIY.controllers.sales;

import com.example.DIY.dtos.sales.CartResponse;
import com.example.DIY.entities.iam.User;
import com.example.DIY.services.sales.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @GetMapping
    public ResponseEntity<CartResponse> getCart(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(cartService.getCart(user));
    }

    @PostMapping("/add")
    public ResponseEntity<CartResponse> addToCart(
            @AuthenticationPrincipal User user,
            @RequestParam Long variantId,
            @RequestParam Integer quantity) {
        return ResponseEntity.ok(cartService.addItemToCart(user, variantId, quantity));
    }

    @PutMapping("/update/{itemId}")
    public ResponseEntity<CartResponse> updateQuantity(
            @AuthenticationPrincipal User user,
            @PathVariable Long itemId,
            @RequestParam Integer quantity) {
        return ResponseEntity.ok(cartService.updateItemQuantity(user, itemId, quantity));
    }

    @DeleteMapping("/remove/{itemId}")
    public ResponseEntity<CartResponse> removeItem(
            @AuthenticationPrincipal User user,
            @PathVariable Long itemId) {
        return ResponseEntity.ok(cartService.removeItemFromCart(user, itemId));
    }

    @DeleteMapping("/clear")
    public ResponseEntity<Void> clearCart(@AuthenticationPrincipal User user) {
        cartService.clearCart(user);
        return ResponseEntity.ok().build();
    }
}
