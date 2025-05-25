// src/component/public/SignupModal.jsx

import React, { useState } from "react";
import Modal from "react-modal";
import { useAuthContext } from "../../contexts/AuthContext";
import "../common/Modal.css";
import Button from "../common/Button.jsx";
import FormField from "../common/FormField";

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
        <FormField
          type="text"
          value={username}
          onChange={setUsername}
          placeholder="Pseudo"
          required
        />
        <FormField
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="Email"
          required
        />
        <FormField
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="Mot de passe"
          required
        />
        <Button type="submit">S'inscrire</Button>
        <Button type="button" onClick={onClose}>Annuler</Button>
        {error && <p className="error-message">{error}</p>} 
      </form>
    </Modal>
  );
};

export default SignupModal;