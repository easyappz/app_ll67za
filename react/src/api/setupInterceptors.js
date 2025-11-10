import instance from './axios';

// Configure base URL and attach additional interceptors without changing axios.js
instance.defaults.baseURL = '/api/';

// Request interceptor to attach JWT from localStorage ('accessToken')
instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      if (!config.headers) config.headers = {};
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle 401 globally
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    if (status === 401) {
      try {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('token');
      } catch (e) {
        // no-op
      }
      if (typeof window !== 'undefined' && window.location?.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
