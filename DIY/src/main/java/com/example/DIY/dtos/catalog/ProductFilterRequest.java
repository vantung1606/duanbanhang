package com.example.DIY.dtos.catalog;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Map;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductFilterRequest {
    private Long categoryId;
    private Long brandId;
    private BigDecimal minPrice;
    private BigDecimal maxPrice;
    private String search;
    private Map<String, Set<String>> attributes; // Dynamic filters like CPU: ["M3", "M2"], RAM: ["16GB"]
    
    // Pagination
    private int page = 0;
    private int size = 12;
    private String sortBy = "name";
    private String sortDir = "asc";
}
