// src/services/appointment/appointmentService.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_API;

export const createAppointment = async (appointmentData) => {
  try {
    const response = await axios.post(`${API_URL}/api/appointments`, appointmentData);
    return response;
  } catch (error) {
    console.error('Error in Create Appointment:', error);
    throw error.response?.data || { message: 'Error desconocido' };
  }
};