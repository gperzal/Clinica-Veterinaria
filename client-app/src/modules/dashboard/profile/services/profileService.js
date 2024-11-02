// src/services/modules/dashboard/profileService.js
import api from '../../../../services/api';

// Obtener perfil del usuario
export const getProfile = async () => {
  return await api.get('/api/dashboard/profile');
};

// Actualizar perfil del usuario
export const updateProfile = async (profileData) => {
  return await api.put('/api/dashboard/profile', profileData);
};

// Cambiar la contraseña del usuario
export const changePassword = async (passwordData) => {
  return await api.put('/api/dashboard/password', passwordData);
};

// Obtener mascotas del usuario
export const getPets = async () => {
  return await api.get('/api/dashboard/pets');
};

// Agregar una nueva mascota
export const addPet = async (petData) => {
  return await api.post('/api/dashboard/pets', petData);
};

// Actualizar mascota específica
export const updatePet = async (petId, petData) => {
  return await api.put(`/api/dashboard/pets/${petId}`, petData);
};

// Eliminar mascota específica
export const deletePet = async (petId) => {
  return await api.delete(`/api/dashboard/pets/${petId}`);
};

// Obtener dueño por ID
export const getOwnerById = async (ownerId) => {
  return await api.get(`/api/dashboard/owners/${ownerId}`);
};

// Obtener mascota por ID
export const getPetById = async (petId) => {
  return await api.get(`/api/dashboard/pets/${petId}`);
};

// Obtener todos los veterinarios y estilistas
export const getSpecialists = async () => {
  return await api.get('/api/dashboard/specialists');
};