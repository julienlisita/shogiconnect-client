import "./EditProfile.css"
import Select from 'react-select';
import { useState } from "react";

const EditProfile = () => {

    const user = {
        id: 1,
        username: "ShadowNinja",
        country: "France",
        isOnline: true,
        biography: "Je suis un maître de la furtivité, et j'ai toujours un coup d'avance sur mes adversaires. Le Shogi est pour moi une manière de développer mon esprit tactique et de rester en éveil. Depuis des années, j'étudie les stratégies et les mouvements des grands maîtres du Shogi. J'aime aussi analyser chaque partie que je joue, en cherchant constamment à m'améliorer. Pour moi, le Shogi n'est pas seulement un jeu, c'est un art qui reflète l'harmonie entre la patience, la précision et la détermination. Mon objectif est de devenir un joueur reconnu sur la scène internationale.",
        user_role_id: 1,
        created_at: "2024-09-01 09:00:00"
      }

      const countries = [
        { value: 'FR', label: 'France' },
        { value: 'US', label: 'United States' },
        { value: 'DE', label: 'Germany' },
        // Ajoute ici tous les pays nécessaires
      ];

      const customStyles = {
        control: (provided) => ({...provided,backgroundColor: '#D9D9D9', }),
      };

      const [showModal, setShowModal] = useState(false);

      const handleDeleteClick = () => {
        setShowModal(true); 
      };
    
      const confirmDeletion = () => {
        console.log('Compte supprimé');
        setShowModal(false);
      };
    
      const cancelDeletion = () => {
        setShowModal(false); 
      };

    return (
            <div className="editProfil-container">
                <div className="editProfil">
                    <h1>Modification de compte</h1>
                    {/* Modal pour la confirmation de suppression du compte */}
                    {showModal && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <h2>Confirmation</h2>
                            <div className="modal-content">
                                <p>Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.</p>
                                <div className="validationButton-container">
                                    <button className="validationButton" style={{ backgroundColor: 'red'}}onClick={confirmDeletion}>Oui, supprimer</button>
                                </div>
                                <div className="validationButton-container">
                                    <button className="validationButton" onClick={cancelDeletion}>Annuler</button>            
                                </div>
                            </div>
                        </div>
                    </div>
                    )}
                    <div className="editProfil-content">
                        <form className="editProfil-content-profileForm">
                            <h2>Informations</h2>
                            <div>   
                                <label htmlFor="username">Nom d'utilisateur</label><br />
                                <input name = "username" id = "username" type="text" />
                            </div>
                            <div>
                                <label htmlFor="bio">Biographie</label> <br />
                                <textarea name="bio" id="bio" rows="10"></textarea>
                            </div>
                            <div>
                                <label htmlFor="country">Pays</label><br />
                                <Select className="selectCountry" name="country" id="country" options={countries} styles ={customStyles} />
                            </div>
                            <div>
                                <label htmlFor="email">Mail</label><br />
                                <input name = "email" id = "emain" type="email" />
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
                   
                </div>
            </div>
    );
};

export default EditProfile;