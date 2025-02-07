// src/public/ForumCategories.jsx

import "./ForumCategories.css"
import { Link } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext.jsx";
import { useForumContext } from "../../contexts/ForumContext.jsx";

const ForumCategories = () => {

    const { users, usersLoading, usersError } = useUserContext();
    const { categories, topics, comments, forumLoading,forumError } = useForumContext();

    if (usersLoading || forumLoading) return <p>Loading...</p>;
    if (usersError) return <p>Error loading users: {usersError}</p>;
    if (forumError) return <p>Error loading forum: {forumError}</p>;

    // Fonctions utilitaires

    const getTopicById = (topic_id) => topics.find(topic => topic.id === topic_id);  
    
    const topicsByCategory = (category_id) => topics.filter((topic) => topic.CategoryId === category_id);

    const nbrTopicsByCategory = (category_id) => topicsByCategory(category_id).length;

    const commentsByCategory = (category_id) => comments.filter(comment => getTopicById(comment.TopicId).CategoryId === category_id);
    
    const lastCommentByCategory = (category_id) => {
        const commentsInCategory = commentsByCategory(category_id);
        return commentsInCategory.length > 0 ? commentsInCategory.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))[0] : null;
    };

    const getUserById = (user_id) => users.find(user => user.id === user_id);

    const lastCommentByCategoryUser = (category_id) => getUserById(lastCommentByCategory(category_id) && lastCommentByCategory(category_id).UserId);

    return (
        <div>
            <section className="bannerCategories banner">
            </section>
            <section className="categories main-content">
                <h1 className="main-content-title">Forum ShogiConnect</h1>
                <h2>Liste des catégories</h2>
                <div className="categories-list">
                    <table className="categories-list-table">
                        <thead>
                            <tr>
                            <th>Catégorie</th>
                            <th>Topics</th>
                            <th>Dernier message</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.length === 0 ? ( 
                                <tr>
                                    <td colSpan="3">Aucun catégorie à afficher</td>
                                </tr>
                            ) : (
                            categories.map((category) => {
                                const lastComment = lastCommentByCategory(category.id);
                                const lastUser = lastComment ? lastCommentByCategoryUser(category.id) : null;
                            return (
                                <tr key={category.id}>
                                    <td> <Link className = "categories-table-title" to={`/forum/category/${category.id}`}>{category.title}</Link><br/>{category.description}</td>
                                    <td>{nbrTopicsByCategory(category.id)}</td>
                                    <td>
                                    {lastComment ? (
                                        <>
                                            {`le ${new Date(lastComment.createdAt).toLocaleDateString('fr-FR')} à 
                                            ${new Date(lastComment.createdAt).toLocaleTimeString()}`}
                                            <br/> 
                                            {lastUser ? `par ${lastUser.username}` : "Utilisateur inconnu"}
                                        </>
                                    ) : (
                                        "Aucun message"
                                    )}
                                    </td>
                                </tr>
                            )}))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};
export default ForumCategories;