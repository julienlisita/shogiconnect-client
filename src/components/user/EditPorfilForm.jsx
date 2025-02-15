import { useState, useEffect } from "react";
import Select from 'react-select';
import countryList from "react-select-country-list";
import { useProfileContext } from "../../contexts/ProfileContext.jsx";
import ModalMessage from "../common/ModalMessage";


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
                <input name = "email" id = "email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            </div>
            <div className="validationButton-container">
                <button className="validationButton">Valider</button>
            </div>
            <ModalMessage 
            isOpen={showMessageModal} 
            message={modalMessage} 
            onClose={() => setShowMessageModal(false)} />  
        </form>
    )
};

export default EditProfileForm;