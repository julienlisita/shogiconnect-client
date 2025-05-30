import "./ManageGames.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import { useScheduledGameContext } from "../../contexts/ScheduledGameContext.jsx";
import ConfirmationModal from "../common/ModalConfirmation.jsx";
import PageTitle from "../common/PageTitle.jsx";
import Button from "../common/Button.jsx";
import Select from "../common/Select.jsx";

const ManageGames = () => {

    const { users, usersLoading, usersError} = useUserContext();
    const { scheduledGames, scheduledGamesLoading, scheduledGamesError, deleteScheduledGame, unsubscribeFromScheduledGame } = useScheduledGameContext();
    const [sortGameOption, setSortGameOption] = useState('organizer');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isUnsubscribeModalOpen, setIsUnsubscribeModalOpen] = useState(false);
    const [selectedGameId, setSelectedGameId] = useState(null);

    if (usersLoading || scheduledGamesLoading) return <p>Loading...</p>;
    if (usersError) return <p>Error loading users: {usersError}</p>;
    if (scheduledGamesError) return <p>Error loading forum: {forumError}</p>;

    // Fonctions utilitaires
      
    const handleSortGameChange = (value) => 
    {
        setSortGameOption(value);
    };

    const handleDeleteGame = (gameId) =>
    {
        setSelectedGameId(gameId)
        setIsDeleteModalOpen(true); 
    }
    const confirmDeletion = () => 
    {
        deleteScheduledGame(selectedGameId)
        setIsDeleteModalOpen(false);
    };
    
    const cancelDeletion = () => {
        setIsDeleteModalOpen(false); 
    };

    const handleUnsubscribeGame = (gameId) =>
    {
        setSelectedGameId(gameId)
        setIsUnsubscribeModalOpen(true); 
    };
    
    const confirmUnsubscription = () => 
    {
        unsubscribeFromScheduledGame(selectedGameId)
        setIsUnsubscribeModalOpen(false);
    };
    
    const cancelUnsubscirption = () => {
        setIsUnsubscribeModalOpen(false); 
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
                <PageTitle>Gestion des rendez-vous de partie</PageTitle>
                {/* Modal pour la confirmation de suppression d'une partie' */}
                 <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={cancelDeletion}
                onConfirm={confirmDeletion}
                message="Êtes-vous sûr de vouloir supprimer cet utilisateur ?"
                />
                <ConfirmationModal
                isOpen={isUnsubscribeModalOpen}
                onClose={cancelUnsubscirption}
                onConfirm={confirmUnsubscription}
                message="Êtes-vous sûr de vouloir désinscrire le participant ?"
                />
                <form className="manageGames-displaySelection">
                    <Select
                        name="sortBy"
                        value={sortGameOption}
                        onChange={handleSortGameChange}
                        options={[
                            { value: "", label: "Trier par", disabled: true },
                            { value: "rendezVous", label: "Par date" },
                            { value: "organizer", label: "Par organisateur" },
                            { value: "participant", label: "Par participant" },
                        ]}
                    />
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
                                                <Button onClick={() => handleUnsubscribeGame(game.id)}>Désinscrire</Button>
                                            </td>
                                            <td>
                                                <Button onClick={() => handleDeleteGame(game.id)}>Supprimer</Button>
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