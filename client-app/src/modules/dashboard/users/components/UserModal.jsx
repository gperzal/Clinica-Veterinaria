import React, { useState, useEffect } from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  Button, FormControl, FormLabel, Input, Select, VStack
} from "@chakra-ui/react";

const UserModal = ({ user, isOpen, onClose, onSave }) => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    role: '',
    password: '',
    phone: '',
    altPhone: '',
    birthdate: '',
    address: '',
  });

  useEffect(() => {
    if (user) {
      setUserData({
        ...user,
        birthdate: user.birthdate ? new Date(user.birthdate).toISOString().split('T')[0] : '',
      });
    } else {
      setUserData({
        name: '',
        email: '',
        role: '',
        password: '',
        phone: '',
        altPhone: '',
        birthdate: '',
        address: '',
      }); // Limpiar datos para agregar
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(userData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{user ? "Editar Usuario" : "Agregar Usuario"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Nombre</FormLabel>
              <Input
                name="name"
                value={userData.name}
                onChange={handleInputChange}
                placeholder="Nombre del usuario"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                type="email"
                value={userData.email}
                onChange={handleInputChange}
                placeholder="Correo electrónico"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Rol</FormLabel>
              <Select
                name="role"
                value={userData.role}
                onChange={handleInputChange}
                placeholder="Selecciona un rol"
              >
                <option value="Cliente">Cliente</option>
                <option value="Administrativo">Administrativo</option>
                <option value="Veterinario">Veterinario</option>
                <option value="Administrador">Administrador</option>
              </Select>
            </FormControl>
            {!user && (
              <FormControl>
                <FormLabel>Contraseña</FormLabel>
                <Input
                  name="password"
                  type="password"
                  value={userData.password}
                  onChange={handleInputChange}
                  placeholder="Contraseña"
                />
              </FormControl>
            )}
            <FormControl>
              <FormLabel>Teléfono</FormLabel>
              <Input
                name="phone"
                value={userData.phone}
                onChange={handleInputChange}
                placeholder="Teléfono principal"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Teléfono Alternativo</FormLabel>
              <Input
                name="altPhone"
                value={userData.altPhone}
                onChange={handleInputChange}
                placeholder="Teléfono alternativo"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Fecha de Nacimiento</FormLabel>
              <Input
                name="birthdate"
                type="date"
                value={userData.birthdate}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Dirección</FormLabel>
              <Input
                name="address"
                value={userData.address}
                onChange={handleInputChange}
                placeholder="Dirección"
              />
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSave}>
            Guardar
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UserModal;
