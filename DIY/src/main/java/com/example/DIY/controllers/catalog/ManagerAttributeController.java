package com.example.DIY.controllers.catalog;

import com.example.DIY.dtos.catalog.AttributeResponse;
import com.example.DIY.entities.catalog.Attribute;
import com.example.DIY.entities.catalog.AttributeValue;
import com.example.DIY.repositories.catalog.AttributeRepository;
import com.example.DIY.repositories.catalog.AttributeValueRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/manager/attributes")
@RequiredArgsConstructor
public class ManagerAttributeController {

    private final AttributeRepository attributeRepository;
    private final AttributeValueRepository attributeValueRepository;

    @GetMapping
    public ResponseEntity<List<AttributeResponse>> getAllAttributes() {
        List<AttributeResponse> responses = attributeRepository.findAll().stream()
                .map(attr -> AttributeResponse.builder()
                        .id(attr.getId())
                        .name(attr.getName())
                        .values(attr.getValues().stream()
                                .map(v -> AttributeResponse.AttributeValueDTO.builder()
                                        .id(v.getId())
                                        .value(v.getValue())
                                        .build())
                                .collect(Collectors.toList()))
                        .build())
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }

    @PostMapping
    public ResponseEntity<Attribute> createAttribute(@RequestBody Attribute attribute) {
        return ResponseEntity.ok(attributeRepository.save(attribute));
    }

    @PostMapping("/{id}/values")
    public ResponseEntity<AttributeValue> addValue(@PathVariable Long id, @RequestBody AttributeValue value) {
        Attribute attr = attributeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Attribute not found"));
        value.setAttribute(attr);
        return ResponseEntity.ok(attributeValueRepository.save(value));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAttribute(@PathVariable Long id) {
        attributeRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
