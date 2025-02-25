// src/hooks/useUsers.js

import { useState, useEffect } from 'react';
import userService from '../services/userService';

const useUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

     // Récupérer la liste des utilisateurs au montage du composant
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersData = await userService.getUsers();
                setUsers(usersData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    // Supprimer un utilisateur
    const deleteUser = async (userId) => {
        try {
            await userService.deleteUser(userId);
            setUsers((prevUsers) => prevUsers.filter(user => user.id !== userId));
        } catch (err) {
            console.error("Erreur lors de la suppression de l'utilisateur :", err);
            throw err;
        }
    };
    
    // Mettre à jour le rôle d'un utilisateur
    const updateUserRole = async (userId, newRole) => {
        try {
            const updatedUser = await userService.updateUserRole(userId, newRole);
            setUsers((prevUsers) => 
                prevUsers.map(user => 
                    user.id === userId ? { ...user, RoleId: newRole } : user
                )
            );
        } catch (err) {
            console.error("Erreur lors de la mise à jour du rôle de l'utilisateur :", err);
            throw err;
        }
    };

    return { users, loading, error, deleteUser, updateUserRole };
};

export default useUsers;