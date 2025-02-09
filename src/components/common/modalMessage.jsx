import React from "react";
import Modal from "react-modal";
import "../common/Modal.css"

Modal.setAppElement("#root"); // Pour éviter les erreurs d'accessibilité

const ModalMessage = ({ isOpen, message, onClose }) => {
    return (
        <Modal 
        isOpen={isOpen} 
        onRequestClose={onClose} 
        overlayClassName="modal-overlay" // Applique les styles d'overlay existants
        className="modal" // Applique les styles de la modale existante
        >
            <div className="modal-content">
                <p>{message}</p>
                <button onClick={onClose}>Fermer</button>
            </div>
        </Modal>
    );
};

export default ModalMessage;