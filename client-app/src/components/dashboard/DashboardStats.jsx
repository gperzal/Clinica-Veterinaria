// src/components/dashboard/DashboardStats.jsx

import React from 'react';
import { Box, Text, useColorModeValue } from '@chakra-ui/react';

const DashboardStats = ({ title, amount, percentage }) => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow="lg"
      borderRadius="lg"
      p={6}
      textAlign="center"
    >
      <Text fontWeight="bold">{title}</Text>
      <Text fontSize="3xl" fontWeight="bold">{amount}</Text>
      <Text color="green.500" fontWeight="bold">{percentage}</Text>
    </Box>
  );
};

export default DashboardStats;
