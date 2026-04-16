import axios from 'axios';

const API_BASE_URL = '/api/public/catalog';

export const catalogService = {
  getProducts: async (params) => {
    try {
      const response = await axios.get(API_BASE_URL, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching catalog products:', error);
      throw error;
    }
  },

  getProductBySlug: async (slug) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${slug}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product detail:', error);
      throw error;
    }
  },
  
  // Mock data for initial UI development
  getMockProducts: () => [
    { id: 1, name: 'iPhone 15 Pro Max', slug: 'iphone-15-pro-max', brandName: 'Apple', categoryName: 'Mobile', minPrice: 1199, maxPrice: 1599, thumbnailUrl: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&q=80&w=400', rating: 4.8 },
    { id: 2, name: 'MacBook Pro M3 Max', slug: 'macbook-pro-m3-max', brandName: 'Apple', categoryName: 'Laptop', minPrice: 2499, maxPrice: 4899, thumbnailUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=400', rating: 4.9 },
    { id: 3, name: 'Samsung Galaxy S24 Ultra', slug: 's24-ultra', brandName: 'Samsung', categoryName: 'Mobile', minPrice: 1299, maxPrice: 1499, thumbnailUrl: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=400', rating: 4.7 },
    { id: 4, name: 'Sony WH-1000XM5', slug: 'sony-xm5', brandName: 'Sony', categoryName: 'Accessories', minPrice: 399, maxPrice: 399, thumbnailUrl: 'https://images.unsplash.com/photo-1618366712271-bfdb631c633a?auto=format&fit=crop&q=80&w=400', rating: 4.8 },
    { id: 5, name: 'Apple Vision Pro', slug: 'vision-pro', brandName: 'Apple', categoryName: 'Wearables', minPrice: 3499, maxPrice: 3499, thumbnailUrl: 'https://images.unsplash.com/photo-1707053591461-8274f88062e7?auto=format&fit=crop&q=80&w=400', rating: 5.0 },
    { id: 6, name: 'Dell XPS 13 Plus', slug: 'dell-xps-13', brandName: 'Dell', categoryName: 'Laptop', minPrice: 1399, maxPrice: 2199, thumbnailUrl: 'https://images.unsplash.com/photo-1593642632823-8f785bf67e45?auto=format&fit=crop&q=80&w=400', rating: 4.6 },
  ]
};
