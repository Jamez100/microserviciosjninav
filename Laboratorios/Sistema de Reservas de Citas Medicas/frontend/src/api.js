import axios from 'axios';

// Base URL para que axios use el proxy inverso
const api = axios.create({
  baseURL: '/api'
});

export default api;
