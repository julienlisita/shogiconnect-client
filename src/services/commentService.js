// src/services/commentService.js

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

//Récupérer la liste de tout les commentaires
const getComments = async () => {
    const response = await axios.get(`${API_BASE_URL}/comments`);
    return response.data.data;
};

// Créer un commentaire
const addComment = async (commentData) => {
    const response = await axios.post(`${API_BASE_URL}/comments`, commentData);
    return response.data.data;
};

// Supprimer un commentaire (admin uniquement)
const deleteComment = async (commentId) => {
    const response = await axios.delete(`${API_BASE_URL}/comments/${commentId}`);
    return response.data.data;
};

export default { getComments, addComment, deleteComment };