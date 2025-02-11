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

    // Créer une partie en tant qu'organisateur
    const createScheduledGame = async (newScheduledGameData) => {
        try {
            const createdScheduledGame = await scheduledGameService.addScheduledGame(newScheduledGameData);
            setScheduledGames((prevScheduledGames) => [...prevScheduledGames, createdScheduledGame]);
        } catch (err) {
            console.error("Erreur lors de l'ajout du topic :", err);
            throw err;
        }
    };

    // Supprimer une partie en tant qu'organisateur
    const deleteScheduledGame = async (gameId) => {
        try {
            await scheduledGameService.deleteScheduledGame(gameId);
            setScheduledGames((prevScheduledGames) =>
                prevScheduledGames.filter(game => game.id !== gameId)
            );
        } catch (err) {
            console.error("Erreur lors de la suppression de la partie :", err);
            throw err;
        }
    };

    // S'inscrire à une partie en tant que participant
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

    // Se désinscrire d'une partie en tant que participant
    const unsubscribeFromScheduledGame = async (gameId) => {
        try {
            const updatedScheduledGame = await scheduledGameService.unsubscribeFromScheduledGame(gameId);
            setScheduledGames((prevScheduledGames) =>
                prevScheduledGames.map(game =>
                    game.id === gameId ? updatedScheduledGame : game
                )
            );
        } catch (err) {
            console.error("Erreur lors de la désinscription de la partie :", err);
            throw err;
        }
    };


    return { scheduledGames, loading, error, createScheduledGame, deleteScheduledGame, joinScheduledGame, unsubscribeFromScheduledGame };
};

export default useScheduledGames;