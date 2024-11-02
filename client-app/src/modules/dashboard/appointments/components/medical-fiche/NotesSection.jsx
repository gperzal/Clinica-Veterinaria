// src/components/medical-fiche/NotesSection.jsx

import React from 'react';
import { Box, Textarea, Button, VStack, Heading, useColorModeValue, FormControl, FormLabel, Text, Switch } from '@chakra-ui/react';
import { FaSave } from 'react-icons/fa';

const NotesSection = ({ isClinicalRest, onToggleClinicalRest }) => {
  const bg = useColorModeValue("gray.50", "gray.800");

  return (
    <Box as="section" w="full" p={4} borderWidth="1px" borderRadius="lg" bg={bg}>
      <Heading size="md" color="teal.500" mb={4}>Notas y Observaciones del Veterinario</Heading>
      <VStack align="start" spacing={4}>
        <FormControl display="flex" alignItems="center">
          <FormLabel mb="0" color="teal.500" fontWeight="bold">
            Reposo Clínico
          </FormLabel>
          <Switch size="lg" colorScheme="teal" isChecked={isClinicalRest} onChange={onToggleClinicalRest} />
        </FormControl>
        <Textarea placeholder="Escriba las notas de la cita aquí..." />
        <Button colorScheme="teal" leftIcon={<FaSave />}>Guardar Nota</Button>
      </VStack>
    </Box>
  );
};

export default NotesSection;
