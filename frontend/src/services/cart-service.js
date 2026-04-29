import apiClient from './api/apiClient';

export const cartService = {
  // Get cart for logged in user
  getCart: async () => {
    try {
      const response = await apiClient.get('/v1/cart');
      return response.data;
    } catch (error) {
      console.error('Error fetching cart:', error);
      throw error;
    }
  },

  // Add item to cart
  addToCart: async (variantId, quantity) => {
    try {
      // Backend expects variantId and quantity as RequestParams
      const response = await apiClient.post(`/v1/cart/add?variantId=${variantId}&quantity=${quantity}`);
      return response.data;
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  },

  // Update quantity
  updateQuantity: async (itemId, quantity) => {
    try {
      const response = await apiClient.put(`/v1/cart/update/${itemId}?quantity=${quantity}`);
      return response.data;
    } catch (error) {
      console.error('Error updating cart quantity:', error);
      throw error;
    }
  },

  // Remove item
  removeItem: async (itemId) => {
    try {
      const response = await apiClient.delete(`/v1/cart/remove/${itemId}`);
      return response.data;
    } catch (error) {
      console.error('Error removing cart item:', error);
      throw error;
    }
  },

  // Clear cart
  clearCart: async () => {
    try {
      await apiClient.delete('/v1/cart/clear');
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  }
};
