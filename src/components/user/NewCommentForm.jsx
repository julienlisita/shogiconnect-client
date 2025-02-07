// src/public/NewCommentForm.jsx

import { useState } from "react";
import "./NewCommentForm.css"

const NewCommentForm = ({ onSubmit }) => {
    const [content, setContent] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const newCommentData = {
            content,
        };
        onSubmit(newCommentData); 
        setContent("");
    };

    return (
        <form onSubmit={handleSubmit} className="comments-form">
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
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