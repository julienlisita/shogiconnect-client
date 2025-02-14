import "./ProfileManagement.css"
import Select from 'react-select';
import countryList from "react-select-country-list";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext.jsx";
import { useProfileContext } from "../../contexts/ProfileContext.jsx";
import ConfirmationModal from "../common/ModalConfirmation.jsx";
import ModalMessage from "../common/ModalMessage";

const EditProfile = () => {

    const navigate = useNavigate(); 
    const { user } = useAuthContext();
    const { profile, profileLoading, profileError, updateProfile, deleteProfile } = useProfileContext();
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [showMessageModal, setShowMessageModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [email, setEmail] = useState("");

    const options = countryList().getData(); 
    
    if (!user  || profileLoading ) return <p>Loading...</p>;
    if (profileError) return <p>Error loading profile: {profileError}</p>;

    useEffect(() => {
        if (profile) {
            setUsername(profile.username || "");
            setBio(profile.biography || "");
            setSelectedCountry(profile.country ? options.find(option => option.label === profile.country) : null);
            setEmail(profile.email || "");
        }
    }, [profile]);

    const handleDeleteClick = () => {
        setShowConfirmationModal(true); 
    };

    const confirmDeletion = () => {
        deleteProfile();
        navigate("/");
        setShowConfirmationModal(false);
    };

    const cancelDeletion = () => {
        setShowConfirmationModal(false); 
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        const updatedData = {
            username: username,
            email: email,
            country: selectedCountry?.label || "", 
            biography: bio || "",  // Evite les valeurs null/undefined
        };
        try {
            await updateProfile(updatedData);
            openModal("Profil modifié!");
        } catch (error) {
            console.error("Erreur lors de la mise à jour du profil :", error);
        }
    };

    // Fonction pour ouvrir la modal de message
    const openModal = (message) => {
        setModalMessage(message);
        setShowMessageModal(true);
    };

    // Fonction pour fermer la modal le message
    const closeModal = () => {
        setShowMessageModal(false);
    };

    return (
            <div className="editProfil-container">
                <div className="editProfil">
                    <h1>Modification de compte</h1>
                    {/* Modal pour la confirmation de suppression du compte */}
                    <ConfirmationModal
                    isOpen={showConfirmationModal}
                    onClose={cancelDeletion}
                    onConfirm={confirmDeletion}
                    message="Êtes-vous sûr de vouloir supprimer votre compte ?"
                    />
                    <div className="editProfil-content">
                        <form className="editProfil-content-profileForm" onSubmit={handleUpdateProfile} >
                            <h2>Informations</h2>
                            <div>   
                                <label htmlFor="username">Nom d'utilisateur</label><br />
                                <input name = "username" id = "username" type="text" value={username} onChange={(e)=>setUsername(e.target.value)}/>
                            </div>
                            <div>
                                <label htmlFor="bio">Biographie</label> <br />
                                <textarea name="bio" id="bio" rows="10" value={bio} onChange={(e)=>setBio(e.target.value)} ></textarea>
                            </div>
                            <div>
                                <label htmlFor="country">Pays</label><br />
                                <Select 
                                options={options} 
                                value={selectedCountry} 
                                onChange={(selectedOption) => setSelectedCountry(selectedOption)} 
                                placeholder="Sélectionnez un pays"
                                styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        backgroundColor: "#D9D9D9", 
                                        borderRadius: "8px",
                                        borderColor: "#black",
                                        padding: "5px",
                                        boxShadow: "none",
                                    }),
                                    menu: (provided) => ({
                                        ...provided,
                                        backgroundColor: "#D9D9D9", 
                                    }),
                                    option: (provided, { isFocused, isSelected }) => ({
                                        ...provided,
                                        backgroundColor: isSelected ? "#A0785A" : isFocused ? "#D9D9D9" : "white",
                                        color: isSelected ? "white" : "black",
                                    }),
                                }}
                                />
                            </div>
                            <div>
                                <label htmlFor="email">Mail</label><br />
                                <input name = "email" id = "emain" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                            </div>
                            <div className="validationButton-container">
                                <button className="validationButton">Valider</button>
                            </div>
                           
                        </form>
                        <form className="editProfil-content-passwordForm">
                            <h2>Mot de passe</h2>
                            <div>
                                <label htmlFor="oldpassword">Ancien mot de passe</label><br />
                                <input name="oldpassword" id="oldpassword" type="password"/>
                            </div>
                            <div>
                                <label htmlFor="newpassword">Nouveau mot de passe</label><br />
                                <input name="newpassword" id="newpassword" type="password"/>
                            </div>
                            <div>
                                <label htmlFor="passwordconfirmed">Confirmation du mot de passe</label><br />
                                <input name="passwordconfirmed" id="passwordconfirmed" type="password"/>
                            </div>
                            <div className="validationButton-container">
                                <button className="validationButton">Valider</button>
                            </div>
                        </form>
                    </div>
                    <div className = "deteteButton-container">
                        <button  onClick={handleDeleteClick} style={{ backgroundColor: 'red', color: 'white' }}>Supprimer le compte</button>
                    </div>
                    <ModalMessage isOpen={showMessageModal} message={modalMessage} onClose={closeModal} />  
                </div>
            </div>
    );
};

export default EditProfile;