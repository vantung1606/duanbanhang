import apiClient from './apiClient';

const ADMIN_URL = '/admin';
const MANAGER_URL = '/manager';

export const adminService = {
  // User Management
  getAllUsers: async () => {
    const response = await apiClient.get(`${ADMIN_URL}/users`);
    return response.data;
  },

  createUser: async (userData) => {
    const response = await apiClient.post(`${ADMIN_URL}/users`, userData);
    return response.data;
  },

  updateUserStatus: async (userId, active) => {
    const response = await apiClient.put(`${ADMIN_URL}/users/${userId}/status?active=${active}`);
    return response.data;
  },

  updateUser: async (userId, userData) => {
    const response = await apiClient.put(`${ADMIN_URL}/users/${userId}`, userData);
    return response.data;
  },

  deleteUser: async (userId) => {
    const response = await apiClient.delete(`${ADMIN_URL}/users/${userId}`);
    return response.data;
  },

  resetPassword: async (userId, newPassword) => {
    const response = await apiClient.patch(`${ADMIN_URL}/users/${userId}/password?newPassword=${newPassword}`);
    return response.data;
  },

  getAuditLogs: async () => {
    const response = await apiClient.get(`${MANAGER_URL}/logs`);
    return response.data;
  },

  getDashboardStats: async () => {
    const response = await apiClient.get(`${MANAGER_URL}/analytics/dashboard`);
    return response.data;
  },

  // Product Management
  getAllProducts: async () => {
    const response = await apiClient.get(`${MANAGER_URL}/products`);
    return response.data;
  },

  createProduct: async (productData) => {
    const response = await apiClient.post(`${MANAGER_URL}/products`, productData);
    return response.data;
  },

  updateProduct: async (productId, productData) => {
    const response = await apiClient.put(`${MANAGER_URL}/products/${productId}`, productData);
    return response.data;
  },

  deleteProduct: async (productId) => {
    const response = await apiClient.delete(`${MANAGER_URL}/products/${productId}`);
    return response.data;
  },

  getAllCategories: async () => {
    const response = await apiClient.get(`${MANAGER_URL}/categories`);
    return response.data;
  },

  createCategory: async (categoryData) => {
    const response = await apiClient.post(`${MANAGER_URL}/categories`, categoryData);
    return response.data;
  },

  updateCategory: async (categoryId, categoryData) => {
    const response = await apiClient.put(`${MANAGER_URL}/categories/${categoryId}`, categoryData);
    return response.data;
  },

  deleteCategory: async (categoryId) => {
    const response = await apiClient.delete(`${MANAGER_URL}/categories/${categoryId}`);
    return response.data;
  },

  getAllBrands: async () => {
    const response = await apiClient.get(`${MANAGER_URL}/brands`);
    return response.data;
  },

  getAllAttributes: async () => {
    const response = await apiClient.get(`${MANAGER_URL}/attributes`);
    return response.data;
  },

  createAttribute: async (attrData) => {
    const response = await apiClient.post(`${MANAGER_URL}/attributes`, attrData);
    return response.data;
  },

  addAttributeValue: async (attrId, valueData) => {
    const response = await apiClient.post(`${MANAGER_URL}/attributes/${attrId}/values`, valueData);
    return response.data;
  },

  deleteAttribute: async (attrId) => {
    const response = await apiClient.delete(`${MANAGER_URL}/attributes/${attrId}`);
    return response.data;
  },

  getInventory: async () => {
    const response = await apiClient.get(`${MANAGER_URL}/inventory`);
    return response.data;
  },

  adjustStock: async (adjustmentData) => {
    const response = await apiClient.post(`${MANAGER_URL}/inventory/adjust`, adjustmentData);
    return response.data;
  }
};
