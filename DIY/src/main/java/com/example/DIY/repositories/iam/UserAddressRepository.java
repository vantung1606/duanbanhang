package com.example.DIY.repositories.iam;

import com.example.DIY.entities.iam.UserAddress;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface UserAddressRepository extends JpaRepository<UserAddress, Long> {
    List<UserAddress> findByUserId(Long userId);
}
