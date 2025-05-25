// src/public/NewCommentForm.jsx

import { useState } from "react";
import "./NewCommentForm.css"
import Button from "../common/Button";
import FormField from "../common/FormField";

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
            <FormField
                type="textarea"
                value={content}
                onChange={setContent}
                rows="10"
                cols="80"
                placeholder="Saisir votre commentaire"
                required
            />
            <Button type="submit">Répondre</Button>
        </form>
    );
};

export default NewCommentForm;