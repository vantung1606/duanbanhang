package com.example.DIY.controllers.manager;

import com.example.DIY.dtos.manager.DashboardStatsResponse;
import com.example.DIY.services.manager.ManagerAnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/manager/analytics")
@RequiredArgsConstructor
public class ManagerAnalyticsController {

    private final ManagerAnalyticsService managerAnalyticsService;

    @GetMapping("/dashboard")
    public ResponseEntity<DashboardStatsResponse> getDashboardStats() {
        return ResponseEntity.ok(managerAnalyticsService.getDashboardStats());
    }
}
