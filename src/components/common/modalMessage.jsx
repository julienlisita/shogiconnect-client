import React from "react";
import Modal from "react-modal";

const modalStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    },
};

Modal.setAppElement("#root"); // Pour éviter les erreurs d'accessibilité

const ModalMessage = ({ isOpen, message, onClose }) => {
    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} style={modalStyles}>
            <h3>Information</h3>
            <p>{message}</p>
            <button onClick={onClose}>Fermer</button>
        </Modal>
    );
};

export default ModalMessage;