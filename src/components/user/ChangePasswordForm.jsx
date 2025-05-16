import { useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext.jsx";
import ModalMessage from "../common/ModalMessage.jsx";

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
            <div>
                <label htmlFor="oldpassword">Ancien mot de passe</label><br />
                <input name="oldpassword" id="oldpassword" type="password" value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="newpassword">Nouveau mot de passe</label><br />
                <input name="newpassword" id="newpassword" type="password" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="passwordconfirmed">Confirmation du mot de passe</label><br />
                <input name="passwordconfirmed" id="passwordconfirmed" type="password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
            </div>
            <div className="validationButton-container">
                <button className="validationButton">Valider</button>
            </div>
            <ModalMessage 
            isOpen={showMessageModal} 
            message={modalMessage} 
            onClose={()=>setShowMessageModal(false)} />  
        </form>
                    
    )
};

export default ChangePasswordForm;