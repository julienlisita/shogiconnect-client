// src/hooks/useComments.js

import { useState, useEffect } from 'react';
import commentService from '../services/commentService';

const useComments = () => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Récupérer des commentaires au montage du composant
    const fetchComments = async () => {
        try {
            const commentsData = await commentService.getComments();
            setComments(commentsData);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchComments();
    }, []);

    // créer un commentaire
    const createComment = async (newCommentData) => {
            try {
                const createdComment = await commentService.addComment(newCommentData);
                fetchComments();
            } catch (err) {
                console.error("Erreur lors de l'ajout du commentaire :", err);
                throw err;
            }
        };

    // Supprimer un commentaire
    const deleteComment = async (commentId) => {
        try {
            await commentService.deleteComment(commentId);
            setComments(comments.filter(comment => comment._id !== commentId));
        } catch (err) {
            console.error("Erreur lors de la suppression du commentaire :", err);
            throw err;
        }
    };

    return { comments, loading, error, createComment, deleteComment };
};

export default useComments;