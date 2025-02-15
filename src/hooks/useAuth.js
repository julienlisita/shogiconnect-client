// src/hooks/useAuth.js

import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import authService from "../services/authService";

const useAuth = () => {
  // user est initialisé avec le contenu du token présent dans local storage
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        authService.setAuthToken(token); 
        return {
          id: decodedToken.userId,
          username: decodedToken.username,
          roleId: decodedToken.roleId,
        };
      } catch (error) {
        console.error("Invalid token", error);
        return null;
      }
    }
    return null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(!!user);

  const login = async (username, password) => {
    try {
      const { token } = await authService.login(username, password);
      const decodedToken = jwtDecode(token);
      setUser({ id: decodedToken.userId, username: decodedToken.username, roleId: decodedToken.roleId });
      localStorage.setItem("token", token);
      setIsAuthenticated(true);
      authService.setAuthToken(token); 
    } 
    catch (err) {
        throw new Error(err.message || "Impossible de se connecter, veuillez réessayer plus tard.");
      }
    
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    authService.clearAuthToken(); 
    authService.logout();
  };

  const signup = async (username, email, password) => {
      try {
        const { token } = await authService.signup(username, email, password)
        const decodedToken = jwtDecode(token);
        setUser({
          id: decodedToken.userId,
          username: decodedToken.username,
          email: decodedToken.email,
          roleId: decodedToken.roleId,
        });
        setIsAuthenticated(true);
        localStorage.setItem('token', token);
      } catch (error) {
        if (error.response) {
          const errorMessage = error.response.data.message || 'Erreur d’inscription inconnue';
          throw new Error(errorMessage); 
        } else {
           throw new Error('Une erreur réseau ou inconnue s’est produite.');
        }
      }
    };

    const changePassword = async (oldPassword, newPassword) => {
      try {
        const response = await authService.changePassword(oldPassword, newPassword);
        return response.message; 
      } catch (error) {
        if (error.response) {
          throw new Error(error.response.data.message || "Échec du changement de mot de passe.");
        } else {
          throw new Error("Une erreur réseau ou inconnue s'est produite.");
        }
      }
    };

  return { user, isAuthenticated, login, logout, signup, changePassword };
};

export default useAuth;