import React from 'react';
import { Box, Heading, VStack } from '@chakra-ui/react';
import OverbookingManagement from '../../components/appointments/OverbookingManagement';

const ManageOverbookingsPage = () => {
  return (
    <Box p={4}>
      <Heading fontSize="2xl" mb={6}>Gestión de Sobrecupos</Heading>
      <VStack spacing={4}>
        <OverbookingManagement />
      </VStack>
    </Box>
  );
};

export default ManageOverbookingsPage;
