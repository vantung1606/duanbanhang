package com.example.DIY.entities.warranty;

import com.example.DIY.entities.BaseEntity;
import com.example.DIY.entities.catalog.ProductVariant;
import com.example.DIY.entities.sales.OrderItem;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "serial_numbers")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SerialNumber extends BaseEntity {

    @Column(nullable = false, unique = true)
    private String serialNumber; // or IMEI

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "variant_id", nullable = false)
    private ProductVariant variant;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_item_id")
    private OrderItem orderItem; // Assigned when sold

    @Enumerated(EnumType.STRING)
    private SerialStatus status = SerialStatus.IN_STOCK;

    public enum SerialStatus {
        IN_STOCK, SOLD, RETURNED, DEFECTIVE
    }
}
