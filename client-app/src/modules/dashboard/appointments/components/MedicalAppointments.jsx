// src/components/MedicalAppointments.jsx
import React, { useState, useEffect, useContext } from 'react';
import {
  Box, Table, Thead, Tbody, Tr, Th, Td, TableContainer, IconButton, Text, Badge, Tooltip,
  useColorModeValue, Flex, Heading, HStack
} from '@chakra-ui/react';
import { FaEye, FaCalendarAlt } from 'react-icons/fa';
import { getMedicalAppointments } from '../services/appointmentService';
import { AuthContext } from '../../../auth/context/AuthContext';

const MedicalAppointments = ({ onViewDetails }) => {
  const { user } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const statusColors = {
    Pendiente: 'yellow',
    'En proceso': 'orange',
    Completada: 'green',
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        if (user && user._id) {
          const fetchedAppointments = await getMedicalAppointments(user._id);
          setAppointments(fetchedAppointments);
        }
      } catch (error) {
        console.error('Error loading appointments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [user]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <Box p={4} bg={bgColor} borderRadius="lg" shadow="md">
      <Flex align="center" justify="space-between" mb={4}>
        <HStack spacing={2}>
          <FaCalendarAlt color="blue.500" />
          <Heading size="md" fontWeight="bold">Citas Médicas del Día</Heading>
        </HStack>
        <Text fontSize="sm" color="gray.500">Total: {appointments.length}</Text>
      </Flex>

      <TableContainer border="1px solid" borderColor={borderColor} borderRadius="lg">
        <Table variant="simple">
          <Thead bg={useColorModeValue("gray.100", "gray.700")}>
            <Tr>
              <Th>Hora</Th>
              <Th>Paciente</Th>
              <Th>Dueño</Th>
              <Th>Motivo</Th>
              <Th>Estado</Th>
              <Th>Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {appointments.map((appointment) => (
              <Tr key={appointment._id}>
                <Td>{appointment.time}</Td>
                <Td fontWeight="bold">{appointment.pet.name}</Td>
                <Td>{appointment.customer.name}</Td>
                <Td>{appointment.serviceType}</Td>
                <Td>
                  <Badge colorScheme={statusColors[appointment.status]}>
                    {appointment.status}
                  </Badge>
                </Td>
                <Td>
                  <Tooltip label="Ver detalles" fontSize="sm">
                    <IconButton
                      icon={<FaEye />}
                      colorScheme="teal"
                      variant="outline"
                      onClick={() => onViewDetails({
                        ownerId: appointment.pet.owner,
                        petId: appointment.pet._id
                      })}
                      aria-label="Ver detalles"
                    />
                  </Tooltip>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default MedicalAppointments;
