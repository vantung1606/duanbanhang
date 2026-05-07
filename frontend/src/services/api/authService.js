import apiClient from './apiClient';

const AUTH_URL = '/auth';

export const register = async (userData) => {
  const response = await apiClient.post(`${AUTH_URL}/register`, userData);
  return response.data;
};

export const login = async (userData) => {
  const response = await apiClient.post(`${AUTH_URL}/login`, userData);
  // Store token after login
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/login';
};
