import React, { createContext, useContext } from "react";
import useScheduledGames from "../hooks/useScheduledGames";


const ScheduledGameContext = createContext();

export const ScheduledGameProvider = ({ children }) => {
    const scheduledGames = useScheduledGames();


    return (
        <ScheduledGameContext.Provider value={scheduledGames}>
            {children}
        </ScheduledGameContext.Provider>
    );
};

export const useScheduledGameContext = () => useContext(ScheduledGameContext);