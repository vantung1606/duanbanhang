package com.example.DIY.services.system;

import com.example.DIY.dtos.system.ChatMessageDTO;
import com.example.DIY.dtos.system.ChatRequestDTO;
import com.example.DIY.dtos.system.ChatResponseDTO;
import com.example.DIY.entities.catalog.Product;
import com.example.DIY.repositories.catalog.ProductRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
@Slf4j
public class AiServiceImpl implements AiService {

    private final ProductRepository productRepository;
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final RestTemplate restTemplate = new RestTemplate();

    public AiServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Value("${application.security.gemini.api-key:${GEMINI_API_KEY:}}")
    private String geminiApiKey;

    @Override
    public ChatResponseDTO chat(ChatRequestDTO request) {
        if (geminiApiKey == null || geminiApiKey.trim().isEmpty()) {
            log.warn("Gemini API key is not configured. Returning fallback response.");
            return ChatResponseDTO.builder()
                    .role("assistant")
                    .content("Xin chào! Hiện tại tính năng tư vấn AI của DuongDIY Shop đang bảo trì. Bạn vui lòng liên hệ Hotline: 0987654321 để được hỗ trợ nhanh nhất nhé!")
                    .build();
        }

        try {
            String apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + geminiApiKey;

            // Construct payload using standard Maps and Lists
            Map<String, Object> payload = new HashMap<>();

            // 1. Contents history
            List<Map<String, Object>> contents = new ArrayList<>();
            for (ChatMessageDTO msg : request.getMessages()) {
                Map<String, Object> contentMap = new HashMap<>();
                String role = "assistant".equalsIgnoreCase(msg.getRole()) ? "model" : "user";
                contentMap.put("role", role);

                List<Map<String, Object>> parts = new ArrayList<>();
                Map<String, Object> part = new HashMap<>();
                part.put("text", msg.getContent());
                parts.add(part);

                contentMap.put("parts", parts);
                contents.add(contentMap);
            }
            payload.put("contents", contents);

            // 2. System Instruction
            Map<String, Object> systemInstruction = new HashMap<>();
            List<Map<String, Object>> systemParts = new ArrayList<>();
            Map<String, Object> systemPart = new HashMap<>();
            systemPart.put("text", buildSystemInstruction());
            systemParts.add(systemPart);
            systemInstruction.put("parts", systemParts);
            payload.put("systemInstruction", systemInstruction);

            // 3. Generation Config
            Map<String, Object> generationConfig = new HashMap<>();
            generationConfig.put("temperature", 0.3);
            generationConfig.put("maxOutputTokens", 2048);
            payload.put("generationConfig", generationConfig);

            // Send request
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(payload, headers);

            String responseJson = restTemplate.postForObject(apiUrl, entity, String.class);
            JsonNode root = objectMapper.readTree(responseJson);

            String responseText = root.path("candidates")
                    .path(0)
                    .path("content")
                    .path("parts")
                    .path(0)
                    .path("text")
                    .asText();

            if (responseText == null || responseText.trim().isEmpty()) {
                responseText = "Xin lỗi, mình chưa hiểu ý bạn lắm. Bạn có thể nói rõ hơn được không?";
            }

            return ChatResponseDTO.builder()
                    .role("assistant")
                    .content(responseText.trim())
                    .build();

        } catch (Exception e) {
            log.error("Error communicating with Gemini API", e);
            return ChatResponseDTO.builder()
                    .role("assistant")
                    .content("Xin lỗi, hệ thống AI đang gặp sự cố nhỏ khi xử lý câu hỏi của bạn. Vui lòng thử lại sau hoặc gọi Hotline: 0987654321 để được giải đáp trực tiếp nhé!")
                    .build();
        }
    }

