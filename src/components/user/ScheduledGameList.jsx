import "./ScheduledGameList.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext.jsx";
import { useAuthContext } from "../../contexts/AuthContext.jsx";
import { useScheduledGameContext } from "../../contexts/ScheduledGameContext.jsx";
import ConfirmationModal from "../common/ModalConfirmation.jsx";
import PageTitle from "../common/PageTitle.jsx";
import Button from "../common/Button.jsx";

const ScheduledGameList = () => {
    const { scheduledGames, scheduledGamesLoading, scheduledGamesError,deleteScheduledGame, unsubscribeFromScheduledGame } = useScheduledGameContext();
    const { users, usersError } = useUserContext();
    const { user } = useAuthContext();
    const [confirmatioDeletionModalIsOpen, setConfirmationDeletionModalIsOpen] = useState(false);
    const [confirmationUnsubsritptionModalIsOpen, setConfirmatioUnsubscriptionModalIsOpen] = useState(false);
    const [selectedGameId, setSelectedGameId] = useState(null);

    if (!user) return <p>Vous devez être connecté pour voir cette page.</p>;
    if (scheduledGamesLoading) return <p>Chargement des parties...</p>;
    if (usersError) return <p>Erreur lors du chargement des utilisateurs : {usersError}</p>;
    if (scheduledGamesError) return <p>Erreur lors du chargement des parties : {scheduledGamesError}</p>;

    const handleUnsubscribe = (gameId) => {
        setSelectedGameId(gameId);
        setConfirmatioUnsubscriptionModalIsOpen(true);
    };

    const handleDeleteGame = (gameId) => {
        setSelectedGameId(gameId);
        setConfirmationDeletionModalIsOpen(true);
    };

    const confirmDeletion = () => {
        setConfirmationDeletionModalIsOpen(false);
        deleteScheduledGame(selectedGameId);
    };

    const confirmUnsubscription = () => {
        setConfirmatioUnsubscriptionModalIsOpen(false);
        unsubscribeFromScheduledGame(selectedGameId);
    };

    const closeDeletionModal = () => {
        setConfirmationDeletionModalIsOpen(false)
    };

    const closeUnsubscriptionModal = () => {
        setConfirmatioUnsubscriptionModalIsOpen(false)
    };

    const getUserById = (user_id) => users?.find((user) => user.id === user_id) || { username: "Inconnu" };

    const createdScheduledGames = scheduledGames
        .filter((game) => game?.OrganizerId === user.id)
        .sort((a, b) => new Date(b.rendezVousAt) - new Date(a.rendezVousAt));

    const joinedScheduledGames = scheduledGames
        .filter((game) => game?.ParticipantId === user.id)
        .sort((a, b) => new Date(b.rendezVousAt) - new Date(a.rendezVousAt));

    return (
        <div className="scheduledGames-container">
            <div className="scheduledGames">
                <PageTitle>Parties programmées</PageTitle>

                <ConfirmationModal
                    isOpen={confirmatioDeletionModalIsOpen}
                    onClose={closeDeletionModal}
                    onConfirm={confirmDeletion}
                    message="Êtes-vous sûr de vouloir supprimer cette partie ?"
                />
                <ConfirmationModal
                    isOpen={confirmationUnsubsritptionModalIsOpen}
                    onClose={closeUnsubscriptionModal}
                    onConfirm={confirmUnsubscription}
                    message="Êtes-vous sûr de vouloir vous désinscrire de cette partie ? "
                />

                <h2>Parties créées par vous</h2>
                <div className="scheduledGames-list">
                    <table className="scheduledGames-list-table">
                        <thead>
                            <tr>
                                <th>Participant</th>
                                <th>Niveau</th>
                                <th>Statut</th>
                                <th>Date de la partie</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {createdScheduledGames.length > 0 ? (
                                createdScheduledGames.map((game) => (
                                    <tr key={game.id}>
                                        <td>
                                            <Link className="scheduledGames-list-table-username" to={`/users/${game.ParticipantId}`}>
                                                {getUserById(game.ParticipantId)?.username}
                                            </Link>
                                        </td>
                                        <td>{game.level}</td>
                                        <td>{game.status}</td>
                                        <td>{new Date(game.rendezVousAt).toLocaleDateString("fr-FR")}</td>
                                        <td>
                                            <div className="scheduledGames-list-table-buttonContainer">
                                                <Button onClick={()=>handleDeleteGame(game.id)}>
                                                    Annuler
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5">Aucune partie créée.</td>
                                </tr>
                            )}
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
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {joinedScheduledGames.length > 0 ? (
                                joinedScheduledGames.map((game) => (
                                    <tr key={game.id}>
                                        <td>
                                            <Link className="scheduledGames-list-table-username" to={`/users/${game.OrganizerId}`}>
                                                {getUserById(game.OrganizerId)?.username}
                                            </Link>
                                        </td>
                                        <td>{game.level}</td>
                                        <td>{game.status}</td>
                                        <td>{new Date(game.rendezVousAt).toLocaleDateString("fr-FR")}</td>
                                        <td>
                                            <div className="scheduledGames-list-table-buttonContainer">
                                                <Button onClick={()=>handleUnsubscribe(game.id)}>
                                                    Annuler
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5">Aucune partie souscrite.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ScheduledGameList;