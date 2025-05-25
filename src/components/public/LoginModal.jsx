// src/component/public/LoginModal.jsx

import { useState } from "react";
import Modal from "react-modal";
import { useAuthContext } from "../../contexts/AuthContext";
import "../common/Modal.css";
import Button from "../common/Button";
import FormField from "../common/FormField";

Modal.setAppElement("#root"); 

const LoginModal = ({ isOpen, onClose }) => {
  const { login } = useAuthContext();
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

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Connexion"
      className="modal"
      overlayClassName="modal-overlay"
    >
      <h2>Connexion</h2>
      <form className="login-form modal-content" onSubmit={handleSubmit}>
        <FormField
          type="text"
          placeholder="Pseudo"
          value={username}
          required
          onChange={setUsername}
        />
        <FormField
          type="password"
          placeholder="Mot de passe"
          value={password}
          required
          onChange={setPassword}
        />
        <Button type="submit">Se connecter</Button>
        <Button type="button" onClick={onClose}>Annuler</Button>
        {error && <p className="error-message">{error}</p>} 
      </form>
    </Modal>
  );
};

export default LoginModal;