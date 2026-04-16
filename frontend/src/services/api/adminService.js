import axios from 'axios';

const API_URL = '/api/v1/admin';
const ANALYTICS_URL = '/api/v1/manager/analytics';

export const adminService = {
  // User Management
  getAllUsers: async () => {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  },

  updateUserStatus: async (userId, active) => {
    const response = await axios.put(`${API_URL}/users/${userId}/status?active=${active}`);
    return response.data;
  },

  // Dashboard & Analytics
  getDashboardStats: async () => {
    const response = await axios.get(`${ANALYTICS_URL}/dashboard`);
    return response.data;
  }
};
