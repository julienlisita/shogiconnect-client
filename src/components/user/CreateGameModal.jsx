import React, { useState } from "react";

const CreateGameModal = ({ isOpen, onClose }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [level, setLevel] = useState("intermédiaire");

  const handleSubmitGame = (e) => {
    e.preventDefault();
    const rendezVousAt = new Date(`${date}T${time}`).toISOString();
    
    fetch("http://localhost:3000/api/games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ level, rendezVousAt }),
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Partie créée avec succès:", data);
        onClose(); 
      })
      .catch((error) => {
        console.error("Erreur lors de la création de la partie:", error);
      });
  };

  const handleClickOverlay = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClickOverlay}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Création de partie</h2>
        <form className="availableGames-newGameForm modal-content" onSubmit={handleSubmitGame}>
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
            <label htmlFor="levelSelect">Choisir un niveau </label>
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
            <button type="button" onClick={onClose} className="availableGames-newGameForm-button">Annuler</button>
        </form>
      </div>
    </div>
  );
};
export default CreateGameModal;