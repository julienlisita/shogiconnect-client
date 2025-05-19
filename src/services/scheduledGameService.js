// src/services/scheduledGameService.js

import axios from "../config/axiosConfig";

// Récupérer la liste des parties créées
const getScheduledGames = async () => {
    const response = await axios.get(`/scheduledGames`);
    return response.data.data;
};

// Créer une partie en tant qu'organisateur
const addScheduledGame = async (scheduledGameData) => {
    const response = await axios.post(`/scheduledGames`, scheduledGameData);
    return response.data.data;
};

// Supprimer une partie en tant qu'organisateur ou admin
const deleteScheduledGame = async (scheduledGameId) => {
    const response = await axios.delete(`/scheduledGames/${scheduledGameId}`);
    return response.data.data;
};

 // S'inscrire à une partie en tant que participant
const joinScheduledGame = async (scheduledGameId) => {
    const response = await axios.post(`/scheduledGames/${scheduledGameId}/join`);
    return response.data.data;
};

// Se désinscrire d'une partie en tant que participant
const unsubscribeFromScheduledGame = async (scheduledGameId) => {
    const response = await axios.post(`/scheduledGames/${scheduledGameId}/unsubscribe`);
    return response.data.data;
};

export default { getScheduledGames, addScheduledGame, deleteScheduledGame, joinScheduledGame, unsubscribeFromScheduledGame };