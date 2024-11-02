import React, { useState, useEffect } from 'react';
import { SimpleGrid, Button, Heading, Text, VStack, Avatar, Box, useBreakpointValue, Flex } from '@chakra-ui/react';
import { getSpecialists } from '../../dashboard/profile/services/profileService';

const SpecialistSelection = ({ selectedDate, selectedTime, onSelectSpecialist, serviceType }) => {
  const [specialists, setSpecialists] = useState([]);
  const [loading, setLoading] = useState(true);
  const columns = useBreakpointValue({ base: 1, sm: 2, md: 3 }); // Responsive grid columns

  useEffect(() => {
    const fetchSpecialists = async () => {
      try {
        const response = await getSpecialists();
        setSpecialists(response.data);
      } catch (error) {
        console.error('Error fetching specialists:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpecialists();
  }, []);

  // Filtro de especialistas basado en el tipo de servicio
  const filteredSpecialists = specialists.filter((specialist) => {
    if (serviceType === 'Servicios Médicos') {
      return specialist.role === 'Veterinario';
    } else if (serviceType === 'Servicios de Estética') {
      return specialist.role === 'Estilista';
    }
    return false;
  });

  return (
    <VStack spacing={6} mt={6} w="full" align="center">
      <Heading fontSize={'lg'} textAlign="center" mb={4}>
        Especialistas disponibles para {selectedDate} a las {selectedTime}
      </Heading>
      {loading ? (
        <Text>Cargando especialistas...</Text>
      ) : filteredSpecialists.length > 0 ? (
        <SimpleGrid columns={columns} spacing={6} w="full">
          {filteredSpecialists.map((specialist) => (
            <Button
              key={specialist._id}
              onClick={() => onSelectSpecialist(specialist)}
              variant="outline"
              borderRadius="lg"
              p={4}
              boxShadow="md"
              _hover={{ bg: 'teal.100' }}
              mt={5}
              mb={10}
            >
              <Flex direction="column" align="center" justify="center">
                <Avatar
                  name={specialist.name}
                  src={specialist.image || undefined}
                  size="lg"
                  mb={2}
                />
                <Text fontWeight="bold" textAlign="center">{specialist.name}</Text>
                <Text fontSize="sm" color="gray.500" textAlign="center">{specialist.role}</Text>
              </Flex>
            </Button>
          ))}
        </SimpleGrid>
      ) : (
        <Text>No hay especialistas disponibles para el tipo de servicio seleccionado.</Text>
      )}
    </VStack>
  );
};

export default SpecialistSelection;
