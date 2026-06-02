package com.example.DIY.services.system;

import com.example.DIY.dtos.system.ChatRequestDTO;
import com.example.DIY.dtos.system.ChatResponseDTO;

public interface AiService {
    ChatResponseDTO chat(ChatRequestDTO request);
}
