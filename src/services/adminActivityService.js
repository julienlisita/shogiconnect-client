// src/services/adminActivityService.js

import axios from "../config/axiosConfig";

// Récupère les activités d'un utilisateur
const getAdminActivities = async (adminId) => {
    const response = await axios.get(`/adminActivities/user/${adminId}`);
    return response.data.data;
};

export default { getAdminActivities };