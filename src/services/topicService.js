// src/services/topicService.js

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Récupérer la liste de tout les topics
const getTopics = async () => {
    const response = await axios.get(`${API_BASE_URL}/topics`);
    return response.data.data;
};

// Créer un topic
const addTopic = async (topicData) => {
    const response = await axios.post(`${API_BASE_URL}/topics`, topicData);
    return response.data.data;
};

// Supprimer un topic (admin uniquement)
const deleteTopic = async (topicId) => {
    const response = await axios.delete(`${API_BASE_URL}/topics/${topicId}`);
    return response.data.data;
};

export default { getTopics, addTopic, deleteTopic };