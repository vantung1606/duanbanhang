package com.example.DIY.services.system;

import com.example.DIY.dtos.system.AuditLogResponse;
import com.example.DIY.repositories.system.AuditLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuditLogQueryService {

    private final AuditLogRepository auditLogRepository;

    public List<AuditLogResponse> getAllLogs() {
        return auditLogRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt")).stream()
                .map(log -> AuditLogResponse.builder()
                        .id(log.getId())
                        .username(log.getUser() != null ? log.getUser().getUsername() : "System")
                        .action(log.getAction())
                        .entityName(log.getEntityName())
                        .entityId(log.getEntityId())
                        .details(log.getDetails())
                        .createdAt(log.getCreatedAt())
                        .build())
                .collect(Collectors.toList());
    }
}
