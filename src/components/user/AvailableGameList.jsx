import "./AvailableGameList.css"
import { Link } from "react-router-dom";
import { useState } from "react";
import CreateGameModal from "./CreateGameModal";
import { useUserContext } from "../../contexts/UserContext.jsx";
import { useScheduledGameContext } from "../../contexts/ScheduledGameContext.jsx";

const AvailableGameList = () => {

    const { users, usersLoading, usersError } = useUserContext();
    const { scheduledGames, scheduledGamesLoading, scheduledGamesError, createScheduledGame } = useScheduledGameContext();
    const [sortGameOption, setSortGameOption] = useState('date');
    const [isCreateGameOpen, setIsCreateGameOpen] = useState(false);

    if (usersLoading || scheduledGamesLoading) return <p>Loading...</p>;
    if (usersError) return <p>Error loading users: {usersError}</p>;
    if (scheduledGamesError) return <p>Error loading forum: {forumError}</p>;

    const openCreateGameModal = () => {
      setIsCreateGameOpen(true);
    };
  
    const closeCreateGameModal = () => {
      setIsCreateGameOpen(false);
    };

    const getUserById = (user_id) => users.find(user => user.id == user_id);

    const availableGames = scheduledGames.filter(game => game.status == "disponible");
    
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
      
    const handleSortGameChange = (e) => 
    {
        setSortGameOption(e.target.value);
    };

    const handleJoinGame = (e) =>
    {
        e.preventDefault();
    }

    // Fonction pour gérer la soumission du formulaire
    const handleNewScheduledGame = async(newScheduledGameData) => {
        await createScheduledGame(newScheduledGameData); 
    };

    return (
        <div>
            <section className="bannerGameList banner">
            </section>
            <div className="availableGames main-content">
                <h1 className="main-content-title">Parties en ligne</h1>
                <h2>Liste des parties disponibles</h2>
                <form className="availableGames-displaySelection">
                    <label htmlFor="sortBy"></label>
                    <select className = "orderSelect" id="sortBy" value={sortGameOption} name="sortBy" onChange={handleSortGameChange}>
                        <option value="date">Par date</option>
                        <option value="username">Par pseudo</option>
                        <option value="level">Par niveau</option>
                    </select>
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
                                                <form action="" className="availableGames-subscriptionForm" onSubmit={handleJoinGame}>
                                                    <button className="availableGames-subscriptionForm-button button">S'inscrire</button>
                                                </form>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
                <button className="availableGames-newGameButton button" onClick={openCreateGameModal}>Créer une partie</button>
                <CreateGameModal onSubmit={handleNewScheduledGame} isOpen={isCreateGameOpen} onClose={closeCreateGameModal} />                
            </div>
        </div>
    );
};

export default AvailableGameList;