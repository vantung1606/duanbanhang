package com.example.DIY.dtos.iam;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class UserResponse {
    private Long id;
    private String username;
    private String email;
    private List<String> roles;
    private boolean active;
}
