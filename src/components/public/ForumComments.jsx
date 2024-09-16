import "./ForumComments.css"
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import users from './../../assets/data/users.json';
import categories from './../../assets/data/categories.json';
import topics from './../../assets/data/topics.json';
import comments from './../../assets/data/comments.json';

const ForumComments = () => {
    

    const { topic_id } = useParams();
    
    const getTopicById = (topic_id) => topics.find(topic => topic.id == topic_id);

    const getUserById = (user_id) => users.find(user => user.id == user_id);

    const commentsByTopic = (topic_id) => comments.filter(comment => comment.topic_id == topic_id);

    const sortCommentsByTopic = (topic_id) => commentsByTopic(topic_id).sort((a,b) => new Date(b.created_at) - new Date(a.created_at)); 

    const handleSubmit = (event) => {
        event.preventDefault();
        let description = event.target.description.value;
        console.log("nouveau commentaire:"+ description);
    }

    const topic = getTopicById(topic_id);

    
    return (
        <div>
            <section className="bannerComments banner">
            </section>
            <section className="comments main-content">
                <h1 className="main-content-title">Topic: {topic.title}</h1>
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
                                <td><Link className="comments-list-table-username" to={`/users/${comment.user_id}`}>{getUserById(comment.user_id).username}</Link></td>
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