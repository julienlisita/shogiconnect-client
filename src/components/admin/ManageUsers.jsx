import "./ManageUsers.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";

const ManageUsers = () => {

    const {users, usersLoading, usersError, deleteUser} = useUserContext();
    const [sortUserOption, setSortUserOption] = useState('username');
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    if (usersLoading) return <p>Loading...</p>;
    if (usersError) return <p>Error loading users: {usersError}</p>;

     // Fonctions utilitaires

     const handleDeleteUser = (userId) =>
        {
            setSelectedUser(userId)
            setShowModal(true); 
        }
        const confirmDeletion = () => 
        {
            deleteUser(selectedUser)
            setShowModal(false);
        };
        
        const cancelDeletion = () => {
            setShowModal(false); 
        };    

    // Gérer le changement de tri des utilisateurs
    const handleSortUserChange = (e) => {
        setSortUserOption(e.target.value);
    };

    const sortedUsers = [...users].sort((a, b) => {
        if (sortUserOption === 'date') {
            return new Date(a.createdAt) - new Date(b.createdAt); 
        } else if (sortUserOption === 'username') {
            return a.username.localeCompare(b.username); 
        }else if (sortUserOption === 'role') {
            return a.RoleId - b.RoleId;; 
        }
        return 0;
    });

    const getRoleLabel = (roleId) => {
        switch (roleId) {
            case 1:
                return "Utilisateur";
            case 2:
                return "Admin";
            default:
                return "Inconnu";
        }
    }

    return (
        <div className="manageUsers-container">
            <div className="manageUsers">
                <h1>Gestion des utilisateurs</h1>
                {/* Modal pour la confirmation de suppression d'un topic' */}
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
                <form className="manageUsers-displaySelection">
                    <select className="orderSelect" id="sortBy" value={sortUserOption} name="sortBy" onChange={handleSortUserChange}>
                        <option value="username">Par pseudo</option>
                        <option value="date">Par date de création</option>
                        <option value="role">Par rôle</option>
                    </select>
                </form>
                <div className="manageUsers-list">
                    <table className="manageUsers-list-table">
                        <thead>
                            <tr>
                                <th>Nom d'utilisateur</th>
                                <th>Date de création</th>
                                <th>Rôle</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedUsers.map((user) => (
                            <tr key={user.id}>
                                <td> <Link className="manageUsers-list-table-username" to={`/users/${user.id}`}>{user.username}</Link></td>
                                <td>{`${new Date(user.createdAt).toLocaleDateString('fr-FR')}`}</td>
                                <td>{getRoleLabel(user.RoleId)}</td>
                                <td>    
                                    <div className="manageUsers-list-table-buttonContainer">
                                        <button className="manageUsers-table-modifyButton button">Modifier rôle</button>
                                    </div>            
                                </td>
                                <td>
                                    <div className="manageUsers-list-table-buttonContainer">
                                        <button className="manageUsers-table-deleteButton button" onClick={() => handleDeleteUser(user.id)}>Supprimer</button>
                                    </div>            
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>   
    )
};

export default ManageUsers;