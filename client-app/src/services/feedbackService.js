// src/services/feedbackService.js

import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_API;

export const requestFeedback = async (feedbackData) => {
    try {
        const response = await axios.post(`${API_URL}/api/feedback`, feedbackData);
        return response.data;
    } catch (error) {
        console.error('Error al enviar el feedback:', error);
        console.error(API_URL);
        throw new Error('Error al enviar el feedback');
    }
};