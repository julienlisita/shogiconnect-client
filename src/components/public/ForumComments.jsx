// src/public/ForumComments.jsx

import "./ForumComments.css";
import { useParams, Link } from 'react-router-dom';
import { useUserContext } from "../../contexts/UserContext.jsx";
import { useForumContext } from "../../contexts/ForumContext.jsx";

const ForumComments = () => {

    const { topic_id } = useParams();
    const { users, usersLoading, usersError } = useUserContext();
    const { topics, comments, forumLoading,forumError } = useForumContext();

    if (usersLoading || forumLoading) return <p>Loading...</p>;
    if (usersError) return <p>Error loading users: {usersError}</p>;
    if (forumError) return <p>Error loading forum: {forumError}</p>;

    // Fonctions utilitaires

    const getTopicById = (topic_id) => topics.find(topic => topic.id === parseInt(topic_id));
    const getUserById = (user_id) => users.find(user => user.id === user_id);
    const commentsByTopic = (topic_id) => comments.filter(comment => comment.TopicId === parseInt(topic_id));
    const sortCommentsByTopic = (topic_id) => commentsByTopic(topic_id).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const handleSubmit = async (event) => {
        event.preventDefault();
        const description = event.target.description.value.trim();

        if (description) {
            try {
                const response = await fetch('http://localhost:3000/api/comments', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ content: description, UserId: 1, TopicId: topic_id }),
                });

                if (response.ok) {
                    const newComment = await response.json();
                    setComments(prevComments => [...prevComments, newComment.data]);
                    event.target.reset();
                } else {
                    console.error('Erreur lors de l\'ajout du commentaire');
                }
            } catch (error) {
                console.error('Erreur lors de l\'ajout du commentaire:', error);
            }
        } else {
            console.error('Le commentaire ne peut pas être vide');
        }
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
                <form onSubmit={handleSubmit} className="comments-form">
                    <textarea name="description" id="description" rows="10" cols="80" placeholder="Saisir votre commentaire" required></textarea>
                    <button type="submit" className="comments-form-button">Répondre</button>
                </form>
            </section>
        </div>
    );
};

export default ForumComments;