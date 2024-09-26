import { useState } from "react";

const LoginModal = ({ isOpen, onClose, onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Pseudo:", username);
    console.log("Password:", password);

    fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Échec de la connexion");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Connexion réussie:", data);
        onLogin();
        onClose();
      })
      .catch((error) => {
        console.error("Erreur lors de la connexion:", error);
        setError("Erreur lors de la connexion, veuillez réessayer.");
      });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h1>Connexion</h1>
        <form className="login-form modal-content" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Pseudo"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="btn-submit">Se connecter</button>
          <button type="button" className="btn-cancel" onClick={onClose}>Annuler</button>
          {error && <p className="error-message">{error}</p>} {/* Affichage de l'erreur */}
        </form>
      </div>
    </div>
  );
};

export default LoginModal;