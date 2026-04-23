package com.example.DIY.services.iam;

import com.example.DIY.dtos.iam.AuthResponse;
import com.example.DIY.dtos.iam.LoginRequest;
import com.example.DIY.dtos.iam.RegisterRequest;
import com.example.DIY.entities.iam.Profile;
import com.example.DIY.entities.iam.User;
import com.example.DIY.repositories.iam.RoleRepository;
import com.example.DIY.repositories.iam.UserRepository;
import com.example.DIY.security.JwtService;
import com.example.DIY.services.system.AuditLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final AuditLogService auditLogService;

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username is already taken!");
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email is already in use!");
        }

        var userRole = roleRepository.findByName("USER")
                .orElseThrow(() -> new RuntimeException("Default role USER not found!"));

        var user = User.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .email(request.getEmail())
                .roles(Set.of(userRole))
                .enabled(true)
                .build();

        // Create empty profile link
        var profile = Profile.builder().user(user).build();
        user.setProfile(profile);

        userRepository.save(user);
        auditLogService.log("USER_REGISTER", "User", user.getId(), "New user registered: " + user.getUsername());
        
        var jwtToken = jwtService.generateToken(user);
        
        return AuthResponse.builder()
                .token(jwtToken)
                .username(user.getUsername())
                .role("USER")
                .build();
    }

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );
        var user = userRepository.findByUsername(request.getUsername())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        auditLogService.log("USER_LOGIN", "User", user.getId(), "User logged in: " + user.getUsername());
        
        return AuthResponse.builder()
                .token(jwtToken)
                .username(user.getUsername())
                .role(user.getRoles().iterator().next().getName()) // Get first role
                .build();
    }
}
