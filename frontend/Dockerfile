# Build stage
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN rm -rf dist && npm run build

# Production stage
FROM nginx:stable-alpine

# Xóa các file mặc định của Nginx để tránh xung đột
RUN rm -rf /usr/share/nginx/html/*
RUN rm -f /etc/nginx/conf.d/default.conf

# Copy code đã build vào
COPY --from=build /app/dist /usr/share/nginx/html

# Copy cấu hình Nginx riêng vào
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
