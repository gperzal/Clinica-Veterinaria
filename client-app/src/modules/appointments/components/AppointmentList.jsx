import React, { useContext } from 'react';
import { Box, VStack, HStack, Text, Button } from '@chakra-ui/react';
import { AppointmentsContext } from '../context/AppointmentsContext';

const AppointmentList = () => {
  const { appointments, cancelAppointment, rescheduleAppointment } = useContext(AppointmentsContext);

  return (
    <VStack spacing={4} align="start">
      {appointments.map((appointment) => (
        <Box key={appointment.id} p={4} borderRadius="md" boxShadow="md" w="full">
          <HStack justify="space-between">
            <Text fontWeight="bold">{appointment.serviceType} con {appointment.vet}</Text>
            <Text>{new Date(appointment.date).toLocaleDateString()}</Text>
          </HStack>
          <HStack justify="space-between" mt={2}>
            <Button colorScheme="red" onClick={() => cancelAppointment(appointment.id)}>Cancelar</Button>
            <Button colorScheme="yellow" onClick={() => rescheduleAppointment(appointment.id)}>Reprogramar</Button>
          </HStack>
        </Box>
      ))}
    </VStack>
  );
};

export default AppointmentList;
