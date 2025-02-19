import React, { createContext, useContext } from "react";
import useScheduledGames from "../hooks/useScheduledGames";


const ScheduledGameContext = createContext();

export const ScheduledGameProvider = ({ children }) => {
    const {scheduledGames, loading, error, createScheduledGame, deleteScheduledGame, joinScheduledGame, unsubscribeFromScheduledGame} = useScheduledGames();


    return (
        <ScheduledGameContext.Provider value={{scheduledGames, loading, error, createScheduledGame, deleteScheduledGame, joinScheduledGame, unsubscribeFromScheduledGame}}>
            {children}
        </ScheduledGameContext.Provider>
    );
};

export const useScheduledGameContext = () => useContext(ScheduledGameContext);