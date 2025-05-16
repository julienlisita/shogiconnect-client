// src/services/adminActivityService.js

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Récupère les activités d'un utilisateur
const getAdminActivities = async (adminId) => {
    const response = await axios.get(`${API_BASE_URL}/adminActivities/user/${adminId}`);
    return response.data.data;
};

export default { getAdminActivities };