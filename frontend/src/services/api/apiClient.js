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
    // Get token from Zustand store persistence
    const authData = localStorage.getItem('techchain-auth');
    if (authData) {
      try {
        const parsed = JSON.parse(authData);
        const token = parsed.state?.token;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (e) {
        console.error('Error parsing auth data', e);
      }
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
      // Optional: Redirect to login or handle unauthorized access
      console.error('Unauthorized access - please login again');
    }
    return Promise.reject(error);
  }
);

export default apiClient;
