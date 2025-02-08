// src/services/scheduledGameService.js

import axios from 'axios';

const API_URL = 'http://localhost:3000/api/scheduledGames';

const getScheduledGames = async () => {
    const response = await axios.get(API_URL);
    return response.data.data;
};

const addScheduledGame = async (scheduledGameData) => {
    const response = await axios.post(API_URL, scheduledGameData);
    return response.data.data;
};

export default { getScheduledGames, addScheduledGame };