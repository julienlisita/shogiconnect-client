// src/contexts/UserContext.jsx

import { createContext, useContext } from 'react';
import useUsers from '../hooks/useUsers';
import useUserStats from '../hooks/useUserStats';
import useAdminStats from '../hooks/useAdminStats';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const { users, loading: usersLoading, error: usersError, deleteUser, updateUserRole } = useUsers();
    const { userStats, loading: userStatsLoading, error: userStatsError } = useUserStats();
    const { adminStats, loading: adminStatsLoading, error: adminStatsError } = useAdminStats();
   
    const loading = usersLoading || userStatsLoading || adminStatsLoading;
    const error = usersError || userStatsError || adminStatsError;

    return (
        <UserContext.Provider value={{ users, userStats, adminStats, loading, error, deleteUser, updateUserRole }}>
            {children}
        </UserContext.Provider>
    );
};

// Hook pour accéder au contexte utilisateur
export const useUserContext = () => useContext(UserContext);