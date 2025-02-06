// src/user/NewTopicForm.jsx

import { useState } from 'react';
import "./NewTopicForm.css"

const NewTopicForm = ({ onSubmit }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ name, description });
        setName('');
        setDescription('');
    };

    return (
        <form className="topics-NewTopicForm" onSubmit={handleSubmit}>
            <div className="topics-NewTopicForm-name">
                <textarea
                    name="name"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nom du topic"
                />
            </div>
            <div className="topics-NewTopicForm-description">
                <textarea
                    name="description"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
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