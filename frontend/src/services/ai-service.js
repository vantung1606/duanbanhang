import apiClient from './api/apiClient';

export const aiService = {
  chat: async (messages) => {
    try {
      const response = await apiClient.post('/public/ai/chat', { messages });
      return response.data;
    } catch (error) {
      console.error('Error in AI Chat service:', error);
      throw error;
    }
  }
};
