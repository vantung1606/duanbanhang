package com.example.DIY.entities.catalog;

import com.example.DIY.entities.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "attributes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Attribute extends BaseEntity {

    @Column(nullable = false, unique = true, length = 50)
    private String name; // e.g., Color, RAM, Storage

    @OneToMany(mappedBy = "attribute")
    private Set<AttributeValue> values = new HashSet<>();
}
