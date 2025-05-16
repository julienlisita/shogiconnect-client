// src/services/userService.js

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Récupérer tous les utilisateurs
const getUsers = async () => {
    const response = await axios.get(`${API_BASE_URL}/users`);
    return response.data.data;
};

// Supprimer un utilisateur par ID (admin uniquement)
const deleteUser = async (userId) => {
    const response = await axios.delete(`${API_BASE_URL}/users/${userId}`, {
    });
    return response.data.data;
};

// Mettre à jour le rôle d'un utilisateur (admin uniquement)
const updateUserRole = async (userId, newRole) => {
    const response = await axios.patch(`${API_BASE_URL}/users/${userId}/role`, { RoleId: newRole });
    return response.data.data;
};


export default { getUsers, deleteUser, updateUserRole };