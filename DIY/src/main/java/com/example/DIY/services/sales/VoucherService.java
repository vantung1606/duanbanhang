package com.example.DIY.services.sales;

import com.example.DIY.entities.sales.Voucher;
import com.example.DIY.repositories.sales.VoucherRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class VoucherService {

    private final VoucherRepository voucherRepository;

    @Transactional(readOnly = true)
    public List<Voucher> getAllVouchers() {
        return voucherRepository.findAll();
    }

    @Transactional
    public Voucher createVoucher(Voucher voucher) {
        if (voucherRepository.findByCode(voucher.getCode()).isPresent()) {
            throw new RuntimeException("Voucher code already exists");
        }
        return voucherRepository.save(voucher);
    }

    @Transactional
    public void deleteVoucher(Long id) {
        voucherRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public Voucher validateVoucher(String code, java.math.BigDecimal orderAmount) {
        Voucher voucher = voucherRepository.findByCode(code)
                .orElseThrow(() -> new RuntimeException("Invalid voucher code"));

        if (Instant.now().isBefore(voucher.getStartDate()) || Instant.now().isAfter(voucher.getEndDate())) {
            throw new RuntimeException("Voucher is expired or not yet active");
        }

        if (voucher.getUsedCount() >= voucher.getUsageLimit()) {
            throw new RuntimeException("Voucher usage limit reached");
        }

        if (voucher.getMinOrderAmount() != null && orderAmount.compareTo(voucher.getMinOrderAmount()) < 0) {
            throw new RuntimeException("Order amount is below the minimum required for this voucher");
        }

        return voucher;
    }
}
