package com.example.DIY.entities.warranty;

import com.example.DIY.entities.BaseEntity;
import com.example.DIY.entities.iam.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Entity
@Table(name = "warranty_requests")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WarrantyRequest extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "serial_number_id", nullable = false)
    private SerialNumber serialNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String issueDescription;

    @Enumerated(EnumType.STRING)
    private WarrantyStatus status = WarrantyStatus.PENDING;

    private String resolution;

    private Instant completedAt;

    public enum WarrantyStatus {
        PENDING, APPROVED, REJECTED, IN_REPAIR, COMPLETED
    }
}
