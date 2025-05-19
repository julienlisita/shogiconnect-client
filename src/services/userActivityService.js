// src/services/userActivityService.js

import axios from "../config/axiosConfig";


// Récupère les activités d'un utilisateur
const getUserActivities = async (userId) => {
    const response = await axios.get(`/userActivities/user/${userId}`);
    return response.data.data;
};

export default { getUserActivities };