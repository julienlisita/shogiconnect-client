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

    useEffect(() => {
        fetch('http://localhost:3000/api/categories')
        .then((response) => {
            return response.json();
            })
            .then((data) => {
                setCategories(data.data)
                console.log(`categorie = ${data.data}`);
            })
            .catch((error) => console.error('Erreur lors de la récupération des catégories:', error));
    }, []);

    useEffect(() => {
        fetch('http://localhost:3000/api/topics')
        .then((response) => {
            return response.json();
            })
            .then((data) => {
                setTopics(data.data)
                console.log(`topics = ${data.data}`);
            })
            .catch((error) => console.error('Erreur lors de la récupération des topics:', error));
    }, []);

    useEffect(() => {
        fetch('http://localhost:3000/api/comments')
        .then((response) => {
            return response.json();
            })
            .then((data) => {
                setComments(data.data)
                console.log(`comments = ${data.data}`);
            })
            .catch((error) => console.error('Erreur lors de la récupération des commentaires:', error));
    }, []);

    useEffect(() => {
        fetch('http://localhost:3000/api/users')
        .then((response) => {
            return response.json();
            })
            .then((data) => {
                setUsers(data.data)
                console.log(`users = ${data.data}`);
            })
            .catch((error) => console.error('Erreur lors de la récupération des utilisateurs:', error));
    }, []);


    const getCategoryById = (category_id) => categories.find(category => category.id == category_id);  

    const topicsByCategory = (category_id) => topics.filter((topic) => topic.CategoryId == category_id);

    const sortedTopicsByCategory = (category_id) => topicsByCategory(category_id).sort((a,b) => new Date(b.created_at) - new Date(a.created_at)); 

    const commentsByTopic = (topic_id) => comments.filter(comment => comment.TopicId == topic_id);
    
    const lastCommentByTopic = (topic_id) => {
            return commentsByTopic(topic_id).sort((a,b) => new Date(b.created_at) - new Date(a.created_at))[0];
        }   
    
    const getUserById = (user_id) => users.find(user => user.id == user_id);

    const lastCommentByTopicUser = (topic_id) => getUserById( lastCommentByTopic(topic_id) && lastCommentByTopic(topic_id).UserId);

    const handleNewTopic = (e) => 
        {
            setSortGameOption(e.target.value);
        };

    const category = getCategoryById(category_id);
    const categoryTitle = category ? category.title : "Catégorie non trouvée";

    return (
        <div>
            <section className="bannerTopics banner">
            </section>
            <section className="topics main-content">
                <h1 className="main-content-title">Catégorie: {categoryTitle}</h1>
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
                            {sortedTopicsByCategory(category_id).map((topic) => (
                            <tr key={topic.id}>
                                <td><Link className="topics-list-table-title" to={`/forum/category/${category_id}/topic/${topic.id}`}>{topic.title}</Link>
                                <br />
                                {topic.content}
                                </td>
                                <td>{commentsByTopic(topic.id).length}</td>
                                <td>
                                {!lastCommentByTopic(topic.id) ? `-` : `le ${ new Date(lastCommentByTopic(topic.id).created_at).toLocaleDateString('fr-FR')} à 
                                    ${new Date(lastCommentByTopic(topic.id).created_at).toLocaleTimeString()}`}
                                <br/> 
                                { !lastCommentByTopicUser(topic.id) ? `-`: 
                                `par ${  lastCommentByTopicUser(topic.id).username }`} 
                                </td>
                            </tr>
                            ))}
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