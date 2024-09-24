import "./ForumCategories.css"
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const ForumCategories = () => {


    const [categories, setCategories] = useState([]);
    const [topics, setTopics] = useState([]);
    const [comments, setComments] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [categoriesResponse, topicsResponse, commentsResponse, usersResponse] = await Promise.all([
                    fetch('http://localhost:3000/api/categories'),
                    fetch('http://localhost:3000/api/topics'),
                    fetch('http://localhost:3000/api/comments'),
                    fetch('http://localhost:3000/api/users')
                ]);

                const categoriesData = await categoriesResponse.json();
                const topicsData = await topicsResponse.json();
                const commentsData = await commentsResponse.json();
                const usersData = await usersResponse.json();

                setCategories(categoriesData.data);
                setTopics(topicsData.data);
                setComments(commentsData.data);
                setUsers(usersData.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const getTopicById = (topic_id) => topics.find(topic => topic.id == topic_id);  
    
    const topicsByCategory = (category_id) => topics.filter((topic) => topic.CategoryId == category_id);

    const nbrTopicsByCategory = (category_id) => topicsByCategory(category_id).length;

    const commentsByCategory = (category_id) => comments.filter(comment => getTopicById(comment.TopicId).CategoryId == category_id);
    
    const lastCommentByCategory = (category_id) => {
            return commentsByCategory(category_id).sort((a,b) => new Date(b.created_at) - new Date(a.created_at))[0];
        }   

    const getUserById = (user_id) => users.find(user => user.id == user_id);

    const lastCommentByCategoryUser = (category_id) => getUserById(lastCommentByCategory(category_id) && lastCommentByCategory(category_id).UserId);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

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
                            return (
                                <tr key={category.id}>
                                    <td> <Link className = "categories-table-title" to={`/forum/category/${category.id}`}>{category.title}</Link><br/>{category.description}</td>
                                    <td>{nbrTopicsByCategory(category.id)}</td>
                                    <td>
                                        {`le ${ new Date(lastCommentByCategory(category.id).createdAt).toLocaleDateString('fr-FR')} à 
                                        ${new Date(lastCommentByCategory(category.id).createdAt).toLocaleTimeString()}`}
                                        <br/> 
                                        {`par ${  lastCommentByCategoryUser(category.id).username }`} 
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