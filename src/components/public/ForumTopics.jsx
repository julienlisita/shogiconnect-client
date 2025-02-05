// src/public/ForumTopics.jsx

import "./ForumTopics.css"
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext.jsx";
import { useForumContext } from "../../contexts/ForumContext.jsx";

const ForumTopics = () => {

    const { category_id } = useParams();
    const { users, usersLoading, usersError } = useUserContext();
    const { categories, topics, comments, forumLoading,forumError } = useForumContext();

    if (usersLoading || forumLoading) return <p>Loading...</p>;
    if (usersError) return <p>Error loading users: {usersError}</p>;
    if (forumError) return <p>Error loading forum: {forumError}</p>;

    // Fonctions utilitaires

    const getCategoryById = (category_id) => categories.find(category => category.id == category_id);  

    const topicsByCategory = (category_id) => topics.filter((topic) => topic.CategoryId == category_id);

    const sortedTopicsByCategory = (category_id) => topicsByCategory(category_id).sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)); 

    const commentsByTopic = (topic_id) => comments.filter(comment => comment.TopicId == topic_id);
    
    const lastCommentByTopic = (topic_id) => {
        const commentsSorted = commentsByTopic(topic_id).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        return commentsSorted.length > 0 ? commentsSorted[0] : null; // 🔹 Retourne `null` si pas de commentaire
    };
    
    const getUserById = (user_id) => users.find(user => user.id == user_id);

    const handleNewTopic = (e) => 
        {
            setSortGameOption(e.target.value);
        };

    return (
        <div>
            <section className="bannerTopics banner">
            </section>
            <section className="topics main-content">
                <h1 className="main-content-title">Catégorie: {getCategoryById(category_id) ? getCategoryById(category_id).title : "Inconnue"}</h1>
                <h2>Liste des topics</h2>
                <div className="topics-list">
                    <table className="topics-list-table">
                        <thead>
                            <tr>
                                <th>Topic</th>
                                <th>Commentaires</th>
                                <th>Dernier message</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedTopicsByCategory(category_id).length === 0 ? (
                                <tr>
                                    <td colSpan="3">Aucun topics à afficher</td>
                                </tr>
                            ) : (
                            sortedTopicsByCategory(category_id).map((topic) => {
                                const lastComment = lastCommentByTopic(topic.id);
                                const lastUser = lastComment ? getUserById(lastComment.UserId) : null;
                                return (<tr key={topic.id}>
                                    <td><Link className="topics-list-table-title" to={`/forum/category/${category_id}/topic/${topic.id}`}>{topic.title}</Link>
                                    <br />
                                    {topic.content}
                                    </td>
                                    <td>{commentsByTopic(topic.id).length}</td>
                                    <td>
                                    {lastComment ? (
                                        <>
                                            {`le ${new Date(lastComment.createdAt).toLocaleDateString('fr-FR')} à 
                                            ${new Date(lastComment.createdAt).toLocaleTimeString()}`}
                                            <br />
                                            {lastUser ? `par ${lastUser.username}` : ""}
                                        </>
                                        ) : (
                                            "Pas de commentaire"
                                        )}
                                    </td>
                                </tr>
                            )}))}
                        </tbody>
                    </table>
                </div>
                <h2>Créer un nouveau topic</h2>
                <form action="" className="topics-NewTopicForm" onSubmit={handleNewTopic}>
                    <div className="topics-NewTopicForm-name">
                        <textarea name="name" id="name"  defaultValue="nom du topic"></textarea>
                    </div>
                    <div className="topics-NewTopicForm-description">
                        <textarea name="desription" id="desription"  rows="10" defaultValue="description"></textarea>
                    </div>
                    <div>
                        <button className="topics-NewTopicForm-button">Publier</button>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default ForumTopics;