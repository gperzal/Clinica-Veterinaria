// src/components/InformationPatient.jsx
import React, { useState, useEffect } from 'react';
import {
  Box, Heading, Text, VStack, HStack, Divider, Avatar, Spinner, Flex, Badge, Icon, Stack, useColorModeValue, 
  Wrap, WrapItem, Tooltip, SimpleGrid
} from '@chakra-ui/react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaPaw, FaHeartbeat } from 'react-icons/fa';
import { getOwnerById, getPetById } from '../../profile/services/profileService';

const InformationPatient = ({ ownerId, petId }) => {
  const [ownerData, setOwnerData] = useState(null);
  const [petData, setPetData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (ownerId && petId) {
      fetchPatientData(ownerId, petId);
    }
  }, [ownerId, petId]);

  const fetchPatientData = async (ownerId, petId) => {
    setLoading(true);
    try {
      const ownerResponse = await getOwnerById(ownerId);
      const petResponse = await getPetById(petId);
      setOwnerData(ownerResponse.data.owner);
      setPetData(petResponse.data.pet);
    } catch (error) {
      console.error('Error al obtener la información del paciente:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Flex justify="center" mt={6}><Spinner size="xl" /></Flex>;
  }

  const sectionBg = useColorModeValue("gray.50", "gray.900");
  const sectionBorder = useColorModeValue("gray.300", "gray.600");
  const labelColor = useColorModeValue("teal.600", "teal.300");

  return (
    <Box p={6} bg={sectionBg} shadow="lg" borderRadius="lg" border="1px solid" borderColor={sectionBorder}>
      <Heading fontSize="2xl" textAlign="center" mb={6} color={labelColor}>
        Información del Paciente
      </Heading>

      {/* Información del Dueño */}
      <Box border="1px solid" borderColor={sectionBorder} borderRadius="lg" p={4} mb={6} bg={sectionBg}>
        <HStack spacing={4}>
          <Avatar name={ownerData.name} src={ownerData.profileImage || ''} size="xl" />
          <Box>
            <Heading fontSize="lg" color={labelColor}>Dueño: {ownerData.name}</Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={2} mt={4}>
              <Box>
                <Text fontSize="sm" fontWeight="bold" color={labelColor}>Email</Text>
                <Text color="gray.500">{ownerData.email}</Text>
              </Box>
              <Box>
                <Text fontSize="sm" fontWeight="bold" color={labelColor}>Teléfono</Text>
                <Text color="gray.500">{ownerData.phone}</Text>
              </Box>
              {ownerData.altPhone && (
                <Box>
                  <Text fontSize="sm" fontWeight="bold" color={labelColor}>Teléfono Alternativo</Text>
                  <Text color="gray.500">{ownerData.altPhone}</Text>
                </Box>
              )}
              <Box>
                <Text fontSize="sm" fontWeight="bold" color={labelColor}>Dirección</Text>
                <Text color="gray.500">{ownerData.address}</Text>
              </Box>
            </SimpleGrid>
          </Box>
        </HStack>
      </Box>

      <Divider my={4} />

      {/* Información de la Mascota */}
      <Box border="1px solid" borderColor={sectionBorder} borderRadius="lg" p={4} bg={sectionBg}>
        <HStack spacing={4}>
          <Avatar name={petData.name} src={petData.image || ''} size="xl" />
          <Box>
            <Heading fontSize="lg" color={labelColor}>Mascota: {petData.name}</Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={2} mt={4}>
              <Box>
                <Text fontSize="sm" fontWeight="bold" color={labelColor}>Edad</Text>
                <Text color="gray.500">{petData.age} años</Text>
              </Box>
              <Box>
                <Text fontSize="sm" fontWeight="bold" color={labelColor}>Raza</Text>
                <Text color="gray.500">{petData.breed}</Text>
              </Box>
              <Box>
                <Text fontSize="sm" fontWeight="bold" color={labelColor}>Color</Text>
                <Text color="gray.500">{petData.color}</Text>
              </Box>
              <Box>
                <Text fontSize="sm" fontWeight="bold" color={labelColor}>Sexo</Text>
                <Text color="gray.500">{petData.sex}</Text>
              </Box>
              <Box>
                <Text fontSize="sm" fontWeight="bold" color={labelColor}>Número de Chip</Text>
                <Text color="gray.500">{petData.chipNumber || 'N/A'}</Text>
              </Box>
            </SimpleGrid>

            <Flex mt={4} align="center" wrap="wrap" gap={2}>
              <Badge colorScheme={petData.healthStatus === 'Sano' ? 'green' : 'yellow'} p={2}>
                Estado de Salud: {petData.healthStatus}
              </Badge>
              <Badge colorScheme={petData.status === 'Activo' ? 'blue' : 'red'} p={2}>
                Estado: {petData.status}
              </Badge>
            </Flex>
          </Box>
        </HStack>
      </Box>
    </Box>
  );
};

export default InformationPatient;
