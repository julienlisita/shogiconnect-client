import "./ForumComments.css"
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const ForumComments = () => {
    

    const { topic_id } = useParams();

    const [topics, setTopics] = useState([]);
    const [comments, setComments] = useState([]);
    const [users, setUsers] = useState([]);

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

    
    const getTopicById = (topic_id) => topics.find(topic => topic.id == topic_id);

    const getUserById = (user_id) => users.find(user => user.id == user_id);

    const commentsByTopic = (topic_id) => comments.filter(comment => comment.TopicId == topic_id);

    const sortCommentsByTopic = (topic_id) => commentsByTopic(topic_id).sort((a,b) => new Date(b.created_at) - new Date(a.created_at)); 

    const handleSubmit = (event) => {
        event.preventDefault();
        let description = event.target.description.value;
        console.log("nouveau commentaire:"+ description);
    }

    const topic = getTopicById(topic_id);
    const topicTitle = topic ? topic.title : "Topic non trouvé";

    
    return (
        <div>
            <section className="bannerComments banner">
            </section>
            <section className="comments main-content">
                <h1 className="main-content-title">Topic: {topicTitle}</h1>
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
                            {sortCommentsByTopic(topic_id).map((comment) => (
                            <tr key={comment.id}>
                                <td><Link className="comments-list-table-username" to={`/users/${comment.UserId}`}>{getUserById(comment.UserId).username}</Link></td>
                                <td>{comment.content}</td>
                                <td>{`le ${new Date(comment.created_at).toLocaleDateString('fr-FR')} à ${new Date(comment.created_at).toLocaleTimeString()}`} </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <h2>Ajouter un commentaire</h2>
                <form action="" onSubmit={handleSubmit} className="comments-form">
                    <textarea name="description" id="description" rows="10" cols="80" placeholder="Saisir votre commentaire"></textarea>
                    <button type="submit" className="comments-form-button">Répondre</button>
                </form>
            </section>
        </div>
    );
};

export default ForumComments;