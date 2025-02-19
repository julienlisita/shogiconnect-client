// src/services/userService.js

import axios from 'axios';

const API_URL = 'http://localhost:3000/api/users';


// Récupérer tous les utilisateurs
const getUsers = async () => {
    const response = await axios.get(API_URL);
    return response.data.data;
};

// Supprimer un utilisateur par ID (admin uniquement)
const deleteUser = async (userId, token) => {
    const response = await axios.delete(`${API_URL}/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

export default { getUsers, deleteUser };