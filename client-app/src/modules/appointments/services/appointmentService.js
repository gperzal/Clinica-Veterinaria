// src/services/appointment/appointmentService.js
import api from '../../../services/api';

export const createAppointment = async (appointmentData) => {
  try {
    const response = await api.post(`/api/appointments`, appointmentData);
    return response;
  } catch (error) {
    console.error('Error en crear cita:', error);
    throw error.response?.data || { message: 'Error desconocido' };
  }
};