// src/hooks/useComments.js

import { useState, useEffect } from 'react';
import commentService from '../services/commentService';

const useComments = () => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
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

        fetchComments();
    }, []);

    return { comments, loading, error };
};

export default useComments;