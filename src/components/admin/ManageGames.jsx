import "./ManageGames.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import { useScheduledGameContext } from "../../contexts/ScheduledGameContext.jsx";

const ManageGames = () => {

    const { users, usersLoading, usersError} = useUserContext();
    const { scheduledGames, scheduledGamesLoading, scheduledGamesError, deleteScheduledGame } = useScheduledGameContext();
    const [sortGameOption, setSortGameOption] = useState('organizer');
    const [showModal, setShowModal] = useState(false);
    const [selectedGameId, setSelectedGameId] = useState(null);

    if (usersLoading || scheduledGamesLoading) return <p>Loading...</p>;
    if (usersError) return <p>Error loading users: {usersError}</p>;
    if (scheduledGamesError) return <p>Error loading forum: {forumError}</p>;

    // Fonctions utilitaires
      
    const handleSortGameChange = (e) => 
    {
        setSortGameOption(e.target.value);
    };

    const handleDeleteGame = (gameId) =>
    {
        setSelectedGameId(gameId)
        setShowModal(true); 
    }
    const confirmDeletion = () => 
    {
        deleteScheduledGame(selectedGameId)
        setShowModal(false);
    };
    
    const cancelDeletion = () => {
        setShowModal(false); 
    };

    const getUserById = (user_id) => users.find(user => user.id == user_id);
    
    const sortedGames = scheduledGames.length > 0 ? scheduledGames.sort((a, b) => {
        if(sortGameOption === 'rendezVous')
        {
            return new Date(a.rendezVousAt) - new Date(b.rendezVousAt); 
        }
        else if (sortGameOption === 'participant') {
            const userA = getUserById(a.ParticipantId);
            const userB = getUserById(b.ParticipantId);
            return (userA?.username || "").localeCompare(userB?.username || ""); 
        } else if(sortGameOption === 'organizer')
        {
            const userA = getUserById(a.OrganizerId);
            const userB = getUserById(b.OrganizerId);
            return (userA?.username || "").localeCompare(userB?.username || ""); 
        }
        return 0;
    }): [];

    return (
        <div className="manageGames-container">
            <div className="manageGames">
                <h1>Gestion des rendez-vous de partie</h1>
                {/* Modal pour la confirmation de suppression d'une partie' */}
                {showModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>Confirmation</h2>
                        <div className="modal-content">
                            <p>Êtes-vous sûr de vouloir supprimer cette partie ?</p>
                            <div className="validationButton-container">
                                <button className="validationButton" style={{ backgroundColor: 'red'}}onClick={confirmDeletion}>Oui</button>
                            </div>
                            <div className="validationButton-container">
                                <button className="validationButton" onClick={cancelDeletion}>Annuler</button>            
                            </div>
                        </div>
                    </div>
                </div>
                )}
                <form className="manageGames-displaySelection">
                    <select className = "orderSelect" id="sortBy" value={sortGameOption} name="sortBy" onChange={handleSortGameChange}>
                        <option value="rendezVous">Par date de rendez-vous</option>
                        <option value="organizer">Par organisateur</option>
                        <option value="participant">Par participant</option>
                    </select>
                </form>
                <div className="manageGames-list">
                    <table className="manageGames-list-table">
                        <thead>
                            <tr>
                                <th>Date de la partie</th>
                                <th>Organisateur</th>
                                <th>Participant</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        {sortedGames.length === 0 ? (
                                <tr><td colSpan="4">Parties non disponibles</td></tr>
                            ) : (
                                sortedGames.map((game) => {
                                    const organizer = getUserById(game.OrganizerId);
                                    const participant = getUserById(game.ParticipantId);
                                    return (
                                        <tr key={game.id}>
                                                                                     <td>{`Le ${new Date(game.rendezVousAt).toLocaleDateString('fr-FR')} ${new Date(game.rendezVousAt).toLocaleTimeString()}`}</td>
                                            <td>
                                                {organizer ? (
                                                    <Link to={`/users/${organizer.id}`}>{organizer.username}</Link>
                                                ) : (
                                                    "Inconnu"
                                                )}
                                            </td>
                                            <td>
                                                {participant ? (
                                                    <Link to={`/users/${participant.id}`}>{participant.username}</Link>
                                                ) : (
                                                    "Aucun"
                                                )}
                                            </td>
                                            <td>
                                                <button>Désinscrire</button>
                                            </td>
                                            <td>
                                                <button onClick={() => handleDeleteGame(game.id)}>Supprimer</button>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>   
        </div>
    )
};

export default ManageGames;