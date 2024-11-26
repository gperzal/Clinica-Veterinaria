// src/services/appointmentService.js
import api from '../../../../services/api';

export const getMedicalAppointments = async (userId) => {
  try {
    const response = await api.get(`/api/appointments/${userId}`);
    return response.data.appointments;
  } catch (error) {
    console.error('Error fetching medical appointments:', error);
    throw error;
  }
};

export const getAppointmentsBySpecialist = async () => {
  try {
    const response = await api.get('/api/appointments/specialist');
    return response.data.appointments;
  } catch (error) {
    console.error('Error fetching specialist appointments:', error);
    throw error;
  }
};

