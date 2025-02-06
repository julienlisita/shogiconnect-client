// src/public/NewCommentForm.jsx

import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import "./NewCommentForm.css"

const NewCommentForm = ({ topicId, onCommentAdded }) => {
    const [description, setDescription] = useState("");
    const { user } = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (description.trim()) {
            try {
                const response = await fetch('http://localhost:3000/api/comments', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ content: description, UserId: user.id, TopicId: topicId }),
                });

                if (response.ok) {
                    const newComment = await response.json();
                    onCommentAdded(newComment.data);  // Appeler la fonction parent pour mettre à jour les commentaires
                    setDescription("");  // Réinitialiser le champ de description
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
        <form onSubmit={handleSubmit} className="comments-form">
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="10"
                cols="80"
                placeholder="Saisir votre commentaire"
                required
            />
            <button type="submit" className="comments-form-button">Répondre</button>
        </form>
    );
};

export default NewCommentForm;