// src/services/categoryService.js

import axios from 'axios';

const API_URL = 'http://localhost:3000/api/categories';

const getCategories = async () => {
    const response = await axios.get(API_URL);
    return response.data.data;
};

export default { getCategories };