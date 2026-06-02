package com.example.DIY.controllers.system;

import com.example.DIY.dtos.system.ChatRequestDTO;
import com.example.DIY.dtos.system.ChatResponseDTO;
import com.example.DIY.services.system.AiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/public/ai")
@RequiredArgsConstructor
public class AiController {

    private final AiService aiService;

    @PostMapping("/chat")
    public ResponseEntity<ChatResponseDTO> chat(@RequestBody ChatRequestDTO request) {
        return ResponseEntity.ok(aiService.chat(request));
    }
}
