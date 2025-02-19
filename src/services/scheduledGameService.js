// src/services/scheduledGameService.js

import axios from 'axios';

const API_URL = 'http://localhost:3000/api/scheduledGames';

// Récupérer la liste des parties créées
const getScheduledGames = async () => {
    const response = await axios.get(API_URL);
    return response.data.data;
};

// Créer une partie en tant qu'organisateur
const addScheduledGame = async (scheduledGameData) => {
    const response = await axios.post(API_URL, scheduledGameData);
    return response.data.data;
};

// Supprimer une partie en tant qu'organisateur ou admin
const deleteScheduledGame = async (scheduledGameId) => {
    const response = await axios.delete(`${API_URL}/${scheduledGameId}`);
    return response.data.data;
};

 // S'inscrire à une partie en tant que participant
const joinScheduledGame = async (scheduledGameId) => {
    const response = await axios.post(`${API_URL}/${scheduledGameId}/join`);
    return response.data.data;
};

// Se désinscrire d'une partie en tant que participant
const unsubscribeFromScheduledGame = async (scheduledGameId) => {
    const response = await axios.post(`${API_URL}/${scheduledGameId}/unsubscribe`);
    return response.data.data;
};

export default { getScheduledGames, addScheduledGame, deleteScheduledGame, joinScheduledGame, unsubscribeFromScheduledGame };