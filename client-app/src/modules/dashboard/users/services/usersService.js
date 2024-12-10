import api from '../../../../services/api';

// Obtener todos los usuarios con filtros opcionales
export const getUsers = async (filters = {}) => {
  try {
    const response = await api.get('/api/dashboard/users', { params: filters });
    return response.data;
  }
  catch (error) {
    console.error('Error al obtener los usuarios:', error);
  }
};

// Crear un nuevo usuario
export const createUser = async (userData) => {
  try {
    const response = await api.post('/api/dashboard/users', userData);
    return response.data;
  } catch (error) {
    console.error('Error al crear el usuario:', error);
  }
};

// Obtener un usuario por ID
export const getUserById = async (id) => {
  try {
    const response = await api.get(`/api/dashboard/users/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
  }

};

// Actualizar un usuario
export const updateUser = async (id, userData) => {
  try {
    const response = await api.put(`/api/dashboard/users/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
  }

};

// Eliminar un usuario
export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`/api/dashboard/users/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
  }
};


export const fetchUserSummary = async (id) => {
  try {
    const response = await api.get(`/api/dashboard/users/summary/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener el resumen del usuario:', error);
  }
};


// Carga masiva de usuarios desde un archivo
export const bulkUploadUsers = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await api.post('/api/dashboard/users/bulk-upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};
