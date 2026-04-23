package com.example.DIY.services.iam;

import com.example.DIY.dtos.iam.UserCreateRequest;
import com.example.DIY.dtos.iam.UserResponse;
import com.example.DIY.dtos.iam.UserUpdateRequest;
import com.example.DIY.entities.iam.Role;
import com.example.DIY.entities.iam.User;
import com.example.DIY.repositories.iam.RoleRepository;
import com.example.DIY.repositories.iam.UserRepository;
import com.example.DIY.services.system.AuditLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminUserService {

    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final AuditLogService auditLogService;

    @Transactional
    public UserResponse updateUser(Long id, UserUpdateRequest request) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String oldEmail = user.getEmail();
        String oldUsername = user.getUsername();

        if (request.getUsername() != null) user.setUsername(request.getUsername());
        if (request.getEmail() != null) user.setEmail(request.getEmail());
        user.setEnabled(request.isActive());

        if (request.getRoles() != null) {
            Set<Role> roles = new HashSet<>();
            for (String roleName : request.getRoles()) {
                Role role = roleRepository.findByName(roleName)
                    .orElseThrow(() -> new RuntimeException("Role not found: " + roleName));
                roles.add(role);
            }
            user.setRoles(roles);
        }

        User savedUser = userRepository.save(user);
        auditLogService.log("UPDATE_USER", "User", id, 
            String.format("Updated user %s. Email: %s -> %s", oldUsername, oldEmail, savedUser.getEmail()));
        
        return mapToResponse(savedUser);
    }

    @Transactional
    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        userRepository.delete(user);
        auditLogService.log("DELETE_USER", "User", id, "Deleted user: " + user.getUsername());
    }

    @Transactional
    public UserResponse resetPassword(Long id, String newPassword) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setPassword(passwordEncoder.encode(newPassword));
        
        User savedUser = userRepository.save(user);
        auditLogService.log("RESET_PASSWORD", "User", id, "Reset password for user: " + user.getUsername());
        
        return mapToResponse(savedUser);
    }

    public List<UserResponse> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public UserResponse updateUserStatus(Long userId, boolean active) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setEnabled(active);
        return mapToResponse(userRepository.save(user));
    }

    @Transactional
    public UserResponse createUser(UserCreateRequest request) {
        // Check if username or email exists
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        // Find roles
        Set<Role> roles = new HashSet<>();
        if (request.getRoles() != null) {
            for (String roleName : request.getRoles()) {
                Role role = roleRepository.findByName(roleName)
                    .orElseThrow(() -> new RuntimeException("Role not found: " + roleName));
                roles.add(role);
            }
        }

        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .enabled(request.isEnabled())
                .roles(roles)
                .build();

        user = userRepository.save(user);
        auditLogService.log("CREATE_USER", "User", user.getId(), "Created user: " + user.getUsername());
        
        return mapToResponse(user);
    }

    private UserResponse mapToResponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .roles(user.getRoles().stream().map(role -> role.getName()).collect(Collectors.toList()))
                .active(user.isEnabled())
                .build();
    }
}
