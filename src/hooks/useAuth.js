// useAuth.js

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
        return {
          id: decodedToken.userId,
          username: decodedToken.username,
        };
      } catch (error) {
        console.error("Invalid token", error);
        return null;
      }
    }
    return null;
  });

  const isAuthenticated = !!user;

  const login = async (username, password) => {
    try {
      const { token } = await authService.login(username, password);
      const decodedToken = jwtDecode(token);
      setUser({ id: decodedToken.userId, username: decodedToken.username });
      localStorage.setItem("token", token);
    } 
    catch (err) {
        throw new Error(err.message || "Impossible de se connecter, veuillez réessayer plus tard.");
      }
    
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
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
          roleId: decodedToken.role_id,
        });
  
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

  return { user, isAuthenticated, login, logout, signup };
};

export default useAuth;