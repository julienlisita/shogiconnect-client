// src/component/public/SignupModal.jsx

import React, { useState } from "react";
import Modal from "react-modal";
import { useAuthContext } from "../../contexts/AuthContext";
import "../common/Modal.css";

Modal.setAppElement("#root"); 

const SignupModal = ({ isOpen, onClose }) => {
  const { signup } = useAuthContext();
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
      setError(err.message || "Impossible de s'inscrire, veuillez réessayer plus tard.");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Inscription"
      className="modal"
      overlayClassName="modal-overlay"
    >
      <h2>Inscription</h2>
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
    </Modal>
  );
};

export default SignupModal;