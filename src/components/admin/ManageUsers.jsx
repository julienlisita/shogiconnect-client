import "./ManageUsers.css";
import users from './../../assets/data/users.json';
import { useState } from "react";
import { Link } from "react-router-dom";

const ManageUsers = () => {

    const [sortUserOption, setSortUserOption] = useState('username');

    const [showModal, setShowModal] = useState(false);
    
    const sortedUsers = users.sort((a, b) => {
        if (sortUserOption === 'date') {
            return new Date(a.created_at) - new Date(b.created_at); 
        } else if (sortUserOption === 'username') {
            return a.username.localeCompare(b.username); 
        } 
        return 0;
    });
      
    const handleSortUserChange = (e) => 
    {
        setSortUserOption(e.target.value);
    };

    const handleModifyUser = (e) =>
    {
    }
    const handleDeleteUser = (e) =>
    {
        setShowModal(true); 
    }
    const confirmDeletion = () => {
        console.log('Compte supprimé');
        setShowModal(false);
    };
    
    const cancelDeletion = () => {
        setShowModal(false); 
    };

    const handleCreateUser = (e) =>
    {
    };

    return (
        <div className="manageUsers-container">
            <div className="manageUsers">
                <h1>Gestion des utilisateurs</h1>
                 {/* Modal pour la confirmation de suppression d'un utilisateur' */}
                 {showModal && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <h2>Confirmation</h2>
                            <div className="modal-content">
                                <p>Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible.</p>
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
                <form className="manageUsers-displaySelection">
                    <select className = "orderSelect" id="sortBy" value={sortUserOption} name="sortBy" onChange={handleSortUserChange}>
                        <option value="date">Par date de création</option>
                        <option value="username">Par pseudo</option>
                    </select>
                </form>
                <div className="manageUsers-list">
                    <table className="manageUsers-list-table">
                        <thead>
                            <tr>
                                <th>Pseudo</th>
                                <th>Date de création</th>
                                <th>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedUsers.map((user) => (
                            <tr key={user.id}>
                                <td> <Link className = "manageUsers-list-table-username" to={`/users/${user.id}`}>{user.username}</Link></td>
                                <td>{`${new Date(user.created_at).toLocaleDateString('fr-FR')}`}</td>
                                <td>    
                                    <div className="manageUsers-list-table-buttonContainer">
                                        <button className="manageUsers-table-modifyButton button" onClick={handleModifyUser}>Modifier</button>
                                        <button className="manageUsers-table-deleteButton button" onClick={handleDeleteUser}>supprimer</button>
                                    </div>            
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <button className="manageUsers-CreateButton button" onClick={handleCreateUser}>Ajouter un utilisateur</button>
            </div>   
        </div>
    )
};

export default ManageUsers;