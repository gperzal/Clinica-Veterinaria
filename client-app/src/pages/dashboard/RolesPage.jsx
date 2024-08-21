import React, { useState } from 'react';
import {
  Box, Heading, Button, Table, Thead, Tbody, Tr, Th, Td, HStack, IconButton, useDisclosure, Text, Select, useToast,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Input
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, AddIcon, InfoIcon } from '@chakra-ui/icons';

const RolesPage = () => {
  const [roles, setRoles] = useState([
    { id: 1, name: "Cliente", description: "Rol predeterminado para nuevos usuarios", permissions: ["Ver productos", "Realizar compras"] },
    { id: 2, name: "Administrativo", description: "Rol para el personal administrativo", permissions: ["Gestionar inventario", "Ver reportes", "Gestionar usuarios"] },
    { id: 3, name: "Veterinario", description: "Rol para veterinarios", permissions: ["Gestionar citas", "Acceder a historiales médicos"] },
    { id: 4, name: "Administrador", description: "Rol con acceso completo", permissions: ["Gestionar todo el sistema"] }
  ]);
  const [selectedRole, setSelectedRole] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleEditClick = (role) => {
    setSelectedRole(role);
    onOpen();
  };

  const handleRoleSave = (updatedRole) => {
    if (updatedRole.id) {
      setRoles(roles.map(role => (role.id === updatedRole.id ? updatedRole : role)));
      toast({
        title: "Rol actualizado",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } else {
      setRoles([...roles, { ...updatedRole, id: roles.length + 1 }]);
      toast({
        title: "Rol creado",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
    onClose();
  };

  const handleDeleteClick = (roleId) => {
    setRoles(roles.filter(role => role.id !== roleId));
    toast({
      title: "Rol eliminado",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Box p={4}>
      <Heading fontSize="2xl" fontWeight="bold" mb={6}>
        Gestión de Roles y Permisos
      </Heading>

      {/* Botón para crear un nuevo rol */}
      <HStack justify="flex-end" mb={4}>
        <Button leftIcon={<AddIcon />} colorScheme="blue" onClick={() => handleEditClick({})}>
          Crear Nuevo Rol
        </Button>
      </HStack>

      {/* Tabla de Roles */}
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Nombre del Rol</Th>
            <Th>Descripción</Th>
            <Th>Permisos</Th>
            <Th>Acciones</Th>
          </Tr>
        </Thead>
        <Tbody>
          {roles.map(role => (
            <Tr key={role.id}>
              <Td>{role.name}</Td>
              <Td>{role.description}</Td>
              <Td>
                {role.permissions.join(', ')}
              </Td>
              <Td>
                <HStack>
                  <IconButton
                    icon={<EditIcon />}
                    colorScheme="blue"
                    variant="outline"
                    onClick={() => handleEditClick(role)}
                  />
                  <IconButton
                    icon={<DeleteIcon />}
                    colorScheme="red"
                    variant="outline"
                    onClick={() => handleDeleteClick(role.id)}
                  />
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Modal para editar/crear roles */}
      <RoleModal
        role={selectedRole}
        isOpen={isOpen}
        onClose={onClose}
        onSave={handleRoleSave}
      />
    </Box>
  );
};

const RoleModal = ({ role, isOpen, onClose, onSave }) => {
  const [roleData, setRoleData] = useState(role || { name: '', description: '', permissions: [] });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRoleData({ ...roleData, [name]: value });
  };

  const handlePermissionChange = (e) => {
    const { options } = e.target;
    const selectedPermissions = [];
    for (const option of options) {
      if (option.selected) {
        selectedPermissions.push(option.value);
      }
    }
    setRoleData({ ...roleData, permissions: selectedPermissions });
  };

  const handleSave = () => {
    onSave(roleData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent border="1px solid #E2E8F0" borderRadius="md" p={4} boxShadow="lg">
        <ModalHeader>{role?.id ? "Editar Rol" : "Crear Nuevo Rol"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>Nombre del Rol</FormLabel>
            <Input
              name="name"
              value={roleData.name}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Descripción</FormLabel>
            <Input
              name="description"
              value={roleData.description}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Permisos</FormLabel>
            <Select
              name="permissions"
              value={roleData.permissions}
              onChange={handlePermissionChange}
              multiple
            >
              <option value="Ver productos">Ver productos</option>
              <option value="Realizar compras">Realizar compras</option>
              <option value="Gestionar inventario">Gestionar inventario</option>
              <option value="Ver reportes">Ver reportes</option>
              <option value="Gestionar usuarios">Gestionar usuarios</option>
              <option value="Gestionar citas">Gestionar citas</option>
              <option value="Acceder a historiales médicos">Acceder a historiales médicos</option>
              <option value="Gestionar todo el sistema">Gestionar todo el sistema</option>
            </Select>
          </FormControl>
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

export default RolesPage;
