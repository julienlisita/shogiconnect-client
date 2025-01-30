// LoginModal.jsx

import { useState } from "react";
import useAuth from "../../hooks/useAuth";

const LoginModal = ({ isOpen, onClose}) => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(username, password);
      onClose();
    } catch (err) {
      setError(err.message || "Impossible de se connecter, veuillez réessayer plus tard.");
    }
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
          {error && <p className="error-message">{error}</p>} 
        </form>
      </div>
    </div>
  );
};

export default LoginModal;