import React from 'react';
import { Box, Heading, VStack } from '@chakra-ui/react';
import AppointmentList from '../components/AppointmentList';

const AppointmentHistoryPage = () => {
  return (
    <Box p={4}>
      <Heading fontSize="2xl" mb={6}>Historial de Citas</Heading>
      <VStack spacing={4}>
        <AppointmentList />
      </VStack>
    </Box>
  );
};

export default AppointmentHistoryPage;
