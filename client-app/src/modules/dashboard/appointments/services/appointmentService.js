// src/services/appointmentService.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_API; 

export const getMedicalAppointments = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/api/appointments/user/${userId}`);
    return response.data.appointments;
  } catch (error) {
    console.error('Error fetching medical appointments:', error);
    throw error;
  }
};
