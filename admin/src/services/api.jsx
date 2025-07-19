// services/api.js
import axios from 'axios';

// Create axios instance with default config
const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000',
  withCredentials: true, // Important for cookies
});

// Request interceptor
API.interceptors.request.use((config) => {
  // You can add headers here if needed
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response interceptor
API.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response?.status === 401) {
    // Handle unauthorized (redirect to login)
    window.location = '/login';
  }
  return Promise.reject(error);
});

export default {
  // Auth
  login: (credentials) => API.post('/admin/login', credentials),
  verifyToken: () => API.get('/admin/verify'),
  logout: () => API.post('/auth/admin/logout'),

  // Images
  getImages: () => API.get('/stock/list'),
  getSingleImage: (id) => API.post(`/stock/single`, { imageID: id }), // For POST-style endpoints
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
  getCategories: () => API.get('/stock/categories')
  // verifyToken:()=>API.get('/auth/admin/verify'),
  // Tracking
  
};