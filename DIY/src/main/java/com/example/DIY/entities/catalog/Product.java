package com.example.DIY.entities.catalog;

import com.example.DIY.entities.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product extends BaseEntity {

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true, length = 150)
    private String slug;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "LONGTEXT")
    private String imageUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "brand_id", nullable = false)
    private Brand brand;

    @Builder.Default
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductVariant> variants = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductImage> images = new ArrayList<>();
    
    @Builder.Default
    private boolean active = true;
    private String ribbon; 

    // Odoo-style ERP fields
    @Builder.Default
    private String productType = "GOODS"; // GOODS, SERVICE, COMBO
    private String internalReference;
    private String barcode;
    
    @Column(columnDefinition = "TEXT")
    private String internalNote;
    
    @Column(columnDefinition = "TEXT")
    private String shortDescription;
    
    @Builder.Default
    private boolean canBeSold = true;
    @Builder.Default
    private boolean canBePurchased = true;
    
    @Column(columnDefinition = "TEXT")
    private String specifications; // Store JSON: [{"label": "Power", "value": "1500W"}, ...]

    @Builder.Default
    private Double salesTax = 10.0;
    @Builder.Default
    private Double purchaseTax = 10.0;
}
