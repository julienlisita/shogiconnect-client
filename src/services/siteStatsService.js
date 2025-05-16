// src/services/siteStatsService.js

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getSiteStats = async () => {
    const response = await axios.get(`${API_BASE_URL}/siteStats`);
    return response.data.data;
};

export default { getSiteStats };