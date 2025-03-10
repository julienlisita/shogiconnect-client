// src/component/userCreateGameModal.jsx

import React, { useState } from "react";
import Modal from "react-modal";
import "../common/Modal.css"
import "./AvailableGameList.css"

// Nécessaire pour l'accessibilité (évite les warnings)
Modal.setAppElement("#root");

const CreateGameModal = ({ onSubmit, isOpen, onClose }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [level, setLevel] = useState("intermédiaire");

  const handleSubmit = (e) => {
    e.preventDefault();
    const rendezVousAt = new Date(`${date}T${time}`).toISOString();
    const newScheduledGameData = {
      rendezVousAt: rendezVousAt,
      level: level,
    };
    onSubmit(newScheduledGameData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Créer une partie"
      overlayClassName="modal-overlay" // Applique les styles d'overlay existants
      className="modal" // Applique les styles de la modale existante
    >
      <h2>Création de partie</h2>
      <form className="availableGames-newGameForm modal-content" onSubmit={handleSubmit}>
        <label htmlFor="date">Choisir le jour</label>
        <input
          type="date"
          id="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <label htmlFor="time">Choisir l'heure</label>
        <input
          type="time"
          id="time"
          name="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
        <label htmlFor="levelSelect">Choisir un niveau</label>
        <select
          id="levelSelect"
          name="levelSelect"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        >
          <option value="débutant">Débutant</option>
          <option value="intermédiaire">Intermédiaire</option>
          <option value="avancé">Avancé</option>
        </select>
        <button type="submit" className="availableGames-newGameForm-button">Valider</button>
        <button type="button" onClick={onClose} className="availableGames-newGameForm-button">
          Annuler
        </button>
      </form>
    </Modal>
  );
};

export default CreateGameModal;