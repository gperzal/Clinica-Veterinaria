import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  fetchUserSummary,
  bulkUploadUsers,
} from '../services/usersService';
import useToastNotification  from '../../../../hooks/useToastNotification';
import { useCallback } from 'react';
const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useToastNotification();
  const fetchUsers = useCallback(
    async (filters = {}) => {
      setLoading(true);
      try {
        const data = await getUsers(filters);
        setUsers(data);
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      } finally {
        setLoading(false);
      }
    },
    [setUsers, setLoading] 
  );

  const handleCreateUser = async (userData) => {
    try {
      const newUser = await createUser(userData);
      toast({ title: 'Usuario creado', description: 'El usuario ha sido creado exitosamente.', status: 'success' });
      setUsers((prev) => [...prev, newUser]);
    } catch (error) {
      toast({ title: 'Error al crear usuario', description: error.message, status: 'error' });
    }
  };

  const handleUpdateUser = async (id, userData) => {
    try {
      const updatedUser = await updateUser(id, userData);
      setUsers((prev) =>
        prev.map((user) => (user.id === id ? updatedUser : user))
      );
    } catch (error) {
      toast({ title: 'Error al actualizar usuario', description: error.message, status: 'error' });

    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((user) => user.id !== id));
      toast({ title: 'Usuario eliminado',description: 'El usuario ha sido eliminado exitosamente.', status: 'success' });
    } catch (error) {
      toast({ title: 'Error al eliminar usuario', description: error.message, status: 'error' });
    }
  };

  const handleGetUserById = async (id) => {
    try {
      const user = await getUserById(id);
      setSelectedUser(user);
    } catch (error) {
      toast({ title: 'Error al obtener usuario', description: error.message, status: 'error' });
    }
  };

  const handleFetchUserSummary = async (id) => {
    try {
      const summary = await fetchUserSummary(id);
      return summary; 
    } catch (error) {
      toast({
        title: 'Error al obtener el resumen del usuario',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      throw error;
    }
  };

  const handleBulkUpload = async (file) => {
    try {
        const result = await bulkUploadUsers(file); // Llama al servicio
        toast({
            title: 'Carga completada',
            description: `Usuarios creados: ${result.created}, Errores: ${result.failed}`,
            status: 'success',
  
        });

        fetchUsers(); 
        return result;
    } catch (error) {
        toast({
            title: 'Error en la carga masiva',
            description: error.response?.data?.message || 'Ocurrió un error inesperado',
            status: 'error',
        });
        throw error;
    }
};


  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <UsersContext.Provider
      value={{
        users,
        selectedUser,
        loading,
        fetchUsers,
        handleCreateUser,
        handleUpdateUser,
        handleDeleteUser,
        handleGetUserById,
        handleFetchUserSummary,
        handleBulkUpload,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => {
  return useContext(UsersContext);
};
