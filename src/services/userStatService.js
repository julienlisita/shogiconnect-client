// src/services/userStatsService.js

import axios from "../config/axiosConfig";

const getUserStats = async () => {
    const response = await axios.get(`/userStats`);
    return response.data.data;
};

export default { getUserStats };