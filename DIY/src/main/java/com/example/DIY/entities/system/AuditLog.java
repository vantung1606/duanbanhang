package com.example.DIY.entities.system;

import com.example.DIY.entities.BaseEntity;
import com.example.DIY.entities.iam.User;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "audit_logs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuditLog extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(nullable = false)
    private String action; // e.g., DELETE_PRODUCT, CHANGE_ROLE

    @Column(nullable = false)
    private String entityName;

    private Long entityId;

    @Column(columnDefinition = "TEXT")
    private String details; // Before/After state or parameters

    private String ipAddress;
}
