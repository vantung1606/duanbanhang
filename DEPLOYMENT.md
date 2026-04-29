# Hướng dẫn cấu hình Tên miền duongdiyshop.com trên Render

Để kích hoạt tên miền của bạn, hãy đăng nhập vào trang quản trị DNS (nơi bạn mua tên miền) và thêm các bản ghi sau:

### 1. Bản ghi cho Subdomain (www)
- **Loại (Type)**: CNAME
- **Tên (Hostname)**: `www`
- **Giá trị (Target)**: `duanbanhang-frontend.onrender.com`

### 2. Bản ghi cho Tên miền chính (Root Domain)
- **Loại (Type)**: CNAME (hoặc ALIAS/ANAME nếu nhà cung cấp hỗ trợ)
- **Tên (Hostname)**: `@` (hoặc để trống tùy nhà cung cấp)
- **Giá trị (Target)**: `duanbanhang-frontend.onrender.com`

**LƯU Ý**: Nếu nhà cung cấp của bạn KHÔNG hỗ trợ CNAME cho tên miền chính, hãy sử dụng bản ghi **A** sau:
- **Loại (Type)**: A
- **Tên (Hostname)**: `@`
- **Giá trị (IP Address)**: `216.24.57.1`

---

## Cấu hình trong Render Dashboard
1. Truy cập vào Service **duanbanhang-frontend**.
2. Chọn **Settings** ở thanh bên trái.
3. Cuộn xuống phần **Custom Domains**.
4. Bấm **Add Custom Domain** và nhập `duongdiyshop.com`.
5. Làm tương tự cho `www.duongdiyshop.com`.
6. Chờ Render xác minh (có thể mất vài phút đến vài giờ).
