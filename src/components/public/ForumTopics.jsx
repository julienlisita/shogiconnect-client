import "./ForumTopics.css"
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";


const ForumTopics = () => {

    const { category_id } = useParams();

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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const getCategoryById = (category_id) => categories.find(category => category.id == category_id);  

    const topicsByCategory = (category_id) => topics.filter((topic) => topic.CategoryId == category_id);

    const sortedTopicsByCategory = (category_id) => topicsByCategory(category_id).sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)); 

    const commentsByTopic = (topic_id) => comments.filter(comment => comment.TopicId == topic_id);
    
    const lastCommentByTopic = (topic_id) => {
            return commentsByTopic(topic_id).sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
        }   
    
    const getUserById = (user_id) => users.find(user => user.id == user_id);

    const lastCommentByTopicUser = (topic_id) => getUserById( lastCommentByTopic(topic_id) && lastCommentByTopic(topic_id).UserId);

    const handleNewTopic = (e) => 
        {
            setSortGameOption(e.target.value);
        };

    return (
        <div>
            <section className="bannerTopics banner">
            </section>
            <section className="topics main-content">
                <h1 className="main-content-title">Catégorie: {getCategoryById(category_id).title}</h1>
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
                            return (<tr key={topic.id}>
                                <td><Link className="topics-list-table-title" to={`/forum/category/${category_id}/topic/${topic.id}`}>{topic.title}</Link>
                                <br />
                                {topic.content}
                                </td>
                                <td>{commentsByTopic(topic.id).length}</td>
                                <td>
                                    {`le ${ new Date(lastCommentByTopic(topic.id).createdAt).toLocaleDateString('fr-FR')} à 
                                        ${new Date(lastCommentByTopic(topic.id).createdAt).toLocaleTimeString()}`}
                                    <br/> 
                                    { `par ${  lastCommentByTopicUser(topic.id).username }`} 
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