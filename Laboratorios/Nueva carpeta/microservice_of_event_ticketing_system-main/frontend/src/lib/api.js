import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para añadir token de autenticación
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  // NginX
  login: (credentials) => api.post('http://localhost/api/v1/autentication/api/auth/create-token', credentials),
  
  //local
  ///login: (credentials) => api.post('http://localhost:5246/api/auth/create-token', credentials),

  /*register: (userData) => api.post('/api/auth/register', userData),
  logout: () => api.post('/api/auth/logout'),
  getProfile: () => api.get('/api/auth/profile'),*/
};

// Events API
export const eventsAPI = {
  getAll: () => api.get('/api/v1/events'),
  getById: (id) => api.get(`/api/v1/events/${id}`),
  create: (eventData) => api.post('/api/v1/events', eventData),
  update: (id, eventData) => api.put(`/api/v1/events/${id}`, eventData),
  delete: (id) => api.delete(`/api/v1/events/${id}`),
};

// Tickets API
export const ticketsAPI = {
  getAll: () => api.get('/api/v1/tickets'),
  getById: (id) => api.get(`/api/v1/tickets/${id}`),
  purchase: (ticketData) => api.post('/api/v1/tickets', ticketData),
  getUserTickets: () => api.get('/api/v1/tickets/user'),
};

// Notifications API
export const notificationsAPI = {
  getAll: () => api.get('/api/v1/notifications'),
  markAsRead: (id) => api.put(`/api/v1/notifications/${id}/read`),
  delete: (id) => api.delete(`/api/v1/notifications/${id}`),
};

export default api;