// src/services/commentService.js

import axios from "../config/axiosConfig";

//Récupérer la liste de tout les commentaires
const getComments = async () => {
    const response = await axios.get(`/comments`);
    return response.data.data;
};

// Créer un commentaire
const addComment = async (commentData) => {
    const response = await axios.post(`/comments`, commentData);
    return response.data.data;
};

// Supprimer un commentaire (admin uniquement)
const deleteComment = async (commentId) => {
    const response = await axios.delete(`/comments/${commentId}`);
    return response.data.data;
};

export default { getComments, addComment, deleteComment };