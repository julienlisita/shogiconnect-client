// src/services/topicService.js

import axios from 'axios';

const API_URL = 'http://localhost:3000/api/topics';

// Récupérer la liste de tout les topics
const getTopics = async () => {
    const response = await axios.get(API_URL);
    return response.data.data;
};

// Créer un topic
const addTopic = async (topicData) => {
    const response = await axios.post(API_URL, topicData);
    return response.data.data;
};

// Supprimer un topic (admin uniquement)
const deleteTopic = async (topicId) => {
    const response = await axios.delete(`${API_URL}/${topicId}`);
    return response.data.data;
};

export default { getTopics, addTopic, deleteTopic };