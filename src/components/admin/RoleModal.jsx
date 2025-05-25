import { useState } from "react";
import "../common/Modal.css"
import Select from "../common/Select";

const RoleModal = ({ user, isOpen, onClose, onConfirm }) => {
    if (!isOpen || !user) return null;

    const [selectedRole, setSelectedRole] = useState(user.RoleId);

    const handleChange = (value) => {
        setSelectedRole(Number(value));
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Modifier le rôle</h2>
                <p>Utilisateur : {user.username}</p>
                <Select
                        name="sortBy"
                        value={selectedRole}
                        onChange={handleChange}
                        options={[
                            { value: 1, label: "Utilisateur" },
                            { value: 2, label: "Admin" },
                        ]}
                    />
                <div className="modal-actions">
                    <button onClick={() => onConfirm(user.id, selectedRole)}>Valider</button>
                    <button onClick={onClose}>Annuler</button>
                </div>
            </div>
        </div>
    );
};

export default RoleModal;