import React, { useRef, useState, useEffect } from 'react';
import {
  Box, Heading, Table, Thead, Tbody, Tr, Th, Td, HStack,
  IconButton, useToast, Avatar, FormControl, InputGroup,
  InputLeftElement, Input, Select, Button, Flex, Text,
} from '@chakra-ui/react';
import {
  SearchIcon, EditIcon, DeleteIcon, InfoIcon, AddIcon,
  AttachmentIcon, ChevronLeftIcon, ChevronRightIcon,
} from '@chakra-ui/icons';
import { useUsers } from '../context/UsersContext';
import UserModal from '../components/UserModal';
import UserInfoModal from '../components/UserInfoModal';

const UsersPage = () => {
  const {
    users, fetchUsers, handleDeleteUser, handleBulkUpload,
    handleCreateUser, handleUpdateUser, handleFetchUserSummary,
  } = useUsers();
  const hiddenFileInput = useRef(null);
  const toast = useToast();

  const [filters, setFilters] = useState({ name: '', role: '', page: 1 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [infoUser, setInfoUser] = useState(null);
  const [petsData, setPetsData] = useState([]);
  const [ordersData, setOrdersData] = useState([]);
  const [appointmentsData, setAppointmentsData] = useState([]);

  const usersPerPage = 8;

  const handleFileUploadClick = () => hiddenFileInput.current.click();

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
        try {
            const result = await handleBulkUpload(file); 
            console.log('Resultado de la carga masiva:', result);
        } catch (error) {
            console.error('Error al cargar el archivo:', error);
        }
    }
};


  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value, page: 1 }));
  };

  const changePage = (newPage) => setFilters((prev) => ({ ...prev, page: newPage }));

  const handleOpenModal = (user = null) => {
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentUser(null);
  };

  const handleSaveUser = async (userData) => {
    try {
      if (currentUser) {
        await handleUpdateUser(currentUser._id, userData);
      } else {
        await handleCreateUser(userData);
      }
      handleCloseModal();
    } catch (error) {
      toast({
        title: 'Error al guardar usuario',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleOpenInfoModal = async (userId) => {
    try {
      const summary = await handleFetchUserSummary(userId);
      setInfoUser(summary.user);
      setPetsData(summary.pets);
      setOrdersData(summary.orders);
      setAppointmentsData(summary.appointments);
      setIsInfoModalOpen(true);
    } catch (error) {
      console.error('Error al abrir el modal de información del usuario:', error);
    }
  };

  const handleCloseInfoModal = () => {
    setIsInfoModalOpen(false);
    setInfoUser(null);
    setPetsData([]);
    setOrdersData([]);
    setAppointmentsData([]);
  };

  useEffect(() => {
    fetchUsers({ name: filters.name, role: filters.role, page: filters.page, limit: usersPerPage });
  }, [filters, fetchUsers]);

  const indexOfLastUser = filters.page * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <Box p={4}>
      <Heading fontSize="2xl" fontWeight="bold" mb={6}>
        Gestión de Usuarios
      </Heading>
      <Flex mb={4} justify="space-between" align="center">
        <HStack spacing={4}>
          <FormControl maxW="300px">
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.600" />
              </InputLeftElement>
              <Input
                name="name"
                value={filters.name}
                onChange={handleFilterChange}
                placeholder="Buscar Usuario"
              />
            </InputGroup>
          </FormControl>
          <FormControl maxW="200px">
            <Select
              name="role"
              value={filters.role}
              onChange={handleFilterChange}
              placeholder="Filtrar por rol"
            >
              <option value="Cliente">Cliente</option>
              <option value="Administrativo">Administrativo</option>
              <option value="Veterinario">Veterinario</option>
              <option value="Administrador">Administrador</option>
            </Select>
          </FormControl>
        </HStack>
        <HStack spacing={4}>
          <Button colorScheme="blue" leftIcon={<AddIcon />} onClick={() => handleOpenModal()}>
            Agregar Usuario
          </Button>
          <Button colorScheme="teal" leftIcon={<AttachmentIcon />} onClick={handleFileUploadClick}>
            Carga Masiva
          </Button>
          <input type="file" accept=".csv, .xlsx" ref={hiddenFileInput} style={{ display: 'none' }} onChange={handleFileChange} />
        </HStack>
      </Flex>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>#</Th>
            <Th>Avatar</Th>
            <Th>Nombre</Th>
            <Th>Email</Th>
            <Th>Rol</Th>
            <Th>Acciones</Th>
          </Tr>
        </Thead>
        <Tbody>
          {currentUsers.map((user, index) => (
            <Tr key={user._id}>
              <Td>{indexOfFirstUser + index + 1}</Td>
              <Td>
                <Avatar src={user.avatar} name={user.name} />
              </Td>
              <Td>{user.name}</Td>
              <Td>{user.email}</Td>
              <Td>{user.role}</Td>
              <Td>
                <HStack spacing={2}>
                  <IconButton icon={<InfoIcon />} colorScheme="teal" variant="outline" onClick={() => handleOpenInfoModal(user._id)} />
                  <IconButton icon={<EditIcon />} colorScheme="blue" variant="outline" onClick={() => handleOpenModal(user)} />
                  <IconButton icon={<DeleteIcon />} colorScheme="red" variant="outline" onClick={() => handleDeleteUser(user._id)} />
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Flex justify="space-between" align="center" mt={4}>
        <Button
          leftIcon={<ChevronLeftIcon />}
          onClick={() => changePage(Math.max(filters.page - 1, 1))}
          isDisabled={filters.page === 1}
        >
          Anterior
        </Button>
        <Text>
          Página {filters.page} de {Math.ceil(users.length / usersPerPage)}
        </Text>
        <Button
          rightIcon={<ChevronRightIcon />}
          onClick={() => changePage(filters.page + 1)}
          isDisabled={filters.page === Math.ceil(users.length / usersPerPage)}
        >
          Siguiente
        </Button>
      </Flex>

      <UserModal user={currentUser} isOpen={isModalOpen} onClose={handleCloseModal} onSave={handleSaveUser} />
      <UserInfoModal
        user={infoUser}
        pets={petsData}
        orders={ordersData}
        appointments={appointmentsData}
        isOpen={isInfoModalOpen}
        onClose={handleCloseInfoModal}
      />
    </Box>
  );
};

export default UsersPage;
