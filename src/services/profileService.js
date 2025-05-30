// src/services/profileService.js

import axios from "../config/axiosConfig";

// Fonction pour récupérer les données du profil
const getProfile = async () => {
    const response = await axios.get(`/users/me`);
    return response.data.data;
};

// Fonction pour mettre à jour les données de son propre profil
const updateProfile = async (updatedData) => {
    const response = await axios.put(`/users/me`, updatedData);
    return response.data.data;
};

// Fonction pour supprimer son porpore profil
const deleteProfile = async () => {
    try {
        const response = await axios.delete(`/users/me`); 
        return response.data.data; 
      } catch (error) {
        console.error('Erreur lors de la suppression du profil:', error);
        throw error; 
      }
};

// Mettre à jour l'avatar de l'utilisateur
const updateAvatar = async (avatarData) => {
  const formData = new FormData();
  formData.append("avatar", avatarData);

  try {
      const response = await axios.patch(`/users/me/avatar`, formData, {
          headers: {
              "Content-Type": "multipart/form-data",
          },
      });
      return response.data; 
  } catch (error) {
      console.error("Erreur lors de la mise à jour de l'avatar", error);
      throw error;
  }
};

export default { getProfile, updateProfile, deleteProfile, updateAvatar };