// src/services/contactService.js

import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_API;

export const requestContact = async (contactData) => {
    try {
        const response = await axios.post(`${API_URL}/api/contact`, contactData);
        return response.data;
    } catch (error) {
        console.error('Error al enviar el formulario de contacto', error);
        throw new Error('Error al enviar el formulario de contacto:');

    }
};