// src/services/siteStatsService.js

import axios from 'axios';

const API_URL = 'http://localhost:3000/api/siteStats';

const getSiteStats = async () => {
    const response = await axios.get(API_URL);
    return response.data.data;
};

export default { getSiteStats };