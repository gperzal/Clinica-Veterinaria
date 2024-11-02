// src/components/PetSelection.jsx
import React from 'react';
import { Box, VStack, Button, Text } from '@chakra-ui/react';

const PetSelection = ({ pets, onSelectPet }) => {
  return (
    <VStack spacing={4}>
      <Text fontSize="xl" fontWeight="bold">Seleccione la Mascota</Text>
      {pets.map((pet) => (
        <Button key={pet._id} w="full" onClick={() => onSelectPet(pet)}>
          {pet.name}
        </Button>
      ))}
    </VStack>
  );
};

export default PetSelection;
