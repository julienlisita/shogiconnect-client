import "./AvailableGameList.css"
import { Link } from "react-router-dom";
import { useState } from "react";
import CreateGameModal from "./CreateGameModal";
import ModalMessage from "../common/ModalMessage.jsx";
import { useUserContext } from "../../contexts/UserContext.jsx";
import { useAuthContext } from "../../contexts/AuthContext.jsx";
import { useScheduledGameContext } from "../../contexts/ScheduledGameContext.jsx";
import PageTitle from "../common/PageTitle.jsx";
import Button from "../common/Button.jsx";
import Select from "../common/Select.jsx";

const AvailableGameList = () => {

    const { users, usersLoading, usersError } = useUserContext();
    const {user} = useAuthContext();
    const { scheduledGames, scheduledGamesLoading, scheduledGamesError, createScheduledGame, joinScheduledGame } = useScheduledGameContext();
    const [sortGameOption, setSortGameOption] = useState('');
    const [isCreateGameOpen, setIsCreateGameOpen] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    if (!user || usersLoading || scheduledGamesLoading) return <p>Loading...</p>;
    if (usersError) return <p>Error loading users: {usersError}</p>;
    if (scheduledGamesError) return <p>Error loading forum: {forumError}</p>;

    // Fonction pour ouvrir la modal de création de partie
    const openCreateGameModal = () => {
      setIsCreateGameOpen(true);
    };
  
    // Fonction pour fermer la modal de création de partie
    const closeCreateGameModal = () => {
      setIsCreateGameOpen(false);
    };

    // Fonction pour ouvrir la modal de message
    const openModal = (message) => {
        setModalMessage(message);
        setModalIsOpen(true);
    };

    // Fonction pour fermer la modal le message
    const closeModal = () => {
        setModalIsOpen(false);
    };

    const getUserById = (user_id) => (users || []).find(user => user.id == user_id);

    const availableGames = (scheduledGames || []).filter(game => game.status === "disponible");
    
    const sortedGames = availableGames.length > 0 ? availableGames.sort((a, b) => {
        if (sortGameOption === 'date') {
            return new Date(a.rendezVousAt) - new Date(b.rendezVousAt);
        } else if (sortGameOption === 'username') {
            const userA = getUserById(a.OrganizerId);
            const userB = getUserById(b.OrganizerId);
            return (userA?.username || "").localeCompare(userB?.username || "");
        } else if (sortGameOption === 'level') {
            return a.level.localeCompare(b.level);
        }
        return 0;
    }) : [];
      
const handleSortGameChange = (value) => {
    setSortGameOption(value);
};

    // Fonction pour gérer la soumission du formulaire
    const handleNewScheduledGame = async(newScheduledGameData) => {
        await createScheduledGame(newScheduledGameData); 
        openModal("Partie créée !");
    };

    // Fonction pour gérer l'inscription à une partie
    const handleJoinGame = async (gameId, OrganizerId) => {
        if(user.id == OrganizerId)
        {
            openModal("Vous ne pouvez pas vous inscrire à votre propre partie.");
        }
        else
        {
            await joinScheduledGame(gameId);
            openModal("Inscription réussie !");
        }
    };

    return (
        <div>
            <section className="bannerGameList banner">
            </section>
            <div className="availableGames main-content">
                <PageTitle>Parties en ligne</PageTitle>
                <h2>Liste des parties disponibles</h2>
                <form className="availableGames-displaySelection">
                <Select
                    name="sortBy"
                    value={sortGameOption}
                    onChange={handleSortGameChange}
                    options={[
                        { value: "", label: "Trier par", disabled: true },
                        { value: "date", label: "Par date" },
                        { value: "username", label: "Par pseudo" },
                        { value: "level", label: "Par niveau" },
                    ]}
                />
                </form>
                <div className="availableGames-list">
                    <table className="availableGames-list-table">
                        <thead>
                            <tr>
                            <th>Organisateur</th>
                            <th>Niveau</th>
                            <th>Date/heure</th>
                            <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        {sortedGames.length === 0 ? (
                                <tr><td colSpan="4">Parties non disponibles</td></tr>
                            ) : (
                                sortedGames.map((game) => {
                                    const user = getUserById(game.OrganizerId);
                                    return (
                                        <tr key={game.id}>
                                            <td>
                                                {user ? (
                                                    <Link className="availableGames-table-organizerName" to={`/users/${user.id}`}>{user.username}</Link>
                                                ) : (
                                                    "Inconnu"
                                                )}
                                            </td>
                                            <td>{game.level}</td>
                                            <td>{`Le ${new Date(game.rendezVousAt).toLocaleDateString('fr-FR')} ${new Date(game.rendezVousAt).toLocaleTimeString()}`}</td>
                                            <td>
                                                <Button onClick={() => handleJoinGame(game.id, game.OrganizerId)}>Rejoindre</Button>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
                <Button onClick={openCreateGameModal}>Créer une partie</Button>
                <CreateGameModal onSubmit={handleNewScheduledGame} isOpen={isCreateGameOpen} onClose={closeCreateGameModal} />    
                <ModalMessage isOpen={modalIsOpen} message={modalMessage} onClose={closeModal} />            
            </div>
        </div>
    );
};

export default AvailableGameList;