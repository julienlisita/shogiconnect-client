// SignupModal.jsx

import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";

const SignupModal = ({ isOpen, onClose }) => {
  const { signup } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signup(username, email, password);
      onClose();
    } catch (err) {
      setError(err.message || "Impossible de se connecter, veuillez réessayer plus tard.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h1>Inscription</h1>
        <form className="modal-content" onSubmit={handleSubmit}>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Pseudo"
              required
            />
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe"
              required
            />
          <button type="submit">S'inscrire</button>
          <button type="button" onClick={onClose}>Annuler</button>
          {error && <p className="error-message">{error}</p>} 
        </form>
      </div>
    </div>
  );
};

export default SignupModal;