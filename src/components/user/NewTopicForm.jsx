// src/user/NewTopicForm.jsx

import { useState } from 'react';
import "./NewTopicForm.css"

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
                <textarea
                    name="name"
                    id="name"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Nom du topic"
                />
            </div>
            <div className="topics-NewTopicForm-description">
                <textarea
                    name="description"
                    id="description"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows="10"
                    placeholder="Description"
                />
            </div>
            <div>
                <button type="submit" className="topics-NewTopicForm-button">Publier</button>
            </div>
        </form>
    );
};

export default NewTopicForm;