package com.example.DIY.controllers.catalog;

import com.example.DIY.dtos.catalog.CategoryResponse;
import com.example.DIY.entities.catalog.Category;
import com.example.DIY.services.catalog.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/manager/categories")
@RequiredArgsConstructor
public class ManagerCategoryController {

    private final CategoryService categoryService;

    @GetMapping
    public ResponseEntity<List<CategoryResponse>> getAllCategories() {
        List<CategoryResponse> responses = categoryService.getAllCategories().stream()
                .map(cat -> CategoryResponse.builder()
                        .id(cat.getId())
                        .name(cat.getName())
                        .slug(cat.getSlug())
                        .description(cat.getDescription())
                        .build())
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }

    @PostMapping
    public ResponseEntity<CategoryResponse> createCategory(@RequestBody Category category) {
        Category saved = categoryService.createCategory(category);
        return ResponseEntity.ok(CategoryResponse.builder()
                .id(saved.getId())
                .name(saved.getName())
                .slug(saved.getSlug())
                .description(saved.getDescription())
                .build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategoryResponse> updateCategory(@PathVariable Long id, @RequestBody Category category) {
        Category updated = categoryService.updateCategory(id, category);
        return ResponseEntity.ok(CategoryResponse.builder()
                .id(updated.getId())
                .name(updated.getName())
                .slug(updated.getSlug())
                .description(updated.getDescription())
                .build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.noContent().build();
    }
}
