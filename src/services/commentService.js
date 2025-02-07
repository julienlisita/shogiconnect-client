// src/services/commentService.js

import axios from 'axios';

const API_URL = 'http://localhost:3000/api/comments';

const getComments = async () => {
    const response = await axios.get(API_URL);
    return response.data.data;
};

const addComment = async (commentData) => {
    const response = await axios.post(API_URL, commentData);
    return response.data.data;
};

export default { getComments,addComment };