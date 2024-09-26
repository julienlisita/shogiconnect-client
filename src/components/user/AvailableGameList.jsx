import "./AvailableGameList.css"
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import CreateGameModal from "./CreateGameModal";

const AvailableGameList = () => {

    const [games, setGames] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [sortGameOption, setSortGameOption] = useState('date');
    
    const [isCreateGameOpen, setIsCreateGameOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [gamesResponse, usersResponse] = await Promise.all([
                    fetch('http://localhost:3000/api/games'),
                    fetch('http://localhost:3000/api/users')
                ]);
    
                const gamesData = await gamesResponse.json();
                const usersData = await usersResponse.json();
    
                setGames(gamesData.data);
                setUsers(usersData.data);
            } catch (error) {
                setError(error.message);
            } finally {
                 setLoading(false);
            }
        };
    
        fetchData();
    }, []);
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const openCreateGameModal = () => {
      setIsCreateGameOpen(true);
    };
  
    const closeCreateGameModal = () => {
      setIsCreateGameOpen(false);
    };

    const getUserById = (user_id) => users.find(user => user.id == user_id);

    const availableGames = games.filter(game => game.status == "disponible");
    
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
                <CreateGameModal isOpen={isCreateGameOpen} onClose={closeCreateGameModal} />                
            </div>
        </div>
    );
};

export default AvailableGameList;