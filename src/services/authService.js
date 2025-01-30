// authService.js

const API_URL = "http://localhost:3000/api/auth";

const login = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
      credentials: "include",
    });
    
    const responseData = await response.json();
  
    if (!response.ok) {
      throw new Error(responseData.message || "Identifiant ou mot de passe incorrect");
    }
    return responseData;
  } catch(error) {
    throw new Error("Impossible de contacter le serveur. Vérifiez votre connexion.");
  }
};

const logout = async () => {
  await fetch(`${API_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });
};

const signup = async (username, email, password) => {
  try {
    const response = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
      credentials: "include",
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || "Erreur lors de l'inscription");
    }
    return responseData;

  } catch (error) {
    throw new Error("Impossible de contacter le serveur. Vérifiez votre connexion.");
  }
};


export default { login, logout, signup };