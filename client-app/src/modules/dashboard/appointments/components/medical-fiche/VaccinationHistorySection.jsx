import React, { useState } from 'react';
import {
  Table, Thead, Tbody, Tr, Th, Td, Badge, Heading, VStack, SimpleGrid,
  FormControl, FormLabel, Input, Select, Button, Box, useColorModeValue
} from '@chakra-ui/react';

const VaccinationHistorySection = () => {
  const [vaccines, setVaccines] = useState([]);
  const [newVaccine, setNewVaccine] = useState({ type: '', date: '', nextDate: '', status: 'Vacunar' });
  const labelColor = useColorModeValue("teal.600", "teal.300");

  const handleAddVaccine = () => {
    if (newVaccine.type && newVaccine.date) {
      setVaccines([...vaccines, newVaccine]);
      setNewVaccine({ type: '', date: '', nextDate: '', status: 'Vacunar' });
    }
  };

  return (
    <Box as="section" w="full" p={4} borderWidth="1px" borderRadius="lg" bg={useColorModeValue("gray.50", "gray.800")}>
      <Heading size="md" color="teal.500" mb={4}>Historial de Vacunación</Heading>
      
      <Table variant="simple" size="md">
        <Thead>
          <Tr>
            <Th>#</Th>
            <Th>Tipo Vacuna</Th>
            <Th>Fecha de Vacunación</Th>
            <Th>Próxima Vacuna</Th>
            <Th>Estado</Th>
          </Tr>
        </Thead>
        <Tbody>
          {vaccines.map((vaccine, index) => (
            <Tr key={index}>
              <Td>{index + 1}</Td>
              <Td>{vaccine.type}</Td>
              <Td>{vaccine.date}</Td>
              <Td>{vaccine.nextDate}</Td>
              <Td>
                <Badge colorScheme={vaccine.status === 'Vacunar' ? 'yellow' : 'green'}>
                  {vaccine.status}
                </Badge>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <VStack mt={4} spacing={4} w="full" align="start">
        <Heading size="sm" color={labelColor}>Agregar Nueva Vacuna</Heading>
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
