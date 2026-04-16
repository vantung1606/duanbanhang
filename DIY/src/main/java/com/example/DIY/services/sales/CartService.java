package com.example.DIY.services.sales;

import com.example.DIY.dtos.catalog.AttributeValueDTO;
import com.example.DIY.dtos.sales.CartResponse;
import com.example.DIY.entities.catalog.ProductImage;
import com.example.DIY.entities.catalog.ProductVariant;
import com.example.DIY.entities.iam.User;
import com.example.DIY.entities.sales.Cart;
import com.example.DIY.entities.sales.CartItem;
import com.example.DIY.repositories.catalog.ProductVariantRepository;
import com.example.DIY.repositories.sales.CartItemRepository;
import com.example.DIY.repositories.sales.CartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductVariantRepository variantRepository;

    @Transactional(readOnly = true)
    public CartResponse getCart(User user) {
        Cart cart = getOrCreateCart(user);
        return mapToCartResponse(cart);
    }

    @Transactional
    public CartResponse addItemToCart(User user, Long variantId, Integer quantity) {
        Cart cart = getOrCreateCart(user);
        ProductVariant variant = variantRepository.findById(variantId)
                .orElseThrow(() -> new RuntimeException("Variant not found"));

        // Check if item already exists in cart
        Optional<CartItem> existingItem = cart.getItems().stream()
                .filter(item -> item.getVariant().getId().equals(variantId))
                .findFirst();

        if (existingItem.isPresent()) {
            CartItem item = existingItem.get();
            item.setQuantity(item.getQuantity() + quantity);
        } else {
            CartItem newItem = CartItem.builder()
                    .cart(cart)
                    .variant(variant)
                    .quantity(quantity)
                    .build();
            cart.getItems().add(newItem);
        }

        Cart savedCart = cartRepository.save(cart);
        return mapToCartResponse(savedCart);
    }

    @Transactional
    public CartResponse updateItemQuantity(User user, Long itemId, Integer quantity) {
        CartItem item = cartItemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));
        
        if (quantity <= 0) {
            cartItemRepository.delete(item);
        } else {
            item.setQuantity(quantity);
            cartItemRepository.save(item);
        }

        return getCart(user);
    }

    @Transactional
    public CartResponse removeItemFromCart(User user, Long itemId) {
        CartItem item = cartItemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));
        
        cartItemRepository.delete(item);
        return getCart(user);
    }

    @Transactional
    public void clearCart(User user) {
        Cart cart = getOrCreateCart(user);
        cart.getItems().clear();
        cartRepository.save(cart);
    }

    private Cart getOrCreateCart(User user) {
        return cartRepository.findByUserId(user.getId())
                .orElseGet(() -> cartRepository.save(Cart.builder().user(user).items(new ArrayList<>()).build()));
    }

    private CartResponse mapToCartResponse(Cart cart) {
        BigDecimal total = cart.getItems().stream()
                .map(item -> item.getVariant().getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return CartResponse.builder()
                .id(cart.getId())
                .totalAmount(total)
                .items(cart.getItems().stream().map(this::mapToItemDTO).collect(Collectors.toList()))
                .build();
    }

    private CartResponse.CartItemDTO mapToItemDTO(CartItem item) {
        ProductVariant variant = item.getVariant();
        String primaryImage = variant.getProduct().getImages().stream()
                .filter(ProductImage::isPrimary)
                .map(ProductImage::getImageUrl)
                .findFirst()
                .orElse(variant.getProduct().getImages().isEmpty() ? "" : variant.getProduct().getImages().get(0).getImageUrl());

        return CartResponse.CartItemDTO.builder()
                .id(item.getId())
                .variantId(variant.getId())
                .productName(variant.getProduct().getName())
                .productSlug(variant.getProduct().getSlug())
                .sku(variant.getSku())
                .imageUrl(primaryImage)
                .price(variant.getPrice())
                .quantity(item.getQuantity())
                .attributes(variant.getAttributeValues().stream()
                        .map(av -> AttributeValueDTO.builder()
                                .id(av.getId())
                                .attributeName(av.getAttribute().getName())
                                .value(av.getValue())
                                .build())
                        .collect(Collectors.toSet()))
                .build();
    }
}
