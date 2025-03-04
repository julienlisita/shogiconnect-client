// src/hooks/useAdminStats.js

import { useState, useEffect } from 'react';
import adminStatsService from '../services/adminStatService';

const useAdminStats = () => {
    const [adminStats, setAdminStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAdminStats = async () => {
            try {
                const adminStatsData = await adminStatsService.getAdminStats();
                setAdminStats(adminStatsData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAdminStats();
    }, []);

    return { adminStats, loading, error };
};

export default useAdminStats;