// src/hooks/useScheduledGames.js

import { useState, useEffect } from 'react';
import scheduledGameService from '../services/scheduledGameService';

const useScheduledGames = () => {
    const [scheduledGames, setScheduledGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchScheduledGames = async () => {
            try {
                const scheduledGamesData = await scheduledGameService.getScheduledGames();
                setScheduledGames(scheduledGamesData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchScheduledGames();
    }, []);

    const createScheduledGame = async (newScheduledGameData) => {
        try {
            const createdScheduledGame = await scheduledGameService.addScheduledGame(newScheduledGameData);
            setScheduledGames((prevScheduledGames) => [...prevScheduledGames, createdScheduledGame]);
        } catch (err) {
            console.error("Erreur lors de l'ajout du topic :", err);
            throw err;
        }
    };

    return { scheduledGames, loading, error, createScheduledGame };
};

export default useScheduledGames;