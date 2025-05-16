// src/services/categoryService.js

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getCategories = async () => {
    const response = await axios.get(`${API_BASE_URL}/categories`);
    return response.data.data;
};

export default { getCategories };