import { useState } from "react";
import "../common/Modal.css"

const RoleModal = ({ user, isOpen, onClose, onConfirm }) => {
    if (!isOpen || !user) return null;

    const [selectedRole, setSelectedRole] = useState(user.RoleId);

    const handleChange = (e) => {
        setSelectedRole(Number(e.target.value));
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Modifier le rôle</h2>
                <p>Utilisateur : {user.username}</p>
                <select value={selectedRole} onChange={handleChange}>
                    <option value={1}>Utilisateur</option>
                    <option value={2}>Admin</option>
                </select>
                <div className="modal-actions">
                    <button onClick={() => onConfirm(user.id, selectedRole)}>Valider</button>
                    <button onClick={onClose}>Annuler</button>
                </div>
            </div>
        </div>
    );
};

export default RoleModal;