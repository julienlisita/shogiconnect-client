import "./ScheduledGameList.css"
import games from './../../assets/data/games.json';
import users from './../../assets/data/users.json';
import { useState } from "react";
import { Link } from "react-router-dom";


const ScheduledGameList = () => {

    const user = {
        id: 1,
        username: "ShadowNinja",
        country: "France",
        isOnline: true,
        biography: "Je suis un maître de la furtivité, et j'ai toujours un coup d'avance sur mes adversaires. Le Shogi est pour moi une manière de développer mon esprit tactique et de rester en éveil. Depuis des années, j'étudie les stratégies et les mouvements des grands maîtres du Shogi. J'aime aussi analyser chaque partie que je joue, en cherchant constamment à m'améliorer. Pour moi, le Shogi n'est pas seulement un jeu, c'est un art qui reflète l'harmonie entre la patience, la précision et la détermination. Mon objectif est de devenir un joueur reconnu sur la scène internationale.",
        user_role_id: 1,
        created_at: "2024-09-01 09:00:00"
      }

    const [showModal, setShowModal] = useState(false);

    const createdGames = games.filter(game => game.organizer_id == user.id).sort((a,b) => new Date (b.rendez_vous_at) - new Date(a.rendez_vous_at));

    const joinedGames = games.filter(game => game.participant_id == user.id).sort((a,b) => new Date (b.rendez_vous_at) - new Date(a.rendez_vous_at));

    const getUserById = (user_id) => users.find(user => user.id == user_id);
    

    const handleCancelInscription = (e) =>
    {
        setShowModal(true); 
    }
    const handleDeleteGame = (e) =>
    {
        setShowModal(true); 
    }
    const confirmDeletion = () => {
        console.log('partie supprimé');
        setShowModal(false);
    };
    
    const cancelDeletion = () => {
        setShowModal(false); 
    };


    return (
<div className="scheduledGames-container">
            <div className="scheduledGames">
                <h1>Parties programmées</h1>
                {/* Modal pour la confirmation de suppression d'une partie' */}
                {showModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>Confirmation</h2>
                        <div className="modal-content">
                            <p>Êtes-vous sûr de vouloir supprimer cette partie ? Cette action est irréversible.</p>
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
                <h2>Parties crées par vous</h2>
                <div className="scheduledGames-list">
                    <table className="scheduledGames-list-table">
                        <thead>
                            <tr>
                                <th>Participant</th>
                                <th>Niveau</th>
                                <th>Statut</th>
                                <th>Date de la partie</th>
                                <th>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {createdGames.map((game) => (
                            <tr key={game.id}>
                                <td> <Link className = "scheduledGames-list-table-username" to={`/users/${game.participant_id}`}>{getUserById(game.participant_id).username}</Link></td>
                                <td>{game.level}</td>
                                <td>{game.status}</td>
                                <td>{`${new Date(game.rendez_vous_at).toLocaleDateString('fr-FR')}`}</td>
                                <td>    
                                    <div className="scheduledGames-list-table-buttonContainer">
                                        <button className="scheduledGames-table-deleteButton button" onClick={handleCancelInscription}>Annuler</button>
                                    </div>            
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <h2>Parties souscrites</h2>
                <div className="scheduledGames-list">
                    <table className="scheduledGames-list-table">
                        <thead>
                            <tr>
                                <th>Organisateur</th>
                                <th>Niveau</th>
                                <th>Statut</th>
                                <th>Date de la partie</th>
                                <th>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {createdGames.map((game) => (
                            <tr key={game.id}>
                                <td> <Link className = "scheduledGames-list-table-username" to={`/users/${game.organizer_id}`}>{getUserById(game.organizer_id).username}</Link></td>
                                <td>{game.level}</td>
                                <td>{game.status}</td>
                                <td>{`${new Date(game.rendez_vous_at).toLocaleDateString('fr-FR')}`}</td>
                                <td>    
                                    <div className="scheduledGames-list-table-buttonContainer">
                                        <button className="scheduledGames-table-deleteButton button" onClick={handleDeleteGame}>Annuler</button>
                                    </div>            
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>   
        </div>
    );
};

export default ScheduledGameList;