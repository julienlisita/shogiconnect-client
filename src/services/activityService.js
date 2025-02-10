import axios from "axios";

const API_URL = "http://localhost:3000/api/userActivities"; 

// Récupère les activités d'un utilisateur
const getActivities = async (userId) => {
    const response = await axios.get(`${API_URL}/user/${userId}`);
    return response.data.data;
};

export default { getActivities };