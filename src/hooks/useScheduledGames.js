// src/hooks/useScheduledGames.js

import { useState, useEffect } from 'react';
import scheduledGameService from '../services/scheduledGameService';
import { useAuthContext } from "../contexts/AuthContext";

const useScheduledGames = () => {
    const { isAuthenticated } = useAuthContext();
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
        if(isAuthenticated)
        {
            fetchScheduledGames();
        }
    }, [isAuthenticated]);

    const createScheduledGame = async (newScheduledGameData) => {
        try {
            const createdScheduledGame = await scheduledGameService.addScheduledGame(newScheduledGameData);
            setScheduledGames((prevScheduledGames) => [...prevScheduledGames, createdScheduledGame]);
        } catch (err) {
            console.error("Erreur lors de l'ajout du topic :", err);
            throw err;
        }
    };

    const joinScheduledGame = async (scheduledGameId) => {
        try {
            const updatedScheduledGame = await scheduledGameService.joinScheduledGame(scheduledGameId);
            setScheduledGames((prevScheduledGames) => 
                prevScheduledGames.map(game => 
                    game.id === scheduledGameId ? updatedScheduledGame : game
                )
            );
        } catch (err) {
            console.error("Erreur lors de l'inscription au jeu :", err);
            throw err;
        }
    };


    return { scheduledGames, loading, error, createScheduledGame, joinScheduledGame };
};

export default useScheduledGames;