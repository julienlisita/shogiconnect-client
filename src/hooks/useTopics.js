// src/hooks/useTopics.js

import { useState, useEffect } from 'react';
import topicService from '../services/topicService';

const useTopics = () => {
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    return { topics, loading, error };
};

export default useTopics;