import React, { useState, useEffect, useContext } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  IconButton,
  Text,
  Badge,
  Tooltip,
  useColorModeValue,
  Flex,
  Heading,
  HStack,
  Select,
  Input,
  VStack,Spinner,Skeleton
} from '@chakra-ui/react';
import { FaClock, FaEye, FaCalendarAlt, FaChevronLeft, FaChevronRight, FaSearch } from 'react-icons/fa';
import { getAppointmentsBySpecialist } from '../services/appointmentService';
import { AuthContext } from '../../../auth/context/AuthContext';

const MedicalAppointments = ({ onViewDetails, refreshKey, activeAppointment  }) => {
  const { user } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('month'); 
  const [statusFilter, setStatusFilter] = useState(''); 
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = 5;

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const theadBgColor = useColorModeValue("gray.100", "gray.700");

  const statusColors = {
    Pendiente: 'yellow',
    'En Proceso': 'blue',
    Finalizado: 'green',
  };

  const getStartOfPeriod = (period) => {
    const now = new Date();
    if (period === 'day') return new Date(now.getFullYear(), now.getMonth(), now.getDate());
    if (period === 'week') {
      const firstDay = now.getDate() - now.getDay();
      return new Date(now.setDate(firstDay));
    }
    if (period === 'month') return new Date(now.getFullYear(), now.getMonth(), 1);
  };

  const fetchAppointments = async () => {
    try {
      if (user && user._id) {
        const fetchedAppointments = await getAppointmentsBySpecialist();
        setAppointments(fetchedAppointments);
      }
    } catch (error) {
      console.error('Error loading appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [user, refreshKey]);

  useEffect(() => {
    const startOfPeriod = getStartOfPeriod(filter);
    const filtered = appointments.filter((appointment) => {
      const appointmentDate = new Date(appointment.date);
      const matchesPeriod = appointmentDate >= startOfPeriod;
      const matchesStatus = !statusFilter || appointment.status === statusFilter;
      const matchesSearch =
        appointment.pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.pet.owner.name.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesPeriod && matchesStatus && matchesSearch;
    });
    setFilteredAppointments(filtered);
    setCurrentPage(1); 
  }, [filter, statusFilter, searchTerm, appointments]);

  if (loading) {
    return (
      <Box p={4} bg={bgColor} borderRadius="lg" shadow="md">
        {loading && (
          <VStack justify="center" align="center" minHeight="100px" mb={4}>
            <Spinner size="xl" thickness="4px" speed="0.65s" color="teal.500" />
            <Text color="teal.600">Cargando citas...</Text>
          </VStack>
        )}
        <TableContainer border="1px solid" borderColor={borderColor} borderRadius="lg">
          <Table variant="simple">
            <Thead bg={theadBgColor}>
              <Tr>
                <Th>Fecha y Hora</Th>
                <Th>Paciente</Th>
                <Th>Dueño</Th>
                <Th>Estado</Th>
                <Th>Acciones</Th>
              </Tr>
            </Thead>
            <Tbody>
              {loading
                ? // Mostrar Skeleton mientras se cargan los datos
                  Array.from({ length: appointmentsPerPage }).map((_, index) => (
                    <Tr key={index}>
                      <Td>
                        <Skeleton height="20px" width="80%" />
                      </Td>
                      <Td>
                        <Skeleton height="20px" width="60%" />
                      </Td>
                      <Td>
                        <Skeleton height="20px" width="70%" />
                      </Td>
                      <Td>
                        <Skeleton height="20px" width="50%" />
                      </Td>
                      <Td>
                        <Skeleton height="20px" width="40px" />
                      </Td>
                    </Tr>
                  ))
                : // Mostrar citas cuando se cargan los datos
                  currentAppointments.map((appointment) => (
                    <Tr key={appointment._id}>
                      <Td>
                        <VStack align="start" spacing={0}>
                          <HStack>
                            <FaCalendarAlt color="gray.500" />
                            <Text fontSize="sm" fontWeight="bold">
                              {new Date(appointment.date).toLocaleDateString('es-ES', {
                                weekday: 'short',
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              })}
                            </Text>
                          </HStack>
                          <HStack>
                            <FaClock color="gray.500" />
                            <Text fontSize="sm" color="gray.400">
                              {appointment.time}
                            </Text>
                          </HStack>
                        </VStack>
                      </Td>
                      <Td fontWeight="bold">{appointment.pet.name}</Td>
                      <Td>{appointment.pet.owner.name}</Td>
                      <Td>
                        <Badge colorScheme={statusColors[appointment.status]}>
                          {appointment.status}
                        </Badge>
                      </Td>
                      <Td>
                        <Tooltip label="Ver detalles" fontSize="sm">
                          <IconButton
                            icon={<FaEye />}
                            colorScheme={activeAppointment ? "gray" : "teal"}
                            variant="outline"
                            onClick={() => onViewDetails(appointment._id)}
                            isDisabled={activeAppointment}
                          />
                        </Tooltip>
                      </Td>
                    </Tr>
                  ))}
            </Tbody>
          </Table>
        </TableContainer>

        {/* Paginación */}
        {!loading && filteredAppointments.length > 0 && (
          <Flex justify="space-between" align="center" mt={4}>
            <Text fontSize="sm" color="gray.500">
              Mostrando {indexOfFirstAppointment + 1} -{" "}
              {Math.min(indexOfLastAppointment, filteredAppointments.length)} de{" "}
              {filteredAppointments.length}
            </Text>
            <HStack spacing={2}>
              <IconButton
                icon={<FaChevronLeft />}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                isDisabled={currentPage === 1}
                aria-label="Página anterior"
              />
              <Text fontSize="sm">
                {currentPage} / {totalPages}
              </Text>
              <IconButton
                icon={<FaChevronRight />}
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                isDisabled={currentPage === totalPages}
                aria-label="Página siguiente"
              />
            </HStack>
          </Flex>
        )}

        {!loading && filteredAppointments.length === 0 && (
          <Text mt={4} textAlign="center" color="gray.500">
            No hay citas para mostrar.
          </Text>
        )}
     </Box>


    );
  }
  

  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = filteredAppointments.slice(indexOfFirstAppointment, indexOfLastAppointment);

  const totalPages = Math.ceil(filteredAppointments.length / appointmentsPerPage);

  return (
    <Box p={4} bg={bgColor} borderRadius="lg" shadow="md">
      {/* Header with Filters */}
      <Flex align="center" justify="space-between" mb={4}>
        <HStack spacing={2}>
          <FaCalendarAlt color="blue.500" />
          <Heading size="md" fontWeight="bold">
            {user.role === 'Veterinario' ? 'Citas Médicas' : 'Citas de Estilistas'}
          </Heading>
        </HStack>
        <HStack spacing={4}>
            <Select
            maxW="200px"
            value={filter} 
            onChange={(e) => setFilter(e.target.value)} 
            borderColor={borderColor}
          >
            <option value="day">Hoy</option>
            <option value="week">Esta Semana</option>
            <option value="month">Este Mes</option>
          </Select>
          <Select
            maxW="200px"
            placeholder="Filtrar por Estado"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            borderColor={borderColor}
          >
            <option value="Pendiente">Pendiente</option>
            <option value="En proceso">En proceso</option>
            <option value="Finalizado">Finalizado</option>
          </Select>
          <Input
            maxW="200px"
            placeholder="Buscar por nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            borderColor={borderColor}
            rightIcon={<FaSearch />}
          />
        </HStack>
      </Flex>

      {/* Appointments Table */}
      <TableContainer border="1px solid" borderColor={borderColor} borderRadius="lg">
        <Table variant="simple">
          <Thead bg={theadBgColor}>
            <Tr>
              <Th>Fecha y Hora</Th>
              <Th>Paciente</Th>
              <Th>Dueño</Th>
              <Th>Estado</Th>
              <Th>Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentAppointments.map((appointment) => (
              <Tr key={appointment._id}>
                <Td>
                  <VStack align="start" spacing={0}>
                    <HStack>
                      <FaCalendarAlt color="gray.500" />
                      <Text fontSize="sm" fontWeight="bold">
                        {new Date(appointment.date).toLocaleDateString('es-ES', {
                          weekday: 'short',
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </Text>
                    </HStack>
                    <HStack>
                      <FaClock color="gray.500" />
                      <Text fontSize="sm" color="gray.400">
                        {appointment.time}
                      </Text>
                    </HStack>
                  </VStack>
                </Td>
                <Td fontWeight="bold">{appointment.pet.name}</Td>
                <Td>{appointment.pet.owner.name}</Td>
                <Td>
                  <Badge colorScheme={statusColors[appointment.status]}>
                    {appointment.status}
                  </Badge>
                </Td>
                <Td>
                  <Tooltip label="Ver detalles" fontSize="sm">
                    <IconButton
                      icon={<FaEye />}
                      colorScheme={activeAppointment ? "gray" : "teal"}
                      variant="outline"
                      onClick={() => onViewDetails(appointment._id)}
                      isDisabled={activeAppointment}
                    />
                  </Tooltip>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      {filteredAppointments.length > 0 && (
        <Flex justify="space-between" align="center" mt={4}>
          <Text fontSize="sm" color="gray.500">
            Mostrando {indexOfFirstAppointment + 1} - {Math.min(indexOfLastAppointment, filteredAppointments.length)} de {filteredAppointments.length}
          </Text>
          <HStack spacing={2}>
            <IconButton
              icon={<FaChevronLeft />}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              isDisabled={currentPage === 1}
              aria-label="Página anterior"
            />
            <Text fontSize="sm">{currentPage} / {totalPages}</Text>
            <IconButton
              icon={<FaChevronRight />}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              isDisabled={currentPage === totalPages}
              aria-label="Página siguiente"
            />
          </HStack>
        </Flex>
      )}

      {filteredAppointments.length === 0 && (
        <Text mt={4} textAlign="center" color="gray.500">No hay citas para mostrar.</Text>
      )}
    </Box>
  );
};

export default MedicalAppointments;