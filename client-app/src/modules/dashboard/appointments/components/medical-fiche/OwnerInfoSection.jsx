import React from 'react';
import { SimpleGrid, FormControl, FormLabel, Input, Heading, useColorModeValue, Box } from '@chakra-ui/react';

const OwnerInfoSection = ({ ownerData }) => {
  const labelColor = useColorModeValue("teal.600", "teal.300"); // Define el color dinámico para el label

  return (
    <Box as="section" w="full" p={4} borderWidth="1px" borderRadius="lg" bg={useColorModeValue("gray.50", "gray.800")}>
      <Heading size="md" color="teal.500" mb={4}>Información del Dueño y Mascota</Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
        <FormControl>
          <FormLabel color={labelColor}>Nombre Dueño</FormLabel>
          <Input value={ownerData?.name || ''} isDisabled />
        </FormControl>
        <FormControl>
          <FormLabel color={labelColor}>Teléfono</FormLabel>
          <Input value={ownerData?.phone || ''} isDisabled />
        </FormControl>
        <FormControl>
          <FormLabel color={labelColor}>Correo</FormLabel>
          <Input value={ownerData?.email || ''} isDisabled />
        </FormControl>
        <FormControl>
          <FormLabel color={labelColor}>Dirección</FormLabel>
          <Input value={ownerData?.address || ''} isDisabled />
        </FormControl>
      </SimpleGrid>
    </Box>
  );
};

export default OwnerInfoSection;
