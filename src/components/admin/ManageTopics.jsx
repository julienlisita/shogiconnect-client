import "./ManageTopics.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import { useForumContext } from "../../contexts/ForumContext.jsx";

const ManageTopics = () => {

    const { users, usersLoading, usersError} = useUserContext();
    const { topics, topicsLoading, topicsError, deleteTopic } = useForumContext();
    const [sortTopicOption, setSortTopicOption] = useState('title');
    const [showModal, setShowModal] = useState(false);
    const [selectedTopicId, setSelectedTopicId] = useState(null);

    if (usersLoading || topicsLoading) return <p>Loading...</p>;
    if (usersError) return <p>Error loading users: {usersError}</p>;
    if (topicsError) return <p>Error loading topics: {topicsError}</p>;

    // Fonctions utilitaires
      
    const handleSortTopicChange = (e) => 
    {
        setSortTopicOption(e.target.value);
    };

    const handleDeleteTopic = (topicId) =>
    {
        setSelectedTopicId(topicId)
        setShowModal(true); 
    }
    const confirmDeletion = () => 
    {
        deleteTopic(selectedTopicId)
        setShowModal(false);
    };
    
    const cancelDeletion = () => {
        setShowModal(false); 
    };

    const getUserById = (user_id) => users.find(user => user.id == user_id);
    
    const sortedTopics = topics.length > 0 ? topics.sort((a, b) => {
        if(sortTopicOption === 'title')
        {
            return a.title.localeCompare(b.title); 
        }
        else if (sortTopicOption === 'author') {
            const userA = getUserById(a.UserId);
            const userB = getUserById(b.UserId);
            return (userA?.username || "").localeCompare(userB?.username || ""); 
        } else if(sortTopicOption === 'date')
        {
            return new Date(a.createdAt) - new Date(b.createdAt);
        }
        return 0;
    }): [];

    return (
        <div className="manageTopics-container">
            <div className="manageTopics">
                <h1>Gestion des Topics</h1>
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
                <form className="manageTopics-displaySelection">
                    <select className = "orderSelect" id="sortBy" value={sortTopicOption} name="sortBy" onChange={handleSortTopicChange}>
                        <option value="title">Par titre</option>
                        <option value="author">Par auteur</option>
                        <option value="adte">Par date</option>
                    </select>
                </form>
                <div className="manageTopics-list">
                    <table className="manageTopics-list-table">
                        <thead>
                            <tr>
                                <th>Titre</th>
                                <th>Auteur</th>
                                <th>Date</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        {sortedTopics.length === 0 ? (
                                <tr><td colSpan="4">Topics non disponibles</td></tr>
                            ) : (
                                sortedTopics.map((topic) => {
                                    const author = getUserById(topic.UserId);
                                    const title = topic.title;
                                    return (
                                        <tr key={topic.id}>
                                            <td>{title ? (
                                                    <Link to={`/admin/manage-comments/${topic.id}`}>{title}</Link>
                                                ) : (
                                                    "Inconnu"
                                                )}
                                            </td>
                                            <td>
                                                {author ? (
                                                    <Link to={`/users/${author.id}`}>{author.username}</Link>
                                                ) : (
                                                    "Inconnu"
                                                )}
                                            </td>
                                            <td>{`Le ${new Date(topic.createdAt).toLocaleDateString('fr-FR')} ${new Date(topic.createdAt).toLocaleTimeString()}`}</td>
                                            <td>
                                                <button onClick={() => handleDeleteTopic(topic.id)}>Supprimer</button>
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

export default ManageTopics;