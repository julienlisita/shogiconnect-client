// src/services/authService.js

import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth';

const setAuthToken = (token) => {
  axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : '';
};
const clearAuthToken = () => {
  delete axios.defaults.headers.common['Authorization'];
};

const login = async (username, password) => {
  const response = await axios.post(`${API_URL}/login`, { username, password });
  return response.data; 
};

const signup = async (username, email, password) => {
  const response = await axios.post(`${API_URL}/signup`, { username, email, password });
  return response.data;
};

const logout = () => {
  localStorage.removeItem('token');
  delete axios.defaults.headers.common['Authorization'];
};

export default { setAuthToken, clearAuthToken, login, signup, logout };