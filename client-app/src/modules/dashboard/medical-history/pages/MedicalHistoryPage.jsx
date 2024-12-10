// src/pages/dashboard/MedicalHistoryPage.jsx
import React, { useState } from 'react';
import {
  Box,
  SimpleGrid,
  Stack,
  Select,
  Input,
  Button,
  Text,
  Heading,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Icon,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiUser, FiCalendar, FiClipboard } from 'react-icons/fi';
import { SiPetsathome } from 'react-icons/si';

// Mock Data
const mockData = [
  {
    id: 1,
    pet: 'Bobby',
    date: '2024-12-01',
    doctor: 'Dr. Juan Pérez',
    medicalInfo: {
      weight: 12.5,
      temperature: 38.2,
      systolicPressure: 120,
      diastolicPressure: 80,
      heartRate: 70,
    },
    notes: 'El paciente muestra signos de mejora.',
    hasPrescription: true,
  },
  {
    id: 2,
    pet: 'Luna',
    date: '2024-12-05',
    doctor: 'Dra. María López',
    medicalInfo: {
      weight: 8.3,
      temperature: 37.8,
      systolicPressure: 115,
      diastolicPressure: 75,
      heartRate: 72,
    },
    notes: 'Requiere seguimiento en 2 semanas.',
    hasPrescription: false,
  },
];

const MedicalHistoryPage = () => {
  const [filters, setFilters] = useState({ doctor: '', date: '', pet: '' });
  const [filteredData, setFilteredData] = useState(mockData);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);

    // Filtrar los datos
    let filtered = mockData;
    if (newFilters.doctor) filtered = filtered.filter((item) => item.doctor === newFilters.doctor);
    if (newFilters.date) filtered = filtered.filter((item) => item.date === newFilters.date);
    if (newFilters.pet) filtered = filtered.filter((item) => item.pet.toLowerCase().includes(newFilters.pet.toLowerCase()));
    setFilteredData(filtered);
  };

  return (
    <Box p={6}>
    
      <Heading fontSize="2xl" fontWeight="bold" mb={4}>
      Historial Médico
        </Heading>
      {/* Filtros */}
      <Box
        bg={useColorModeValue('white', 'gray.800')}
        p={6}
        borderRadius="md"
        shadow="md"
        mb={8}
      >
        <Heading as="h3" fontSize="lg" mb={4}>
          Filtros
        </Heading>
        <Stack direction={{ base: 'column', md: 'row' }} spacing={6}>
          <Box flex="1">
            <Text fontSize="sm" mb={2} fontWeight="bold" color={useColorModeValue('gray.600', 'gray.300')}>
              Filtrar por Doctor
            </Text>
            <Select
              placeholder="Selecciona un Doctor"
              onChange={(e) => handleFilterChange('doctor', e.target.value)}
              icon={<FiUser />}
            >
              <option value="Dr. Juan Pérez">Dr. Juan Pérez</option>
              <option value="Dra. María López">Dra. María López</option>
            </Select>
          </Box>

          <Box flex="1">
            <Text fontSize="sm" mb={2} fontWeight="bold" color={useColorModeValue('gray.600', 'gray.300')}>
              Filtrar por Fecha
            </Text>
            <Input
              type="date"
              placeholder="Selecciona una Fecha"
              onChange={(e) => handleFilterChange('date', e.target.value)}
              icon={<FiCalendar />}
            />
          </Box>

          <Box flex="1">
            <Text fontSize="sm" mb={2} fontWeight="bold" color={useColorModeValue('gray.600', 'gray.300')}>
              Filtrar por Mascota
            </Text>
            <Input
              placeholder="Nombre de la Mascota"
              onChange={(e) => handleFilterChange('pet', e.target.value)}
              icon={<SiPetsathome />}
            />
          </Box>

          <Box>
            <Text fontSize="sm" mb={2} fontWeight="bold" color={useColorModeValue('gray.600', 'gray.300')}>
              Acciones
            </Text>
            <Button colorScheme="blue" onClick={() => setFilters({ doctor: '', date: '', pet: '' })} w="full">
              Limpiar Filtros
            </Button>
          </Box>
        </Stack>
      </Box>

      {/* Cards */}
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        {filteredData.map((appointment) => (
          <Card key={appointment.id} border="1px" borderColor="gray.200" shadow="md">
            <CardHeader bg={useColorModeValue('blue.50', 'blue.900')} py={4}>
              <Stack direction="row" alignItems="center">
                <Icon as={FiClipboard} w={6} h={6} color="blue.500" />
                <Text fontSize="lg" fontWeight="bold">
                  {appointment.pet}
                </Text>
              </Stack>
            </CardHeader>
            <CardBody>
              <Stack spacing={4}>
                <Stack direction="row" alignItems="center">
                  <Icon as={FiUser} />
                  <Text fontSize="sm">Veterinario: {appointment.doctor}</Text>
                </Stack>
                <Stack direction="row" alignItems="center">
                  <Icon as={FiCalendar} />
                  <Text fontSize="sm">Fecha: {appointment.date}</Text>
                </Stack>
                <Stack spacing={1}>
                  <Text fontSize="sm" fontWeight="bold">
                    Detalles Médicos:
                  </Text>
                  <Text fontSize="sm">Peso: {appointment.medicalInfo.weight} kg</Text>
                  <Text fontSize="sm">Temperatura: {appointment.medicalInfo.temperature} °C</Text>
                  <Text fontSize="sm">
                    Presión Arterial: {appointment.medicalInfo.systolicPressure}/{appointment.medicalInfo.diastolicPressure} mmHg
                  </Text>
                  <Text fontSize="sm">Ritmo Cardíaco: {appointment.medicalInfo.heartRate} bpm</Text>
                </Stack>
                <Stack spacing={1}>
                  <Text fontSize="sm" fontWeight="bold">
                    Observaciones:
                  </Text>
                  <Text fontSize="sm">{appointment.notes || 'Sin observaciones adicionales.'}</Text>
                </Stack>
              </Stack>
            </CardBody>
            <CardFooter justifyContent="space-between" alignItems="center">
              <Button
                colorScheme="teal"
                size="sm"
                onClick={() => alert(`Observaciones: ${appointment.notes}`)}
              >
                Ver Detalles
              </Button>
              {appointment.hasPrescription && (
                <Tooltip label="Receta disponible" aria-label="Receta disponible">
                  <Text ml={4} color="green.500" fontWeight="bold">
                    📝 Receta
                  </Text>
                </Tooltip>
              )}
            </CardFooter>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default MedicalHistoryPage;
