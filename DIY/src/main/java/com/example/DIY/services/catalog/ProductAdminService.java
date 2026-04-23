package com.example.DIY.services.catalog;

import com.example.DIY.dtos.catalog.ProductResponse;
import com.example.DIY.dtos.catalog.ProductSaveRequest;
import com.example.DIY.entities.catalog.*;
import com.example.DIY.repositories.catalog.AttributeValueRepository;
import com.example.DIY.repositories.catalog.BrandRepository;
import com.example.DIY.repositories.catalog.BrandRepository;
import com.example.DIY.repositories.catalog.CategoryRepository;
import com.example.DIY.repositories.catalog.ProductRepository;
import com.example.DIY.repositories.catalog.ProductVariantRepository;
import com.example.DIY.services.system.FileStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductAdminService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final BrandRepository brandRepository;
    private final AttributeValueRepository attributeValueRepository;
    private final ProductVariantRepository productVariantRepository;
    private final FileStorageService fileStorageService;

    @Transactional(readOnly = true)
    public List<ProductResponse> getAllProductsForAdmin() {
        return productRepository.findAll().stream()
                .map(this::mapToAdminResponse)
                .collect(Collectors.toList());
    }

    private ProductResponse mapToAdminResponse(Product product) {
        BigDecimal minPrice = BigDecimal.ZERO;
        BigDecimal maxPrice = BigDecimal.ZERO;
        
        if (product.getVariants() != null && !product.getVariants().isEmpty()) {
            minPrice = product.getVariants().stream()
                    .map(ProductVariant::getPrice)
                    .min(BigDecimal::compareTo)
                    .orElse(BigDecimal.ZERO);

            maxPrice = product.getVariants().stream()
                    .map(ProductVariant::getPrice)
                    .max(BigDecimal::compareTo)
                    .orElse(BigDecimal.ZERO);
        }

        String categoryName = product.getCategory() != null ? product.getCategory().getName() : "Không có danh mục";
        String brandName = product.getBrand() != null ? product.getBrand().getName() : "Không có thương hiệu";

        String thumbnailUrl = (product.getImages() != null && !product.getImages().isEmpty()) ? 
                product.getImages().get(0).getImageUrl() :
                "https://images.unsplash.com/photo-1516211697149-d8573292051d?q=80&w=300";

        BigDecimal minOriginalPrice = product.getVariants().stream()
                .map(v -> v.getOriginalPrice() != null ? v.getOriginalPrice() : v.getPrice())
                .min(BigDecimal::compareTo)
                .orElse(BigDecimal.ZERO);

        boolean hasDiscount = product.getVariants().stream()
                .anyMatch(v -> v.getOriginalPrice() != null && v.getOriginalPrice().compareTo(v.getPrice()) > 0);

        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .slug(product.getSlug())
                .categoryName(categoryName)
                .brandName(brandName)
                .minPrice(minPrice)
                .maxPrice(maxPrice)
                .minOriginalPrice(minOriginalPrice)
                .thumbnailUrl(thumbnailUrl)
                .rating(4.5)
                .hasDiscount(hasDiscount)
                .ribbon(product.getRibbon())
                .active(product.isActive())
                .productType(product.getProductType())
                .internalReference(product.getInternalReference())
                .barcode(product.getBarcode())
                .internalNote(product.getInternalNote())
                .shortDescription(product.getShortDescription())
                .description(product.getDescription())
                .canBeSold(product.isCanBeSold())
                .canBePurchased(product.isCanBePurchased())
                .salesTax(product.getSalesTax())
                .purchaseTax(product.getPurchaseTax())
                .build();
    }

    @Transactional
    public ProductResponse createProduct(ProductSaveRequest request) {
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));
        Brand brand = brandRepository.findById(request.getBrandId())
                .orElseThrow(() -> new RuntimeException("Brand not found"));

        String slug = request.getSlug();
        if (slug == null || slug.isBlank()) {
            slug = request.getName().toLowerCase().replaceAll("[^a-z0-9]", "-");
        }

        String storedImageUrl = fileStorageService.saveBase64Image(request.getImageUrl());

        Product product = Product.builder()
                .name(request.getName())
                .slug(slug)
                .description(request.getDescription())
                .category(category)
                .brand(brand)
                .active(request.isActive())
                .ribbon(request.getRibbon())
                .imageUrl(storedImageUrl)
                .productType(request.getProductType())
                .internalReference(request.getInternalReference())
                .barcode(request.getBarcode())
                .internalNote(request.getInternalNote())
                .shortDescription(request.getShortDescription())
                .canBeSold(request.isCanBeSold())
                .canBePurchased(request.isCanBePurchased())
                .salesTax(request.getSalesTax())
                .purchaseTax(request.getPurchaseTax())
                .variants(new ArrayList<>())
                .images(new ArrayList<>())
                .build();

        Product savedProduct = productRepository.save(product);

        // Handle Variants
        if (request.getVariants() != null) {
            for (int i = 0; i < request.getVariants().size(); i++) {
                ProductSaveRequest.VariantRequest vReq = request.getVariants().get(i);
                // Auto-generate SKU if missing
                String sku = vReq.getSku();
                if (sku == null || sku.trim().isEmpty()) {
                    sku = product.getSlug().toUpperCase() + "-V" + (i + 1);
                }
                
                // Final check for global uniqueness to avoid Duplicate Entry
                String finalSku = sku;
                int suffixNum = 1;
                while (productVariantRepository.existsBySku(finalSku)) {
                    finalSku = sku + "-" + (System.currentTimeMillis() % 1000) + suffixNum++;
                }

                ProductVariant variant = ProductVariant.builder()
                        .sku(finalSku)
                        .price(vReq.getPrice())
                        .originalPrice(vReq.getOriginalPrice())
                        .stockQuantity(vReq.getStock())
                        .isStockUnlimited(vReq.isStockUnlimited())
                        .product(product)
                        .attributeValues(new HashSet<>())
                        .build();
                
                if (vReq.getAttributeValueIds() != null) {
                    vReq.getAttributeValueIds().forEach(valId -> {
                        attributeValueRepository.findById(valId).ifPresent(variant.getAttributeValues()::add);
                    });
                }
                savedProduct.getVariants().add(variant);
            }
        }

        // Add image if provided
        if (storedImageUrl != null && !storedImageUrl.isBlank()) {
            ProductImage image = ProductImage.builder()
                    .imageUrl(storedImageUrl)
                    .isPrimary(true)
                    .product(savedProduct)
                    .build();
            savedProduct.getImages().add(image);
        }

        return mapToAdminResponse(productRepository.save(savedProduct));
    }

    @Transactional
    public ProductResponse updateProduct(Long id, ProductSaveRequest request) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));
        Brand brand = brandRepository.findById(request.getBrandId())
                .orElseThrow(() -> new RuntimeException("Brand not found"));

        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setCategory(category);
        product.setBrand(brand);
        product.setActive(request.isActive());
        product.setRibbon(request.getRibbon());
        String storedImageUrl = fileStorageService.saveBase64Image(request.getImageUrl());
        product.setImageUrl(storedImageUrl);
        
        // Update primary image in images list
        if (storedImageUrl != null && !storedImageUrl.isBlank()) {
            product.getImages().clear();
            product.getImages().add(ProductImage.builder()
                    .imageUrl(storedImageUrl)
                    .isPrimary(true)
                    .product(product)
                    .build());
        }
        product.setProductType(request.getProductType());
        product.setInternalReference(request.getInternalReference());
        product.setBarcode(request.getBarcode());
        product.setInternalNote(request.getInternalNote());
        product.setShortDescription(request.getShortDescription());
        product.setCanBeSold(request.isCanBeSold());
        product.setCanBePurchased(request.isCanBePurchased());
        product.setSalesTax(request.getSalesTax());
        product.setPurchaseTax(request.getPurchaseTax());
        
        // Complex update: Update variants
        if (request.getVariants() != null) {
            product.getVariants().clear();
            for (int i = 0; i < request.getVariants().size(); i++) {
                ProductSaveRequest.VariantRequest vReq = request.getVariants().get(i);
                // Auto-generate SKU if missing
                String sku = vReq.getSku();
                if (sku == null || sku.trim().isEmpty()) {
                    sku = product.getSlug().toUpperCase() + "-V" + (i + 1);
                }
                
                // Final check for global uniqueness to avoid Duplicate Entry
                String finalSku = sku;
                int suffixNum = 1;
                while (productVariantRepository.existsBySku(finalSku)) {
                    finalSku = sku + "-" + (System.currentTimeMillis() % 1000) + suffixNum++;
                }

                ProductVariant variant = ProductVariant.builder()
                        .sku(finalSku)
                        .price(vReq.getPrice())
                        .originalPrice(vReq.getOriginalPrice())
                        .stockQuantity(vReq.getStock())
                        .isStockUnlimited(vReq.isStockUnlimited())
                        .product(product)
                        .attributeValues(new HashSet<>())
                        .build();
                
                if (vReq.getAttributeValueIds() != null) {
                    vReq.getAttributeValueIds().forEach(valId -> {
                        attributeValueRepository.findById(valId).ifPresent(variant.getAttributeValues()::add);
                    });
                }
                product.getVariants().add(variant);
            }
        }

        return mapToAdminResponse(productRepository.save(product));
    }

    @Transactional
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
}
