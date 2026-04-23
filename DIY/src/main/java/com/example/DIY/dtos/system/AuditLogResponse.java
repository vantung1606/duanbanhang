package com.example.DIY.dtos.system;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuditLogResponse {
    private Long id;
    private String username;
    private String action;
    private String entityName;
    private Long entityId;
    private String details;
    private Instant createdAt;
}
