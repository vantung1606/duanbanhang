package com.example.DIY.dtos.manager;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Data
@Builder
public class DashboardStatsResponse {
    private BigDecimal totalRevenue;
    private long totalOrders;
    private long totalCustomers;
    private double growthRate;
    
    private List<DailyRevenue> revenueChart;
    private List<CategoryDistribution> categoryDistribution;
    private List<RecentActivity> recentActivities;

    @Data
    @Builder
    public static class DailyRevenue {
        private String date;
        private BigDecimal revenue;
    }

    @Data
    @Builder
    public static class CategoryDistribution {
        private String category;
        private long count;
    }

    @Data
    @Builder
    public static class RecentActivity {
        private String type;
        private String description;
        private String time;
    }
}
