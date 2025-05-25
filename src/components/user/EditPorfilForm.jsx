import { useState, useEffect } from "react";
import Select from 'react-select';
import countryList from "react-select-country-list";
import { useProfileContext } from "../../contexts/ProfileContext.jsx";
import ModalMessage from "../common/ModalMessage.jsx";
import Button from "../common/Button.jsx";
import "./ProfileManagement.css"
import FormField from "../common/FormField.jsx";
import SelectField from "../common/SearchableSelect.jsx";


const EditProfileForm = () => {

    const { profile, updateProfile} = useProfileContext();
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [email, setEmail] = useState("");
    const [showMessageModal, setShowMessageModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const options = countryList().getData(); 

    useEffect(() => {
        if (profile) {
            setUsername(profile.username || "");
            setBio(profile.biography || "");
            setSelectedCountry(profile.country ? options.find(option => option.label === profile.country) : null);
            setEmail(profile.email || "");
        }
    }, [profile]);

    // fonction de gestion de modification de profil
    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        const updatedData = {
            username: username,
            email: email,
            country: selectedCountry?.label || "", 
            biography: bio || "", 
        };
        try {
            await updateProfile(updatedData);
            setModalMessage("Profil modifié!");
            setShowMessageModal(true);
        } catch (error) {
            console.error("Erreur lors de la mise à jour du profil :", error);
        }
    };
   
    return (
        <form className="editProfil-content-profileForm" onSubmit={handleUpdateProfile} >
            <h2>Informations</h2>
            <FormField
                type="text"
                label="Nom d'utilisateur"
                value={username}
                onChange={setUsername}
            />
            <FormField
                type="textarea"
                label="biographie"
                rows={10}
                value={bio}
                onChange={setBio}
            />
            <div>
                <SelectField
                    label="Pays"
                    name="country"
                    value={selectedCountry}
                    onChange={setSelectedCountry}
                    options={options}
                    placeholder="Sélectionnez un pays"
                />
            </div>
            <FormField
                type="email"
                label="Adresse mail"
                value={email}
                onChange={setEmail}   
            />
            <div className="validationButton-container">
                <Button type="submit">Valider</Button>
            </div>
            <ModalMessage 
                isOpen={showMessageModal} 
                message={modalMessage} 
                onClose={() => setShowMessageModal(false)} 
            />  
        </form>
    )
};

export default EditProfileForm;