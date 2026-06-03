package com.example.DIY.config;

import com.zaxxer.hikari.HikariDataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import java.net.URI;
import java.net.URISyntaxException;

@Configuration
public class DatabaseConfig {

    @Value("${spring.datasource.url}")
    private String url;

    @Value("${spring.datasource.username:}")
    private String username;

    @Value("${spring.datasource.password:}")
    private String password;

    @Value("${spring.datasource.driver-class-name:}")
    private String driverClassName;

    @Bean
    @Primary
    public HikariDataSource dataSource() {
        String finalUrl = this.url;
        String finalUsername = this.username;
        String finalPassword = this.password;
        String finalDriver = this.driverClassName;

        if (finalUrl != null && (finalUrl.startsWith("postgres://") || finalUrl.startsWith("postgresql://"))) {
            try {
                URI uri = new URI(finalUrl);
                String host = uri.getHost();
                int port = uri.getPort();
                if (port == -1) {
                    port = 5432;
                }
                String database = uri.getPath();
                String userInfo = uri.getUserInfo();
                if (userInfo != null) {
                    String[] credentials = userInfo.split(":");
                    finalUsername = credentials[0];
                    if (credentials.length > 1) {
                        finalPassword = credentials[1];
                    }
                }
                String query = uri.getQuery();
                finalUrl = "jdbc:postgresql://" + host + ":" + port + database;
                if (query != null && !query.isEmpty()) {
                    finalUrl += "?" + query;
                    if (!query.contains("sslmode")) {
                        finalUrl += "&sslmode=require";
                    }
                } else {
                    finalUrl += "?sslmode=require";
                }
                finalDriver = "org.postgresql.Driver";
            } catch (URISyntaxException e) {
                // Fallback to original values if parsing fails
            }
        }

        HikariDataSource dataSource = new HikariDataSource();
        dataSource.setJdbcUrl(finalUrl);
        if (finalUsername != null && !finalUsername.isEmpty()) {
            dataSource.setUsername(finalUsername);
        }
        if (finalPassword != null && !finalPassword.isEmpty()) {
            dataSource.setPassword(finalPassword);
        }
        if (finalDriver != null && !finalDriver.isEmpty()) {
            dataSource.setDriverClassName(finalDriver);
        }
        return dataSource;
    }
}
