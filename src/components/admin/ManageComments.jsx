import "./ManageComments.css";
import { useState } from "react";
import { useParams,Link } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import { useForumContext } from "../../contexts/ForumContext.jsx";
import ConfirmationModal from "../common/ModalConfirmation.jsx";
import PageTitle from "../common/PageTitle.jsx";
import Button from "../common/Button.jsx";
import Select from "../common/Select.jsx";

const ManageComments = () => {

    const { topic_id } = useParams();
    const { users, usersLoading, usersError} = useUserContext();
    const { comments, commentsLoading, commentsError, deleteComment } = useForumContext();
    const [sortCommentOption, setSortCommentOption] = useState('author');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedCommentId, setSelectedCommentId] = useState(null);

    if (usersLoading || commentsLoading) return <p>Loading...</p>;
    if (usersError) return <p>Error loading users: {usersError}</p>;
    if (commentsError) return <p>Error loading comments: {commentsError}</p>;

    // Fonctions utilitaires
      
    const handleSortCommentChange = (value) => 
    {
        setSortCommentOption(value);
    };

    const handleDeleteComment = (commentId) =>
    {
        setSelectedCommentId(commentId)
        setIsDeleteModalOpen(true); 
    }
    const confirmDeletion = () => 
    {
        deleteComment(selectedCommentId)
        setIsDeleteModalOpen(false);
    };
    
    const cancelDeletion = () => {
        setIsDeleteModalOpen(false); 
    };

    const getUserById = (user_id) => users.find(user => user.id == user_id);

    const commentByTopic = comments.filter(comment => comment.TopicId === parseInt(topic_id));
    
    const sortedComments = commentByTopic.length > 0 ? commentByTopic.sort((a, b) => {
        if (sortCommentOption === 'author') {
            const userA = getUserById(a.UserId);
            const userB = getUserById(b.UserId);
            return (userA?.username || "").localeCompare(userB?.username || ""); 
        } else if(sortCommentOption === 'date')
        {
            return new Date(a.createdAt) - new Date(b.createdAt);
        }
        return 0;
    }): [];

    return (
        <div className="manageComments-container">
            <div className="manageComments">
                <PageTitle>Gestion des Commentaires</PageTitle>
                {/* Modal pour la confirmation de suppression d'un commentaire' */}
                <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={cancelDeletion}
                onConfirm={confirmDeletion}
                message="Êtes-vous sûr de vouloir supprimer ce commentaire ?"
                />
                <form className="manageComments-displaySelection">
                    <Select
                            name="sortBy"
                            value={sortCommentOption}
                            onChange={handleSortCommentChange}
                            options={[
                                { value: "", label: "Trier par", disabled: true },
                                { value: "date", label: "Par date" },
                                { value: "author", label: "Par auteur" },
                            ]}
                        />
                </form>
                <div className="manageTopics-list">
                    <table className="manageTopics-list-table">
                        <thead>
                            <tr>
                                <th>Auteur</th>
                                <th>Date</th>
                                <th>Contenue</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        {sortedComments.length === 0 ? (
                                <tr><td colSpan="4">Aucun commentaire</td></tr>
                            ) : (
                                sortedComments.map((comment) => {
                                    const author = getUserById(comment.UserId);
                                    const content = comment.content;
                                    return (
                                        <tr key={comment.id}>
                                            <td>
                                                {author ? (
                                                    <Link to={`/users/${author.id}`}>{author.username}</Link>
                                                ) : (
                                                    "Inconnu"
                                                )}
                                            </td>
                                            <td>
                                                {`Le ${new Date(comment.createdAt).toLocaleDateString('fr-FR')} ${new Date(comment.createdAt).toLocaleTimeString()}`}
                                            </td>
                                            <td>{content ? (
                                                    `${content.slice(0,25)}...`
                                                ) : (
                                                    "vide"
                                                )}
                                            </td>
                                            <td>
                                                <Button onClick={() => handleDeleteComment(comment.id)}>Supprimer</Button>
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

export default ManageComments;

