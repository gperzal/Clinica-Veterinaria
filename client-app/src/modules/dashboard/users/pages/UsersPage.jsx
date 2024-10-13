import React, { useState } from 'react';
import {
  Box, Heading, Table, Thead, Tbody, Tr, Th, Td, HStack, IconButton, useDisclosure, Text, useToast, Avatar, FormControl,
  InputGroup, InputLeftElement, Input, Select, Button, Flex
} from '@chakra-ui/react';
import { SearchIcon, EditIcon, DeleteIcon, ChevronLeftIcon, ChevronRightIcon, InfoIcon, AddIcon } from '@chakra-ui/icons';
import UserModal from '../../../dashboard/users/components/UserModal';
import UserInfoModal from '../../../dashboard/users/components/UserInfoModal';

const UsersPage = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Carlos Pérez", email: "carlos.perez@example.com", role: "Cliente", status: "Activo", avatar: "https://via.placeholder.com/150" },
    { id: 2, name: "María López", email: "maria.lopez@example.com", role: "Administrativo", status: "Activo", avatar: "https://via.placeholder.com/150" },
    { id: 3, name: "Javier García", email: "javier.garcia@example.com", role: "Veterinario", status: "Inactivo", avatar: "https://via.placeholder.com/150" },
    { id: 4, name: "Ana Sánchez", email: "ana.sanchez@example.com", role: "Administrador", status: "Activo", avatar: "https://via.placeholder.com/150" }
  ]);

  const [selectedUser, setSelectedUser] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleEditClick = (user) => {
    setSelectedUser(user);
    onOpen();
  };
  const handleInfoClick = (user) => {
    setSelectedUser(user);
    onOpen();
  };
  const handleUserSave = (updatedUser) => {
    setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
    toast({
      title: "Usuario actualizado",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    onClose();
  };

  const handleDeleteClick = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
    toast({
      title: "Usuario eliminado",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Box p={4}>
      <Heading fontSize="2xl" fontWeight="bold" mb={6}>
        Gestión de Usuarios
      </Heading>

      {/* Barra de búsqueda y filtros */}
      <Flex mb={4} justify="space-between" align="center">
        <HStack spacing={4}>
          <FormControl maxW="300px">
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.600" />
              </InputLeftElement>
              <Input type="text" placeholder="Buscar Usuario" />
            </InputGroup>
          </FormControl>
          <FormControl maxW="200px">
            <Select placeholder="Filtrar por rol">
              <option value="Cliente">Cliente</option>
              <option value="Administrativo">Administrativo</option>
              <option value="Veterinario">Veterinario</option>
              <option value="Administrador">Administrador</option>
            </Select>
          </FormControl>
          <FormControl maxW="200px">
            <Select placeholder="Filtrar por estado">
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </Select>
          </FormControl>
        </HStack>
        <Button colorScheme="blue" leftIcon={<AddIcon />}>
          Agregar Usuario
        </Button>
      </Flex>

      {/* Tabla de Usuarios */}
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Avatar</Th>
            <Th>Nombre</Th>
            <Th>Email</Th>
            <Th>Rol</Th>
            <Th>Estado</Th>
            <Th>Acciones</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map(user => (
            <Tr key={user.id}>
              <Td>
                <Avatar src={user.avatar} name={user.name} />
              </Td>
              <Td>{user.name}</Td>
              <Td>{user.email}</Td>
              <Td>{user.role}</Td>
              <Td>{user.status}</Td>
              <Td>
                <HStack spacing={2}>
                  <IconButton
                      icon={<InfoIcon />}
                      colorScheme="teal"
                      variant="outline"
                      onClick={() => handleInfoClick(user)}
                    />
                  <IconButton
                    icon={<EditIcon />}
                    colorScheme="blue"
                    variant="outline"
                    onClick={() => handleEditClick(user)}
                  />
                  <IconButton
                    icon={<DeleteIcon />}
                    colorScheme="red"
                    variant="outline"
                    onClick={() => handleDeleteClick(user.id)}
                  />
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Paginación */}
      <Flex justify="space-between" align="center" mt={4}>
        <Text>Mostrando 1 a 4 de {users.length} resultados</Text>
        <HStack>
          <IconButton icon={<ChevronLeftIcon />} />
          <IconButton icon={<ChevronRightIcon />} />
        </HStack>
      </Flex>

      {/* Modal de Edición */}
      <UserModal
        user={selectedUser}
        isOpen={isOpen}
        onClose={onClose}
        onSave={handleUserSave}
      />
      <UserInfoModal
        user={selectedUser}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Box>
    
  );
};

export default UsersPage;
