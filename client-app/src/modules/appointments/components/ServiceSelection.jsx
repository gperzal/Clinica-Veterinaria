// src/components/ServiceSelection.jsx
import React from 'react';
import { Box, VStack, Text, Flex, Icon } from '@chakra-ui/react';
import { FaStethoscope, FaCut } from 'react-icons/fa';

const ServiceSelection = ({ onSelectService }) => {
  return (
    <VStack spacing={6} align="center">
      <Text fontSize="2xl" fontWeight="bold" color="blue.600">Seleccione el Tipo de Servicio</Text>
      
      <Flex justify="center" wrap="wrap" gap={6}>
        <Box
          as="button"
          onClick={() => onSelectService('Servicios Médicos')}
          w="200px"
          h="200px"
          bg="blue.100"
          borderRadius="lg"
          p={5}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          shadow="lg"
          transition="transform 0.2s, background-color 0.2s"
          _hover={{ transform: 'scale(1.05)', bg: "blue.200" }}
        >
          <Icon as={FaStethoscope} w={10} h={10} color="blue.600" />
          <Text mt={3} fontSize="lg" fontWeight="bold" color="blue.800">
            Servicios Médicos
          </Text>
          <Text fontSize="sm" color="blue.600">Consulta y atención médica para tu mascota.</Text>
        </Box>

        <Box
          as="button"
          onClick={() => onSelectService('Servicios de Estética')}
          w="200px"
          h="200px"
          bg="green.100"
          borderRadius="lg"
          p={5}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          shadow="lg"
          transition="transform 0.2s, background-color 0.2s"
          _hover={{ transform: 'scale(1.05)', bg: "green.200" }}
        >
          <Icon as={FaCut} w={10} h={10} color="green.600" />
          <Text mt={3} fontSize="lg" fontWeight="bold" color="green.800">
            Servicios de Estética
          </Text>
          <Text fontSize="sm" color="green.600">Baños, cortes y más para tu mascota.</Text>
        </Box>
      </Flex>
    </VStack>
  );
};

export default ServiceSelection;
