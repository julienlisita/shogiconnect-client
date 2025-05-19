// src/services/categoryService.js

import axios from "../config/axiosConfig";

const getCategories = async () => {
    const response = await axios.get(`/categories`);
    return response.data.data;
};

export default { getCategories };