import axios from "axios";

const API_URL = "http://localhost:3000/api/users/me"; 

// Fonction pour récupérer les données du profil
const getProfile = async () => {
    const response = await axios.get(API_URL);
    return response.data.data;
};

// Fonction pour mettre à jour les données de son propre profil
const updateProfile = async (updatedData) => {
    const response = await axios.put(API_URL, updatedData);
    return response.data.data;
};

// Fonction pour supprimer son porpore profil
const deleteProfile = async () => {
    try {
        const response = await axios.delete(API_URL); 
        return response.data.data; 
      } catch (error) {
        console.error('Erreur lors de la suppression du profil:', error);
        throw error; 
      }
};

export default { getProfile, updateProfile, deleteProfile };