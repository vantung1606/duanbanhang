package com.example.DIY.config;

import com.example.DIY.entities.iam.Profile;
import com.example.DIY.entities.iam.Role;
import com.example.DIY.entities.iam.User;
import com.example.DIY.repositories.iam.ProfileRepository;
import com.example.DIY.repositories.iam.RoleRepository;
import com.example.DIY.repositories.iam.UserRepository;
import com.example.DIY.repositories.catalog.BrandRepository;
import com.example.DIY.repositories.catalog.CategoryRepository;
import com.example.DIY.repositories.catalog.ProductRepository;
import com.example.DIY.entities.catalog.Brand;
import com.example.DIY.entities.catalog.Category;
import com.example.DIY.entities.catalog.Product;
import com.example.DIY.entities.catalog.ProductVariant;
import com.example.DIY.entities.catalog.ProductImage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final ProfileRepository profileRepository;
    private final PasswordEncoder passwordEncoder;
    private final BrandRepository brandRepository;
    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;

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

        // 3. Create Categories for Smoke Machines
        Category machineCat = createCategoryIfNotFound("Máy Tạo Khói", "may-tao-khoi", "Các dòng máy tạo khói sân khấu, phòng karaoke");
        Category fluidCat = createCategoryIfNotFound("Dung Dịch Khói", "dung-dich-khoi", "Nước tạo khói, tinh dầu tạo mùi");
        Category accessoryCat = createCategoryIfNotFound("Phụ Kiện", "phu-kien", "Remote, dây dẫn, linh kiện thay thế");

        // 4. Create Sample Brands
        Brand diyBrand = createBrandIfNotFound("DuongDIY", "duong-diy", "Thương hiệu chế tạo máy khói chuyên nghiệp");
        Brand antariBrand = createBrandIfNotFound("Antari", "antari", "Thương hiệu máy khói quốc tế");

        // 5. Create Sample Products
        createSmokeProductIfNotFound(
            "Máy Khói 400W Mini DuongDIY", 
            "may-khoi-400w-mini", 
            "Dòng máy khói mini phù hợp cho phòng karaoke gia đình, nhỏ gọn dễ sử dụng.",
            machineCat, 
            diyBrand, 
            "MS400W", 
            new java.math.BigDecimal("850000")
        );

        createSmokeProductIfNotFound(
            "Dung Dịch Khói Đậm Đặc 5L", 
            "dung-dich-khoi-5l", 
            "Dung dịch tạo khói trắng, không mùi, an toàn cho sức khỏe.",
            fluidCat, 
            diyBrand, 
            "FL5L", 
            new java.math.BigDecimal("250000")
        );

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

    private Category createCategoryIfNotFound(String name, String slug, String desc) {
        return categoryRepository.findBySlug(slug).orElseGet(() -> {
            Category cat = Category.builder().name(name).slug(slug).description(desc).build();
            return categoryRepository.save(cat);
        });
    }

    private Brand createBrandIfNotFound(String name, String slug, String desc) {
        return brandRepository.findByName(name).orElseGet(() -> {
            Brand brand = Brand.builder().name(name).slug(slug).description(desc).build();
            return brandRepository.save(brand);
        });
    }

    private void createSmokeProductIfNotFound(String name, String slug, String desc, Category cat, Brand brand, String sku, java.math.BigDecimal price) {
        if (!productRepository.existsBySlug(slug)) {
            Product product = Product.builder()
                    .name(name)
                    .slug(slug)
                    .description(desc)
                    .category(cat)
                    .brand(brand)
                    .active(true)
                    .images(new ArrayList<>())
                    .variants(new ArrayList<>())
                    .build();
            
            Product savedProduct = productRepository.save(product);
            
            ProductVariant variant = ProductVariant.builder()
                    .sku(sku)
                    .price(price)
                    .stockQuantity(100)
                    .product(savedProduct)
                    .build();
            
            // Note: In real app, we would add variant to list and save product or save variant separately
            // For simplicity in initializer:
            java.util.List<ProductVariant> variants = new ArrayList<>();
            variants.add(variant);
            savedProduct.setVariants(variants);
            
            productRepository.save(savedProduct);

            log.info("Created sample product: {}", name);
        }
    }
}
