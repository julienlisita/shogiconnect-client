// src/public/ForumComments.jsx

import "./ForumComments.css";
import { useParams, Link } from 'react-router-dom';
import { useAuthContext } from "../../contexts/AuthContext";
import { useUserContext } from "../../contexts/UserContext.jsx";
import { useForumContext } from "../../contexts/ForumContext.jsx";
import NewCommentForm from "../user/NewCommentForm.jsx";

const ForumComments = () => {

    const { topic_id } = useParams();
    const { user, isAuthenticated } = useAuthContext();
    const { users, usersLoading, usersError } = useUserContext();
    const { topics, comments, forumLoading,forumError } = useForumContext();

    if (usersLoading || forumLoading) return <p>Loading...</p>;
    if (usersError) return <p>Error loading users: {usersError}</p>;
    if (forumError) return <p>Error loading forum: {forumError}</p>;

    // Vérification que l'utilisateur est un membre
    const isMember = user && user.roleId === 1;

    // Fonctions utilitaires

    const getTopicById = (topic_id) => topics.find(topic => topic.id === parseInt(topic_id));
    const getUserById = (user_id) => users.find(user => user.id === user_id);
    const commentsByTopic = (topic_id) => comments.filter(comment => comment.TopicId === parseInt(topic_id));
    const sortCommentsByTopic = (topic_id) => commentsByTopic(topic_id).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const handleCommentAdded = (newComment) => {
        // Mettre à jour les commentaires dans l'état local si nécessaire
    };

    return (
        <div>
            <section className="bannerComments banner"></section>
            <section className="comments main-content">
                <h1 className="main-content-title">Topic: {getTopicById(topic_id)?.title}</h1>
                <h2>Liste des commentaires</h2>
                <div className="comments-list">
                    <table className="comments-list-table">
                        <thead>
                            <tr>
                                <th>Pseudo</th>
                                <th>Commentaire</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortCommentsByTopic(topic_id).length === 0 ? (
                                <tr>
                                    <td colSpan="3">Aucun commentaires à afficher</td>
                                </tr>
                            ) : (
                            sortCommentsByTopic(topic_id).map(comment => {
                                const user = getUserById(comment.UserId);
                                return (
                                    <tr key={comment.id}>
                                        <td>
                                            <Link className="comments-list-table-username" to={`/users/${comment.UserId}`}>
                                                {user ? user.username : 'Utilisateur inconnu'}
                                            </Link>
                                        </td>
                                        <td>{comment.content}</td>
                                        <td>{`le ${new Date(comment.createdAt).toLocaleDateString('fr-FR')} à ${new Date(comment.createdAt).toLocaleTimeString()}`}</td>
                                    </tr>
                                );
                            }))}
                        </tbody>
                    </table>
                </div>
                <h2>Ajouter un commentaire</h2>
                { isAuthenticated && isMember ?  
                    <div>
                        <NewCommentForm topicId={topic_id} onCommentAdded={handleCommentAdded} />
                    </div>
                 :  <p>Vous devez être connecté en tant que membre pour écrire un commentaire</p>
                }
            </section>
        </div>
    );
};

export default ForumComments;