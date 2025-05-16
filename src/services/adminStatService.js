// src/services/adminStatsService.js

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getAdminStats = async (adminId) => {
    const response = await axios.get(`${API_BASE_URL}/adminStats/user/${adminId}`);
    return response.data.data;
};

export default { getAdminStats };