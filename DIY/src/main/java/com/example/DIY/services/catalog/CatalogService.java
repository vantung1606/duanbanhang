package com.example.DIY.services.catalog;

import com.example.DIY.dtos.catalog.AttributeValueDTO;
import com.example.DIY.dtos.catalog.ProductDetailResponse;
import com.example.DIY.dtos.catalog.ProductFilterRequest;
import com.example.DIY.dtos.catalog.ProductResponse;
import com.example.DIY.dtos.catalog.VariantDTO;
import com.example.DIY.entities.catalog.Product;
import com.example.DIY.entities.catalog.ProductImage;
import com.example.DIY.entities.catalog.ProductVariant;
import com.example.DIY.repositories.catalog.BrandRepository;
import com.example.DIY.repositories.catalog.CategoryRepository;
import com.example.DIY.repositories.catalog.ProductRepository;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CatalogService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final BrandRepository brandRepository;

    @Transactional(readOnly = true)
    public Page<ProductResponse> getFilteredProducts(ProductFilterRequest request) {
        String sortDir = request.getSortDir();
        if (sortDir == null || sortDir.trim().isEmpty()) {
            sortDir = "asc";
        }
        String sortBy = request.getSortBy();
        if (sortBy == null || sortBy.trim().isEmpty()) {
            sortBy = "name";
        }

        Sort.Direction direction;
        try {
            direction = Sort.Direction.fromString(sortDir);
        } catch (IllegalArgumentException e) {
            direction = Sort.Direction.ASC;
        }

        Sort sort = Sort.by(direction, sortBy);
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize(), sort);

        Specification<Product> spec = (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            // Filter by active status
            predicates.add(cb.isTrue(root.get("active")));

            // Filter by Search (Name or Description)
            if (request.getSearch() != null && !request.getSearch().isEmpty()) {
                String searchPattern = "%" + request.getSearch().toLowerCase() + "%";
                predicates.add(cb.or(
                    cb.like(cb.lower(root.get("name")), searchPattern),
                    cb.like(cb.lower(root.get("description")), searchPattern)
                ));
            }

            // Filter by Category
            if (request.getCategoryId() != null) {
                predicates.add(cb.equal(root.get("category").get("id"), request.getCategoryId()));
            }

            // Filter by Brand
            if (request.getBrandId() != null) {
                predicates.add(cb.equal(root.get("brand").get("id"), request.getBrandId()));
            }

            // Filter by Price Range using Variants join
            if (request.getMinPrice() != null || request.getMaxPrice() != null) {
                Join<Product, ProductVariant> variants = root.join("variants");
                if (request.getMinPrice() != null) {
                    predicates.add(cb.greaterThanOrEqualTo(variants.get("price"), request.getMinPrice()));
                }
                if (request.getMaxPrice() != null) {
                    predicates.add(cb.lessThanOrEqualTo(variants.get("price"), request.getMaxPrice()));
                }
                query.distinct(true);
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };

        Page<Product> productPage = productRepository.findAll(spec, pageable);
        return productPage.map(this::mapToProductResponse);
    }

    @Transactional(readOnly = true)
    public ProductDetailResponse getProductDetail(String slug) {
        Product product = productRepository.findBySlug(slug)
                .orElseThrow(() -> new RuntimeException("Product not found with slug: " + slug));

        return ProductDetailResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .slug(product.getSlug())
                .description(product.getDescription())
                .brandName(product.getBrand() != null ? product.getBrand().getName() : "DuongDIY")
                .categoryName(product.getCategory() != null ? product.getCategory().getName() : "Sản phẩm")
                .imageUrls(product.getImages() != null ? product.getImages().stream().map(ProductImage::getImageUrl).collect(Collectors.toList()) : new ArrayList<>())
                .variants(product.getVariants() != null ? product.getVariants().stream().map(this::mapToVariantDTO).collect(Collectors.toList()) : new ArrayList<>())
                .specifications(product.getSpecifications())
                .rating(4.8) // Mock
                .reviewCount(124) // Mock
                .build();
    }

    private VariantDTO mapToVariantDTO(ProductVariant variant) {
        return VariantDTO.builder()
                .id(variant.getId())
                .sku(variant.getSku())
                .price(variant.getPrice())
                .stockQuantity(variant.getStockQuantity())
                .attributeValues(variant.getAttributeValues().stream()
                        .map(av -> AttributeValueDTO.builder()
                                .id(av.getId())
                                .attributeName(av.getAttribute().getName())
                                .value(av.getValue())
                                .build())
                        .collect(Collectors.toSet()))
                .build();
    }

    private ProductResponse mapToProductResponse(Product product) {
        BigDecimal minPrice = BigDecimal.ZERO;
        BigDecimal maxPrice = BigDecimal.ZERO;
        
        if (product.getVariants() != null && !product.getVariants().isEmpty()) {
            minPrice = product.getVariants().stream()
                    .map(ProductVariant::getPrice)
                    .filter(p -> p != null)
                    .min(BigDecimal::compareTo)
                    .orElse(BigDecimal.ZERO);
            
            maxPrice = product.getVariants().stream()
                    .map(ProductVariant::getPrice)
                    .filter(p -> p != null)
                    .max(BigDecimal::compareTo)
                    .orElse(BigDecimal.ZERO);
        }

        String thumbnailUrl = (product.getImages() != null && !product.getImages().isEmpty()) 
                ? product.getImages().get(0).getImageUrl() 
                : null;

        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .slug(product.getSlug())
                .brandName(product.getBrand() != null ? product.getBrand().getName() : "DuongDIY")
                .categoryName(product.getCategory() != null ? product.getCategory().getName() : "Sản phẩm")
                .thumbnailUrl(thumbnailUrl)
                .minPrice(minPrice)
                .maxPrice(maxPrice)
                .specifications(product.getSpecifications())
                .rating(4.5) // Mocked for now
                .build();
    }
}
