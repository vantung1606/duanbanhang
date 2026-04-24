import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to attach JWT token
apiClient.interceptors.request.use(
  (config) => {
    // Get token from multiple possible locations for consistency
    let token = null;
    
    // 1. Check techchain-auth (Zustand)
    const authData = localStorage.getItem('techchain-auth');
    if (authData) {
      try {
        const parsed = JSON.parse(authData);
        token = parsed.state?.token;
      } catch (e) {
        console.error('Error parsing auth data', e);
      }
    }

    // 2. Check direct 'token' storage (authService legacy)
    if (!token) {
      token = localStorage.getItem('token');
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors (like 401/403)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      console.error('Unauthorized access - please login again');
    }
    if (error.response && error.response.data) {
      console.error('API Error Response:', error.response.data);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
