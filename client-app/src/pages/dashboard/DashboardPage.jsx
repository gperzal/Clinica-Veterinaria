// src/pages/dashboard/DashboardPage.jsx
import React from 'react';
import { Box, SimpleGrid, Text, Stat, StatLabel, StatNumber } from '@chakra-ui/react';

const DashboardPage = () => {
  return (
    <Box p={4}>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Panel de Control
      </Text>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
        <Stat
          p={4}
          boxShadow="lg"
          borderRadius="md"
          bg="white"
          color="black"
          textAlign="center"
        >
          <StatLabel>Usuarios Activos</StatLabel>
          <StatNumber>12,345</StatNumber>
        </Stat>
        <Stat
          p={4}
          boxShadow="lg"
          borderRadius="md"
          bg="white"
          color="black"
          textAlign="center"
        >
          <StatLabel>Citas Programadas</StatLabel>
          <StatNumber>765</StatNumber>
        </Stat>
        <Stat
          p={4}
          boxShadow="lg"
          borderRadius="md"
          bg="white"
          color="black"
          textAlign="center"
        >
          <StatLabel>Compras Realizadas</StatLabel>
          <StatNumber>89</StatNumber>
        </Stat>
        <Stat
          p={4}
          boxShadow="lg"
          borderRadius="md"
          bg="white"
          color="black"
          textAlign="center"
        >
          <StatLabel>Ingresos Totales</StatLabel>
          <StatNumber>$54,321</StatNumber>
        </Stat>
      </SimpleGrid>
    </Box>
  );
};

export default DashboardPage;
