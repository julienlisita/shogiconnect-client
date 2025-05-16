// src/services/userStatsService.js

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getUserStats = async () => {
    const response = await axios.get(`${API_BASE_URL}/userStats`);
    return response.data.data;
};

export default { getUserStats };