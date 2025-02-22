// src/contexts/UserContext.jsx

import { createContext, useContext } from 'react';
import useUsers from '../hooks/useUsers';
import useUserStats from '../hooks/useUserStats';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const { users, loading: usersLoading, error: usersError, deleteUser, updateUserRole } = useUsers();
    const { userStats, loading: userStatsLoading, error: userStatsError } = useUserStats();
   
    const loading = usersLoading || userStatsLoading;
    const error = usersError || userStatsError;

    return (
        <UserContext.Provider value={{ users, userStats, loading, error, deleteUser, updateUserRole }}>
            {children}
        </UserContext.Provider>
    );
};

// Hook pour accéder au contexte utilisateur
export const useUserContext = () => useContext(UserContext);