// src/config/axiosConfig.js

import axios from 'axios';

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL, // URL de base pour toutes les requêtes
});

// Intercepteur de requêtes
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Récupération du token
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Ajout du token dans les en-têtes
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Intercepteur de réponse
instance.interceptors.response.use(
    (response) => response, // ← ne modifie pas la réponse
    (error) => {
        // gestion des erreurs (inchangée)
        return Promise.reject(error);
    }
);

export default instance;