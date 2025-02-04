// src/hooks/useUserStats.js

import { useState, useEffect } from 'react';
import userStatsService from '../services/userStatService';

const useUserStats = () => {
    const [userStats, setUserStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserStats = async () => {
            try {
                const userStatsData = await userStatsService.getUserStats();
                setUserStats(userStatsData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserStats();
    }, []);

    return { userStats, loading, error };
};

export default useUserStats;