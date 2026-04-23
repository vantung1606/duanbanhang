package com.example.DIY.services.system;

import com.example.DIY.entities.iam.User;
import com.example.DIY.entities.system.AuditLog;
import com.example.DIY.repositories.system.AuditLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuditLogService {

    private final AuditLogRepository auditLogRepository;

    @Transactional
    public void log(String action, String entityName, Long entityId, String details) {
        User currentUser = null;
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof User) {
            currentUser = (User) authentication.getPrincipal();
        }

        AuditLog log = AuditLog.builder()
                .user(currentUser)
                .action(action)
                .entityName(entityName)
                .entityId(entityId)
                .details(details)
                .build();

        auditLogRepository.save(log);
    }
}