    private String buildSystemInstruction() {
        StringBuilder sb = new StringBuilder();
        sb.append("Bạn là 'Trợ lý AI DuongDIY Shop' - một nhân viên tư vấn bán hàng và hỗ trợ kỹ thuật thiết bị sân khấu thân thiện, nhiệt tình.\n");
        sb.append("PHONG CÁCH TRÒ CHUYỆN:\n");
        sb.append("- Hãy xưng hô 'shop' hoặc 'mình' và gọi khách hàng là 'bạn'.\n");
        sb.append("- Tư vấn ngắn gọn, tập trung vào nhu cầu thực tế của khách hàng.\n");
        sb.append("- Hãy tỏ ra thân thiện, nhiệt huyết, hiếu khách.\n");
        sb.append("- Trả lời bằng tiếng Việt tự nhiên.\n\n");

        sb.append("DANH SÁCH SẢN PHẨM CÓ SẴN TẠI CỬA HÀNG:\n");
        try {
            List<Product> products = productRepository.findAll();
            boolean hasActive = false;
            for (Product p : products) {
                if (p.isActive()) {
                    hasActive = true;
                    sb.append("- Tên: ").append(p.getName()).append("\n");
                    sb.append("  Mô tả: ").append(p.getShortDescription() != null ? p.getShortDescription() : p.getDescription()).append("\n");
                    if (p.getVariants() != null && !p.getVariants().isEmpty()) {
                        sb.append("  Giá từ: ").append(p.getVariants().get(0).getPrice()).append(" VNĐ\n");
                    }
                    sb.append("  Đường dẫn: /product/").append(p.getSlug()).append("\n\n");
                }
            }
            if (!hasActive) {
                appendFallbackProducts(sb);
            }
        } catch (Exception e) {
            log.warn("Could not load products from db for AI context: {}", e.getMessage());
            appendFallbackProducts(sb);
        }

        sb.append("HƯỚNG DẪN TƯ VẤN:\n");
        sb.append("- Nếu khách hàng hỏi về nhu cầu tạo khói:\n");
        sb.append("  + Phòng karaoke nhỏ, gia đình, studio chụp ảnh: Gợi ý 'Máy Khói 400W Mini DuongDIY'.\n");
        sb.append("  + Sân khấu trung bình, tiệc cưới ngoài trời: Gợi ý 'Máy Khói 900W Sân Khấu' hoặc 'Máy Khói 1500W Chuyên Nghiệp'.\n");
        sb.append("  + Sân khấu lớn, muốn tạo hiệu ứng sương khói bay sát mặt đất (giống như mây): Gợi ý 'Máy Tạo Khói Lạnh 3000W'.\n");
        sb.append("- Nhấn mạnh việc mua kèm 'Dung Dịch Khói Đậm Đặc 5L' hoặc tinh dầu tạo mùi để khói có mùi thơm bạc hà/hoa hồng nhẹ và không gây tắc máy.\n");
        sb.append("- Nếu khách hỏi chính sách: giao hàng nhanh toàn quốc, bảo hành 12 tháng chính hãng DuongDIY, đổi trả trong vòng 30 ngày nếu có lỗi sản xuất.\n");
        sb.append("- Nếu có câu hỏi vượt quá khả năng tư vấn kỹ thuật chuyên sâu, hãy cung cấp thông tin liên hệ của shop:\n");
        sb.append("  + Hotline/Zalo: 0987654321\n");
        sb.append("  + Email: duongdiyshop@gmail.com\n");
        sb.append("  + Địa chỉ: Quận 1, TP. Hồ Chí Minh\n");

        return sb.toString();
    }

    private void appendFallbackProducts(StringBuilder sb) {
        sb.append("- Tên: Máy Khói 400W Mini DuongDIY\n");
        sb.append("  Mô tả: Máy khói công suất 400W nhỏ gọn, thích hợp cho phòng karaoke gia đình, studio chụp ảnh, tiệc sinh nhật nhỏ.\n");
        sb.append("  Giá từ: 850,000 VNĐ\n");
        sb.append("  Đường dẫn: /product/may-khoi-400w-mini\n\n");

        sb.append("- Tên: Máy Khói 900W Sân Khấu\n");
        sb.append("  Mô tả: Máy tạo khói công suất 900W với rơ le tự ngắt và điều khiển từ xa, phù hợp cho sân khấu vừa và nhỏ.\n");
        sb.append("  Giá từ: 1,250,000 VNĐ\n");
        sb.append("  Đường dẫn: /product/may-khoi-900w-san-khau\n\n");

        sb.append("- Tên: Máy Tạo Khói Lạnh 3000W\n");
        sb.append("  Mô tả: Thiết bị tạo hiệu ứng khói nặng bay sát mặt đất chuyên nghiệp cho tiệc cưới và liveshow sân khấu lớn.\n");
        sb.append("  Giá từ: 5,800,000 VNĐ\n");
        sb.append("  Đường dẫn: /product/may-khoi-lanh-3000w\n\n");

        sb.append("- Tên: Dung Dịch Khói Đậm Đặc 5L\n");
        sb.append("  Mô tả: Nước tạo khói cao cấp siêu đậm đặc, không gây mùi khét, không đóng cặn, bảo vệ đầu phun máy khói.\n");
        sb.append("  Giá từ: 250,000 VNĐ\n");
        sb.append("  Đường dẫn: /product/dung-dich-khoi-5l\n\n");
    }
}
