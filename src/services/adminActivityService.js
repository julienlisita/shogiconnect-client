import axios from "axios";

const API_URL = "http://localhost:3000/api/AdminActivities"; 

// Récupère les activités d'un utilisateur
const getAdminActivities = async (adminId) => {
    const response = await axios.get(`${API_URL}/user/${adminId}`);
    return response.data.data;
};

export default { getAdminActivities };