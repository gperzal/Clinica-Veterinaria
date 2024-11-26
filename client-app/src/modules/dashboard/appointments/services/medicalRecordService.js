// src/services/medicalRecordService.js
import api from '../../../../services/api';


export const attendAppointment = async (appointmentId) => {
  try {
    const response = await api.post(`/api/dashboard/medical-records/attend/${appointmentId}`);
    return response.data;
  } catch (error) {
    console.error('Error attending appointment:', error);
    throw error;
  }
};


export const saveMedicalRecord = async (appointmentId, data) => {
  try {
    const response = await api.post(`/api/dashboard/medical-records/save/${appointmentId}`, data);
    return response.data;
  } catch (error) {
    console.error('Error saving medical record:', error);
    throw error;
  }
};


export const updateMedicalEntry = async (medicalRecordId, entryId, entryData) => {
  try {
    const response = await api.put(`/api/dashboard/medical-records/entry/${medicalRecordId}/${entryId}`, entryData);
    return response.data.entry;
  } catch (error) {
    console.error('Error updating medical entry:', error);
    throw error;
  }
};


export const deleteMedicalEntry = async (medicalRecordId, entryId) => {
  try {
    const response = await api.delete(`/api/dashboard/medical-records/entry/${medicalRecordId}/${entryId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting medical entry:', error);
    throw error;
  }
};

export const getMedicalRecordByPet = async (petId) => {
  try {
    const response = await api.get(`/api/dashboard/medical-records/pet/${petId}`);
    return response.data.medicalRecord;
  } catch (error) {
    console.error('Error getting medical record by pet:', error);
    throw error;
  }
};

export const updatePetInfo = async (petId, petData) => {
  try {
    const response = await api.put(`/api/dashboard/medical-records/pet/${petId}/update`, petData);
    return response.data.pet;
  } catch (error) {
    console.error('Error updating pet info:', error);
    throw error;
  }
};

export const setAppointmentStatus = async (appointmentId, status) => {
  try {
    const response = await api.put(`/api/dashboard/medical-records/${appointmentId}/status`, { status });
    return response.data;
  } catch (error) {
    console.error('Error al cambiar el estado de la cita:', error);
    throw error;
  }
};