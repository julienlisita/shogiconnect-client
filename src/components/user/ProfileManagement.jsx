import "./ProfileManagement.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext.jsx";
import { useProfileContext } from "../../contexts/ProfileContext.jsx";
import ConfirmationModal from "../common/ModalConfirmation.jsx";
import EditProfileForm from "./EditPorfilForm.jsx";
import ChangePasswordForm from "./ChangePasswordForm.jsx";
import ChangeAvatarForm from "./ChangeAvatarForm.jsx";
import PageTitle from "../common/PageTitle.jsx";
import Button from "../common/Button.jsx";

const ProfilManagement = () => {

    const navigate = useNavigate(); 
    const { user } = useAuthContext();
    const { profileLoading, profileError, deleteProfile } = useProfileContext();
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    
    if (!user  || profileLoading ) return <p>Loading...</p>;
    if (profileError) return <p>Error loading profile: {profileError}</p>;


 // fonction pour ouvir la modal de confirmation
 const handleDeleteClick = () => {
    setShowConfirmationModal(true); 
};

// fonction de suppression du compte
const confirmDeletion = () => {
    deleteProfile();
    navigate("/");
    setShowConfirmationModal(false);
};

// fonction de fermeture de la modal de confirmation
const cancelDeletion = () => {
    setShowConfirmationModal(false); 
};

    return (
            <div className="editProfil-container">
                <div className="editProfil">
                    <PageTitle>Modification de compte</PageTitle>
                    <div className="editProfil-content">
                        <EditProfileForm/>
                        <div className="editProfil-content-rightBlock">
                            <ChangeAvatarForm/>
                            <ChangePasswordForm/>
                        </div>
                    </div>
                    <div className = "deteteButton-container">
                        <Button onClick={handleDeleteClick} style={{ backgroundColor: 'red', color: 'white' }}>Supprimer compte</Button>
                    </div>
                    <ConfirmationModal
                    isOpen={showConfirmationModal}
                    onClose={cancelDeletion}
                    onConfirm={confirmDeletion}
                    message="Êtes-vous sûr de vouloir supprimer votre compte ?"
                    />
                </div>
            </div>
    );
};

export default ProfilManagement;