// src/hooks/useCategories.js

import { useState, useEffect } from 'react';
import categoryService from '../services/commentService';

const useComments = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const categoriesData = await categoryService.getComments();
                setCategories(categoriesData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchComments();
    }, []);

    return { categories, loading, error };
};

export default useComments;