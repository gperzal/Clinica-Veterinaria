import React, { useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Badge, Heading, VStack, SimpleGrid, FormControl,
  FormLabel, Input, Select, Button, Box, useColorModeValue, IconButton,
} from '@chakra-ui/react';
import { IoClose } from 'react-icons/io5';
import { formatDate } from '../../utils/formatDate';

const VaccinationHistorySection = ({ vaccinations, setVaccinations }) => {
  const [newVaccine, setNewVaccine] = useState({ type: '', date: '', nextDate: '' });
  const labelColor = useColorModeValue('teal.600', 'teal.300');

  const calculateStatus = (vaccine) => {
    const today = new Date();
    if (!vaccine.nextDate) {
      return 'Permanente'; // Vacuna de única aplicación
    }
    const nextDate = new Date(vaccine.nextDate);
    return nextDate >= today ? 'Al día' : 'Vacunar';
  };

  const handleAddVaccine = () => {
    if (newVaccine.type && newVaccine.date) {
      const status = calculateStatus(newVaccine); // Calcular estado al agregar la vacuna
      setVaccinations([
        ...vaccinations,
        {
          ...newVaccine,
          status,
        },
      ]);
      setNewVaccine({ type: '', date: '', nextDate: '' });
    }
  };

  const handleRemoveVaccine = (indexToRemove) => {
    setVaccinations(vaccinations.filter((_, index) => index !== indexToRemove));
  };

  return (
    <Box
      as="section"
      w="full"
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Heading size="md" color="teal.500" mb={4}>
        Historial de Vacunación
      </Heading>

      {/* Tabla de Vacunación */}
      <Table variant="simple" size="md">
        <Thead>
          <Tr>
            <Th>#</Th>
            <Th>Tipo Vacuna</Th>
            <Th>Fecha de Vacunación</Th>
            <Th>Próxima Vacuna</Th>
            <Th>Estado</Th>
            <Th>Acciones</Th>
          </Tr>
        </Thead>
        <Tbody>
          {vaccinations.map((vaccine, index) => (
            <Tr key={index}>
              <Td>{index + 1}</Td>
              <Td>{vaccine.type}</Td>
              <Td>{formatDate(vaccine.date)}</Td>
              <Td>
                {vaccine.nextDate ? (
                  formatDate(vaccine.nextDate)
                ) : (
                  <Badge colorScheme="blue" fontSize="lg">
                    ∞
                  </Badge>
                )}
              </Td>
              <Td>
                <Badge
                  colorScheme={
                    vaccine.status === 'Vacunar'
                      ? 'yellow'
                      : vaccine.status === 'Al día'
                      ? 'green'
                      : 'blue'
                  }
                >
                  {vaccine.status}
                </Badge>
              </Td>
              <Td>
                <IconButton
                  icon={<IoClose />}
                  colorScheme="red"
                  size="sm"
                  aria-label="Eliminar vacuna"
                  onClick={() => handleRemoveVaccine(index)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Formulario para agregar nueva vacuna */}
      <VStack mt={4} spacing={4} w="full" align="start">
        <Heading size="sm" color={labelColor}>
          Agregar Nueva Vacuna
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
          <FormControl id="vaccine-type">
            <FormLabel color={labelColor}>Tipo de Vacuna</FormLabel>
            <Select
              placeholder="Selecciona tipo de vacuna"
              value={newVaccine.type}
              onChange={(e) => setNewVaccine({ ...newVaccine, type: e.target.value })}
            >
              <option>Rabia</option>
              <option>Parvovirus</option>
              <option>Moquillo</option>
              <option>Leptospirosis</option>
              <option>Tos de las perreras</option>
              <option>Hepatitis</option>
              <option>Coronavirus</option>
              <option>Panleucopenia</option>
              <option>Calicivirus</option>
              <option>Herpesvirus</option>
            </Select>
          </FormControl>
          <FormControl id="vaccine-date">
            <FormLabel color={labelColor}>Fecha de Vacunación</FormLabel>
            <Input
              type="date"
              value={newVaccine.date}
              onChange={(e) => setNewVaccine({ ...newVaccine, date: e.target.value })}
            />
          </FormControl>
          <FormControl id="next-vaccine-date">
            <FormLabel color={labelColor}>Próxima Fecha</FormLabel>
            <Input
              type="date"
              value={newVaccine.nextDate}
              onChange={(e) => setNewVaccine({ ...newVaccine, nextDate: e.target.value })}
            />
          </FormControl>
        </SimpleGrid>
        <Button colorScheme="teal" onClick={handleAddVaccine}>
          Añadir Vacuna
        </Button>
      </VStack>
    </Box>
  );
};

export default VaccinationHistorySection;
