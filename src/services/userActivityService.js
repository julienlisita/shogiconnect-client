import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Récupère les activités d'un utilisateur
const getUserActivities = async (userId) => {
    const response = await axios.get(`${API_BASE_URL}/userActivities/user/${userId}`);
    return response.data.data;
};

export default { getUserActivities };