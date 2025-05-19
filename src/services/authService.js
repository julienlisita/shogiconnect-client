// src/services/authService.js

import axios from "../config/axiosConfig";

const setAuthToken = (token) => {
  axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : '';
};
const clearAuthToken = () => {
  delete axios.defaults.headers.common['Authorization'];
};

const login = async (username, password) => {
  const response = await axios.post(`/auth/login`, { username, password });
  return response.data; 
};

const signup = async (username, email, password) => {
  const response = await axios.post(`/auth/signup`, { username, email, password });
  return response.data;
};

const logout = () => {
  localStorage.removeItem('token');
  delete axios.defaults.headers.common['Authorization'];
};

const changePassword = async (oldPassword, newPassword) => {
  const response = await axios.patch(`/auth/change-password`, {oldPassword, newPassword});
  return response.data;
};


export default { setAuthToken, clearAuthToken, login, signup, logout, changePassword };