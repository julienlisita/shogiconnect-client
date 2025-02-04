// src/services/userStatsService.js

import axios from 'axios';

const API_URL = 'http://localhost:3000/api/userStats';

const getUserStats = async () => {
    const response = await axios.get(API_URL);
    return response.data.data;
};

export default { getUserStats };