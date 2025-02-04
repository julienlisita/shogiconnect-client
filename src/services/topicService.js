// src/services/topicService.js

import axios from 'axios';

const API_URL = 'http://localhost:3000/api/topics';

const getTopics = async () => {
    const response = await axios.get(API_URL);
    return response.data.data;
};

export default { getTopics };