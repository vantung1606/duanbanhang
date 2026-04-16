package com.example.DIY.entities.system;

import com.example.DIY.entities.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name = "language_translations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LanguageTranslation extends BaseEntity {

    @Column(nullable = false, length = 10)
    private String locale; // e.g., en, vi

    @Column(nullable = false)
    private String translationKey;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    private String module; // To group translations
}
