// src/services/siteStatsService.js

import axios from "../config/axiosConfig";

const getSiteStats = async () => {
    const response = await axios.get(`/siteStats`);
    return response.data.data;
};

export default { getSiteStats };