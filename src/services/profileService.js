import axios from "axios";

const API_URL = "http://localhost:3000/api/users/profile"; 

// Fonction pour récupérer les données du profil
const getProfile = async () => {
    const response = await axios.get(API_URL);
    return response.data.data;
};

// Fonction pour mettre à jour les données du profil
const updateProfile = async (updatedData) => {
    const response = await axios.put({API_URL}, updatedData);
    return response.data.data;
};

export default { getProfile, updateProfile };