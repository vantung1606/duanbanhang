package com.example.DIY.services.manager;

import com.example.DIY.dtos.manager.DashboardStatsResponse;
import com.example.DIY.entities.sales.Order;
import com.example.DIY.repositories.sales.OrderRepository;
import com.example.DIY.repositories.iam.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ManagerAnalyticsService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;

    public DashboardStatsResponse getDashboardStats() {
        List<Order> allOrders = orderRepository.findAll();
        
        BigDecimal totalRevenue = allOrders.stream()
                .filter(o -> o.getStatus() != Order.OrderStatus.CANCELLED)
                .map(Order::getTotalAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        long totalOrders = allOrders.size();
        long totalCustomers = userRepository.count();

        // Simulated daily revenue for the chart
        List<DashboardStatsResponse.DailyRevenue> revenueChart = new ArrayList<>();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMM dd");
        
        // Mocking last 7 days
        for (int i = 6; i >= 0; i--) {
            revenueChart.add(DashboardStatsResponse.DailyRevenue.builder()
                    .date(java.time.LocalDate.now().minusDays(i).format(formatter))
                    .revenue(BigDecimal.valueOf(1000 + Math.random() * 5000))
                    .build());
        }

        // Simulated recent activities
        List<DashboardStatsResponse.RecentActivity> activities = List.of(
            DashboardStatsResponse.RecentActivity.builder().type("SALE").description("New order #1024 placed by John").time("2 mins ago").build(),
            DashboardStatsResponse.RecentActivity.builder().type("STOCK").description("iPhone 15 Pro Max stock low (5 left)").time("45 mins ago").build(),
            DashboardStatsResponse.RecentActivity.builder().type("USER").description("New customer registered: Sarah C.").time("3 hours ago").build()
        );

        return DashboardStatsResponse.builder()
                .totalRevenue(totalRevenue)
                .totalOrders(totalOrders)
                .totalCustomers(totalCustomers)
                .growthRate(12.5) // Simulated growth
                .revenueChart(revenueChart)
                .recentActivities(activities)
                .build();
    }
}
