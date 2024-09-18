import { useState } from "react";

const LoginModal = ({ isOpen, onClose }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("https://your-api-endpoint/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Inscription réussie:", data);
        onClose(); 
      })
      .catch((error) => {
        console.error("Erreur lors de l'inscription:", error);
      });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h1>Connexion</h1>
        <form className="login-form modal-content" onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Mot de passe" required />
          <button type="submit" className="btn-submit">Se connecter</button>
          <button type="button" className="btn-cancel" onClick={onClose}>Annuler</button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;