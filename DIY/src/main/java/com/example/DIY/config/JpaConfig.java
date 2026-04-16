package com.example.DIY.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@Configuration
@EnableJpaAuditing
public class JpaConfig {
    // This enables Spring Data JPA Auditing features (@CreatedDate, @LastModifiedDate, etc.)
}
