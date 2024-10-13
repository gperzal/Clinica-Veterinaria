import React, { useState, useEffect } from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  Button, FormControl, FormLabel, Input, Select, VStack
} from "@chakra-ui/react";

const UserModal = ({ user, isOpen, onClose, onSave }) => {
  const [userData, setUserData] = useState(user || {});
  const [password, setPassword] = useState('');  

  useEffect(() => {
    setUserData(user || {});
    setPassword('');  // Reseteamos el campo de contraseña al abrir el modal
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSave = () => {
    const updatedUser = { ...userData };
    if (password) {
      updatedUser.password = password;  
    }
    onSave(updatedUser);
  };

  if (!user) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{user?.id ? "Editar Usuario" : "Agregar Usuario"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Nombre</FormLabel>
              <Input
                name="name"
                value={userData.name || ''}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                type="email"
                value={userData.email || ''}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Rol</FormLabel>
              <Select
                name="role"
                value={userData.role || ''}
                onChange={handleInputChange}
              >
                <option value="Cliente">Cliente</option>
                <option value="Administrativo">Administrativo</option>
                <option value="Veterinario">Veterinario</option>
                <option value="Administrador">Administrador</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Estado</FormLabel>
              <Select
                name="status"
                value={userData.status || ''}
                onChange={handleInputChange}
              >
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Contraseña</FormLabel>
              <Input
                name="password"
                type="password"
                placeholder="Dejar en blanco para mantener la actual"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSave}>
            Guardar
          </Button>
          <Button variant="ghost" onClick={onClose}>Cancelar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UserModal;
