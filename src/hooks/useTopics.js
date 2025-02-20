// src/hooks/useTopics.js

import { useState, useEffect } from 'react';
import topicService from '../services/topicService';

const useTopics = () => {
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Récupérer la liste des topics au montage du composant
    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const topicsData = await topicService.getTopics();
                setTopics(topicsData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTopics();
    }, []);

    // Créer un topic
    const createTopic = async (newTopicData) => {
        try {
            const createdTopic = await topicService.addTopic(newTopicData);
            setTopics((prevTopics) => [...prevTopics, createdTopic]);
        } catch (err) {
            console.error("Erreur lors de l'ajout du topic :", err);
            throw err;
        }
    };

    // Supprimer un topic
    const deleteTopic = async (topicId) => {
        try {
            await topicService.deleteTopic(topicId);
            setTopics((prevTopics) => prevTopics.filter(topic => topic.id !== topicId));
        } catch (err) {
            console.error("Erreur lors de la suppression du topic :", err);
            throw err;
        }
    };

    return { topics, loading, error, createTopic, deleteTopic };
};

export default useTopics;