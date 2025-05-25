// src/user/NewTopicForm.jsx

import { useState } from 'react';
import "./NewTopicForm.css"
import Button from "../common/Button";
import FormField from "../common/FormField";

const NewTopicForm = ({ onSubmit }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTopicData = {
            title,
            content,
        };
        onSubmit(newTopicData); 
        setTitle("");
        setContent("");
    };

    return (
        <form className="topics-NewTopicForm" onSubmit={handleSubmit}>
            <div className="topics-NewTopicForm-name">
                <FormField
                    type="textarea"
                    value={title}
                    onChange={setTitle}
                    placeholder="Nom du topic"
                />
            </div>
            <div className="topics-NewTopicForm-description">
                <FormField
                    type="textarea"
                    value={content}
                    onChange={setContent}
                    rows="10"
                    placeholder="Description"
                />
            </div>
            <Button type="submit">Publier</Button>
        </form>
    );
};

export default NewTopicForm;