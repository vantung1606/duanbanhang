package com.example.DIY.config;

import com.example.DIY.entities.iam.Profile;
import com.example.DIY.entities.iam.Role;
import com.example.DIY.entities.iam.User;
import com.example.DIY.repositories.iam.ProfileRepository;
import com.example.DIY.repositories.iam.RoleRepository;
import com.example.DIY.repositories.iam.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final ProfileRepository profileRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void run(String... args) {
        log.info("Initializing sample data for roles and users...");

        // 1. Create Roles if they don't exist
        Role adminRole = createRoleIfNotFound("ADMIN", "System Administrator with full access");
        Role managerRole = createRoleIfNotFound("MANAGER", "Store Manager with analytics and catalog access");
        Role staffRole = createRoleIfNotFound("STAFF", "Store Staff with order and inventory access");
        Role userRole = createRoleIfNotFound("USER", "Regular Customer");

        // 2. Create Sample Users for each role
        createUserIfNotFound("admin", "admin@techchain.com", "admin123", adminRole, "Admin", "System");
        createUserIfNotFound("manager", "manager@techchain.com", "manager123", managerRole, "Manager", "TechChain");
        createUserIfNotFound("staff", "staff@techchain.com", "staff123", staffRole, "Staff", "Member");
        createUserIfNotFound("user", "user@techchain.com", "user123", userRole, "Customer", "Regular");

        log.info("Data initialization complete.");
    }

    private Role createRoleIfNotFound(String name, String description) {
        return roleRepository.findByName(name).orElseGet(() -> {
            Role role = Role.builder()
                    .name(name)
                    .description(description)
                    .build();
            return roleRepository.save(role);
        });
    }

    private void createUserIfNotFound(String username, String email, String password, Role role, String firstName, String lastName) {
        if (!userRepository.existsByUsername(username)) {
            User user = User.builder()
                    .username(username)
                    .email(email)
                    .password(passwordEncoder.encode(password))
                    .roles(Set.of(role))
                    .enabled(true)
                    .build();
            User savedUser = userRepository.save(user);

            Profile profile = Profile.builder()
                    .firstName(firstName)
                    .lastName(lastName)
                    .user(savedUser)
                    .build();
            profileRepository.save(profile);
            
            log.info("Created sample user: {} with role: {}", username, role.getName());
        }
    }
}
