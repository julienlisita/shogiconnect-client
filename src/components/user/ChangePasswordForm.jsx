import { useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext.jsx";
import ModalMessage from "../common/ModalMessage.jsx";
import Button from "../common/Button.jsx";
import FormField from "../common/FormField.jsx";

const ChangePasswordForm = () => {

    const {changePassword } = useAuthContext();
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showMessageModal, setShowMessageModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

     // fonction de gestion du changement de mot de passe 
     const handleChangePassword = async (e) => {
        e.preventDefault();
        
        if (newPassword !== confirmPassword) {
            setModalMessage("Les nouveaux mots de passe ne correspondent pas.");
            setShowMessageModal(true);
            return;
        }
    
        try {
            const message = await changePassword(oldPassword, newPassword);
            setModalMessage(message);
            setShowMessageModal(true);
            setModalMessage(message);
            setShowMessageModal(true);
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (error) {
            setModalMessage(error.message);
            setShowMessageModal(true);
        }
    };
  
    return (

        <form className="editProfil-content-passwordForm" onSubmit={handleChangePassword}>
            <h2>Mot de passe</h2>
            <FormField
                type="password"
                label="Ancien mot de passe"
                value={oldPassword}
                onChange={setOldPassword}
            />
            <FormField
                type="password"
                label="Nouveau mot de passe"
                value={newPassword}
                onChange={setNewPassword}
            />
             <FormField
                type="password"
                label="Confirmation du mot de passe"
                value={confirmPassword}
                onChange={setConfirmPassword}
            />
            <div className="validationButton-container">
                <Button type="submit">Valider</Button>
            </div>
            <ModalMessage 
            isOpen={showMessageModal} 
            message={modalMessage} 
            onClose={()=>setShowMessageModal(false)} />  
        </form>
                    
    )
};

export default ChangePasswordForm;