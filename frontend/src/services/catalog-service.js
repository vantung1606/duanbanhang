import apiClient from './api/apiClient';

const API_BASE_URL = '/public/catalog';

export const catalogService = {
  getProducts: async (params) => {
    try {
      const response = await apiClient.get(API_BASE_URL, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching catalog products:', error);
      throw error;
    }
  },

  getProductBySlug: async (slug) => {
    try {
      const response = await apiClient.get(`${API_BASE_URL}/${slug}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product detail:', error);
      throw error;
    }
  },
  
  // Mock data for initial UI development
  getMockProducts: () => [
    { id: 1, name: 'Máy Khói 400W Mini DuongDIY', slug: 'may-khoi-400w-mini', brandName: 'DuongDIY', categoryName: 'Máy Tạo Khói', minPrice: 850000, maxPrice: 850000, thumbnailUrl: 'https://images.unsplash.com/photo-1514525253344-f814d0c9e58f?auto=format&fit=crop&q=80&w=400', rating: 4.8 },
    { id: 2, name: 'Máy Khói 900W Sân Khấu', slug: 'may-khoi-900w-san-khau', brandName: 'DuongDIY', categoryName: 'Máy Tạo Khói', minPrice: 1250000, maxPrice: 1250000, thumbnailUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=400', rating: 4.9 },
    { id: 3, name: 'Dung Dịch Khói Đậm Đặc 5L', slug: 'dung-dich-khoi-5l', brandName: 'DuongDIY', categoryName: 'Dung Dịch Khói', minPrice: 250000, maxPrice: 250000, thumbnailUrl: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=400', rating: 4.7 },
    { id: 4, name: 'Máy Khói 1500W Chuyên Nghiệp', slug: 'may-khoi-1500w-pro', brandName: 'DuongDIY', categoryName: 'Máy Tạo Khói', minPrice: 2450000, maxPrice: 2450000, thumbnailUrl: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=400', rating: 4.8 },
    { id: 5, name: 'Máy Tạo Khói Lạnh 3000W', slug: 'may-khoi-lanh-3000w', brandName: 'DuongDIY', categoryName: 'Máy Tạo Khói', minPrice: 5800000, maxPrice: 5800000, thumbnailUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=400', rating: 5.0 },
    { id: 6, name: 'Tinh Dầu Khói Bạc Hà', slug: 'tinh-dau-khoi-bac-ha', brandName: 'DuongDIY', categoryName: 'Phụ Kiện', minPrice: 120000, maxPrice: 120000, thumbnailUrl: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=400', rating: 4.6 },
  ]
};
