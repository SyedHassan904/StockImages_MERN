// services/api.js
import axios from 'axios';

// Create axios instance with base URL
const API = axios.create({
  baseURL: process.env.REACT_APP_URL
});

// Request interceptor to attach token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling auth failures
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API calls
export default {
  // Admin Auth
  login: (credentials) => API.post('/auth/admin/login', credentials),
  verifyToken: () => API.get('/auth/admin/verify'),

  // Images
  getImages: () => API.get('/stock/list'),
  getSingleImage: (id) => API.post('/stock/single', { imageID: id }),
  uploadImage: (data) => {
    const formData = new FormData();
    formData.append('image', data.file);
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('tags', data.tags);
    formData.append('category', data.category);
    formData.append('pricePKR', data.pricePKR);
    formData.append('priceUSD', data.priceUSD);
    return API.post('/stock/admin/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  updateImage: (data) => API.put('/stock/admin/update', data),
  deleteImage: (data) => API.delete('/stock/admin/remove', { data }),
  searchImages: (query) => API.get('/search', { params: { query } }),

  // Stats
  getAllStats: () => API.get('/stat-api/admin/stats'),
  getImageStats: (id) => API.get(`/stat-api/admin/${id}/stat`),
  getCategories: () => API.get('/stock/categories'),
};
