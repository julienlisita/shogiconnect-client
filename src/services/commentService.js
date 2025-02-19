// src/services/commentService.js

import axios from 'axios';

const API_URL = 'http://localhost:3000/api/comments';

//Récupérer la liste de tout les commentaires
const getComments = async () => {
    const response = await axios.get(API_URL);
    return response.data.data;
};

// Créer un commentaire
const addComment = async (commentData) => {
    const response = await axios.post(API_URL, commentData);
    return response.data.data;
};

// Supprimer un commentaire (admin uniquement)
const deleteComment = async (commentId) => {
    const response = await axios.delete(`${API_URL}/${commentId}`);
    return response.data.data;
};

export default { getComments, addComment, deleteComment };