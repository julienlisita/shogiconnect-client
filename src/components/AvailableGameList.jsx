import "./AvailableGameList.css"

import { useState } from "react";
import { Link } from "react-router-dom";
import users from './users.json';
import games from './games.json';


const AvailableGameList = () => {
    
    const [sortGameOption, setSortGameOption] = useState('date');
    
    const getUserById = (user_id) => users.find(user => user.id == user_id);
    
    const sortedgames = games.sort((a, b) => {
        if (sortGameOption === 'date') {
            return new Date(a.rendez_vous_at) - new Date(b.rendez_vous_at); 
        } else if (sortGameOption === 'username') {
            return getUserById(a.organizer_id).username.localeCompare(getUserById(b.organizer_id).username); 
        } else if (sortGameOption === 'level') {
            return a.level.localeCompare(b.level); 
        } 
        return 0;
    });
      
    const handleSortGameChange = (e) => 
    {
        setSortGameOption(e.target.value);
    };

    const handleJoinGame = (e) =>
    {
        e.preventDefault();
    }
    const handleNewGame = (e) =>
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
                            {sortedgames.map((game) => (
                            <tr key={game.id}>
                                <td> <Link className = "availableGames-table-organizerName" to={`/members/${getUserById(game.organizer_id).id}`}>{getUserById(game.organizer_id).username}</Link></td>
                                <td>{game.level}</td>
                                <td>{`Le ${new Date(game.rendez_vous_at).toLocaleDateString('fr-FR')} ${new Date(game.rendez_vous_at).toLocaleTimeString()}`}
                                </td>
                                <td>                
                                    <form action="" className="availableGames-subscriptionForm" onSubmit={handleJoinGame}>
                                        <button className="availableGames-subscriptionForm-button button">S'inscrire</button>
                                    </form></td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <h2>Créer une nouvelle partie</h2>
                <form className="availableGames-newGameForm" onSubmit={handleNewGame}>
                    <div>
                        <label htmlFor="date">Choisir le jour</label>
                    </div>
                    <div>
                        <input type="date" id = "date" name = "date"/>
                    </div>
                    <div>
                        <label htmlFor="time">Choisir l'heure</label>
                    </div>
                    <div>
                        <input type = "time" id = "time" name = "time"/>
                    </div>
                    <div>
                        <label htmlFor="levelSelect">Choisir un niveau </label>
                    </div>
                    <div>
                        <select id="levelSelect" defaultValue="intermédiaire" name="levelSelect">
                            <option value="beginner">Débutant</option>
                            <option value="medium">Intermédiaire</option>
                            <option value="advanced">Avancé</option>
                        </select>
                    </div> 
                    <button className="availableGames-newGameForm-button">Valider</button>
                </form>
            </div>
        </div>
    );
};

export default AvailableGameList;