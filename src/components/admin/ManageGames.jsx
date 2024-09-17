import "./ManageGames.css";
import games from './../../assets/data/games.json';
import users from './../../assets/data/users.json';
import { useState } from "react";
import { Link } from "react-router-dom";

const ManageGames = () => {

    const [sortGameOption, setSortGameOption] = useState('organizer');

    const [showModal, setShowModal] = useState(false);

    const getUserById = (user_id) => users.find(user => user.id == user_id);
    
    const sortedGames = games.sort((a, b) => {
        if (sortGameOption === 'date') {
            return new Date(a.created_at) - new Date(b.created_at); 
        } else if (sortGameOption === 'rendezVous') {
            return new Date(a.rendez_vous_at) - new Date(b.rendez_vous_at); 
        } else if(sortGameOption === 'organizer')
        {
            return getUserById(a.organizer_id).username.localeCompare(getUserById(b.organizer_id).username); 
        }
        return 0;
    });
      
    const handleSortGameChange = (e) => 
    {
        setSortGameOption(e.target.value);
    };

    const handleModifyGame = (e) =>
    {
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

    const handleCreateGame = (e) =>
    {
    };

    return (
        <div className="manageGames-container">
            <div className="manageGames">
                <h1>Gestion des utilisateurs</h1>
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
                <form className="manageGames-displaySelection">
                    <select className = "orderSelect" id="sortBy" value={sortGameOption} name="sortBy" onChange={handleSortGameChange}>
                        <option value="organizer">Par organisateur</option>
                        <option value="date">Par date de création</option>
                        <option value="rendezVous">Par date de rendez-vous</option>
                    </select>
                </form>
                <div className="manageGames-list">
                    <table className="manageGames-list-table">
                        <thead>
                            <tr>
                                <th>Organisateur</th>
                                <th>Date de création</th>
                                <th>Date de la partie</th>
                                <th>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedGames.map((game) => (
                            <tr key={game.id}>
                                <td> <Link className = "manageUsers-list-table-username" to={`/users/${game.organizer_id}`}>{getUserById(game.organizer_id).username}</Link></td>
                                <td>{`${new Date(game.created_at).toLocaleDateString('fr-FR')}`}</td>
                                <td>{`${new Date(game.rendez_vous_at).toLocaleDateString('fr-FR')}`}</td>
                                <td>    
                                    <div className="manageUsers-list-table-buttonContainer">
                                        <button className="manageGames-table-modifyButton button" onClick={handleModifyGame}>Modifier</button>
                                        <button className="manageGames-table-deleteButton button" onClick={handleDeleteGame}>supprimer</button>
                                    </div>            
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <button className="manageGames-CreateButton button" onClick={handleCreateGame}>Ajouter une partie</button>
            </div>   
        </div>
    )
};

export default ManageGames;