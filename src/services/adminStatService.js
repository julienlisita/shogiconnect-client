// src/services/adminStatsService.js

import axios from "../config/axiosConfig";

const getAdminStats = async () => {
    const response = await axios.get(`/adminStats`);
    return response.data.data;
};

export default { getAdminStats };