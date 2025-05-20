import { useState } from "react";
import { useProfileContext } from "../../contexts/ProfileContext.jsx";
import Button from "../common/Button.jsx";


const ChangeAvatarForm = () => {
   
    const { updateAvatar } = useProfileContext();
    const [selectedImage, setSelectedImage] = useState(null); 
    const [isUploading, setIsUploading] = useState(false); 
    const [uploadMessage, setUploadMessage] = useState("");

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) setSelectedImage(file);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!selectedImage) {
            setUploadMessage("Veuillez sélectionner une image.");
            return;
        }
        setIsUploading(true); 
        try {
            await updateAvatar(selectedImage); 
            setUploadMessage("Avatar mis à jour avec succès !");
        } catch (error) {
            setUploadMessage("Une erreur s'est produite lors de l'upload.");
        } finally {
            setIsUploading(false);
        }
    };

    return (

    <form className = "editProfil-content-avatarForm" onSubmit={handleUpload}>
        <h2>Avatar</h2>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {uploadMessage && <p className="upload-message">{uploadMessage}</p>}
        <div className="validationButton-container">
            <Button type="submit" disabled={isUploading}>
                {isUploading ? "Téléchargement..." : "Valider"}
            </Button>
        </div>
    </form>
    );
};

export default ChangeAvatarForm;