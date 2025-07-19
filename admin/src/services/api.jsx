// services/api.js
import axios from 'axios';


export default {
  // Auth
  login: (credentials) => axios.post(`${process.env.REACT_APP_URL}/admin/login`, credentials),
  verifyToken: () => axios.get(`${process.env.REACT_APP_URL}/admin/verify`),
  logout: () => axios.post(`${process.env.REACT_APP_URL}/auth/admin/logout`),

  // Images
  getImages: () => axios.get(`${process.env.REACT_APP_URL}/stock/list`),
  getSingleImage: (id) => axios.post(`${process.env.REACT_APP_URL}/stock/single`, { imageID: id }), // For POST-style endpoints
  uploadImage: (data) => {
    const formData = new FormData();
    formData.append('image', data.file);
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('tags', data.tags);
    formData.append('category', data.category);
    formData.append('pricePKR', data.pricePKR);
    formData.append('priceUSD', data.priceUSD);
    return axios.post(`${process.env.REACT_APP_URL}/stock/admin/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  updateImage: (data) => axios.put(`${process.env.REACT_APP_URL}/stock/admin/update`, data),
  deleteImage: (data) => axios.delete(`${process.env.REACT_APP_URL}/stock/admin/remove`, { data }),
  searchImages: (query) => axios.get(`${process.env.REACT_APP_URL}/search`, { params: { query } }),

  // Stats
  getAllStats: () => axios.get(`${process.env.REACT_APP_URL}/stat-api/admin/stats`),
  getImageStats: (id) => axios.get(`${process.env.REACT_APP_URL}/stat-api/admin/${id}/stat`),
  getCategories: () => axios.get(`${process.env.REACT_APP_URL}/stock/categories`)
  // verifyToken:()=>API.get('/auth/admin/verify'),
  // Tracking
  
};
