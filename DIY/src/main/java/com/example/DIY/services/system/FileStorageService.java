package com.example.DIY.services.system;

import org.springframework.stereotype.Service;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.UUID;

@Service
public class FileStorageService {

    private final String uploadDir = "uploads/products/";

    public String saveBase64Image(String base64Data) {
        if (base64Data == null || !base64Data.startsWith("data:image")) {
            return base64Data; // Return as is if it's already a URL or null
        }

        try {
            // Ensure directory exists
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // Extract data
            String[] parts = base64Data.split(",");
            String imageString = parts[1];
            String extension = parts[0].split("/")[1].split(";")[0];
            
            byte[] imageBytes = Base64.getDecoder().decode(imageString);
            
            String fileName = UUID.randomUUID().toString() + "." + extension;
            Path filePath = uploadPath.resolve(fileName);
            
            Files.write(filePath, imageBytes);
            
            // Return the URL to be stored in DB
            return "/uploads/products/" + fileName;
        } catch (IOException e) {
            throw new RuntimeException("Could not save image file", e);
        }
    }
}
