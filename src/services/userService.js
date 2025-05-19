// src/services/userService.js

import axios from "../config/axiosConfig";

// Récupérer tous les utilisateurs
const getUsers = async () => {
    const response = await axios.get(`/users`);
    return response.data.data;
};

// Supprimer un utilisateur par ID (admin uniquement)
const deleteUser = async (userId) => {
    const response = await axios.delete(`/users/${userId}`, {
    });
    return response.data.data;
};

// Mettre à jour le rôle d'un utilisateur (admin uniquement)
const updateUserRole = async (userId, newRole) => {
    const response = await axios.patch(`/users/${userId}/role`, { RoleId: newRole });
    return response.data.data;
};


export default { getUsers, deleteUser, updateUserRole };