// src/services/topicService.js

import axios from "../config/axiosConfig";

// Récupérer la liste de tout les topics
const getTopics = async () => {
    const response = await axios.get(`/topics`);
    return response.data.data;
};

// Créer un topic
const addTopic = async (topicData) => {
    const response = await axios.post(`/topics`, topicData);
    return response.data.data;
};

// Supprimer un topic (admin uniquement)
const deleteTopic = async (topicId) => {
    const response = await axios.delete(`/topics/${topicId}`);
    return response.data.data;
};

export default { getTopics, addTopic, deleteTopic };