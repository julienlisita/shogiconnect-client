// src/services/userService.js

import axios from 'axios';

const API_URL = 'http://localhost:3000/api/users';


// Récupérer tous les utilisateurs
const getUsers = async () => {
    const response = await axios.get(API_URL);
    return response.data.data;
};

// Supprimer un utilisateur par ID (admin uniquement)
const deleteUser = async (userId) => {
    const response = await axios.delete(`${API_URL}/${userId}`, {
    });
    return response.data.data;
};

// Mettre à jour le rôle d'un utilisateur (admin uniquement)
const updateUserRole = async (userId, newRole) => {
    const response = await axios.patch(`${API_URL}/${userId}/role`, { RoleId: newRole });
    return response.data.data;
};


export default { getUsers, deleteUser, updateUserRole };