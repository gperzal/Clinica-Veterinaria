import React, { useState } from 'react';
import {   Table, Thead, Tbody, Tr,Th,Td,Heading,VStack, SimpleGrid,FormControl, FormLabel,
  Input, Select, Button, Flex, IconButton, useColorModeValue, Box, Textarea, useDisclosure,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter,
} from '@chakra-ui/react';
import { IoClose, IoEye } from 'react-icons/io5';
import { formatDate } from '../../utils/formatDate.js';

const ExamsSection = ({ exams, setExams }) => {
  const [newExam, setNewExam] = useState({
    type: '',
    date: '',
    result: '',
  });

  const [selectedExam, setSelectedExam] = useState(null); // Para el examen seleccionado
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Manejar cambios en el formulario
  const handleInputChange = (field, value) => {
    setNewExam((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Agregar un nuevo examen
  const handleAddExam = () => {
    if (newExam.type && newExam.date && newExam.result) {
      setExams((prev) => [...prev, { ...newExam, id: Date.now() }]);
      setNewExam({ type: '', date: '', result: '' });
    }
  };

  // Eliminar un examen
  const handleRemoveExam = (id) => {
    setExams((prev) => prev.filter((exam) => exam.id !== id));
  };

  // Ver el detalle del examen en un modal
  const handleViewExam = (exam) => {
    setSelectedExam(exam);
    onOpen();
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
        Exámenes
      </Heading>

      <VStack align="start" spacing={4} w="full">
        {/* Tabla de Exámenes */}
        <Box w="full" overflowX="auto">
          <Table variant="simple" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>Tipo de Examen</Th>
                <Th>Fecha</Th>
                <Th>Resultados</Th>
                <Th>Acciones</Th>
              </Tr>
            </Thead>
            <Tbody>
              {exams.map((exam) => (
                <Tr key={exam.id}>
                  <Td>{exam.type}</Td>
                  <Td>{formatDate(exam.date)}</Td>
                  <Td>
                    <IconButton
                      icon={<IoEye />}
                      colorScheme="blue"
                      variant="outline"
                      size="sm"
                      aria-label="Ver detalles del examen"
                      onClick={() => handleViewExam(exam)}
                    />
                  </Td>
                  <Td>
                    <IconButton
                      icon={<IoClose />}
                      colorScheme="red"
                      variant="outline"
                      size="sm"
                      aria-label="Eliminar examen"
                      onClick={() => handleRemoveExam(exam.id)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>

        {/* Formulario para agregar exámenes */}
        <Box
          w="full"
          mt={4}
          p={4}
          borderWidth="1px"
          borderRadius="lg"
          bg={useColorModeValue('gray.50', 'gray.700')}
        >
          <Heading fontSize="md" mb={2} color={useColorModeValue('gray.700', 'gray.200')}>
            Agregar Nuevo Examen
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            <FormControl>
              <FormLabel>Tipo de Examen</FormLabel>
              <Select
                placeholder="Selecciona tipo de examen"
                value={newExam.type}
                onChange={(e) => handleInputChange('type', e.target.value)}
              >
                <option value="Radiografía">Radiografía</option>
                <option value="Análisis de Sangre">Análisis de Sangre</option>
                <option value="Ultrasonido">Ultrasonido</option>
                <option value="Análisis de Orina">Análisis de Orina</option>
                <option value="Examen Fecal">Examen Fecal</option>
                <option value="Electrocardiograma">Electrocardiograma</option>
                <option value="Ecocardiograma">Ecocardiograma</option>
                <option value="Pruebas de Tiroides">Pruebas de Tiroides</option>
                <option value="Pruebas de Alergias">Pruebas de Alergias</option>
                <option value="Cultivos">Cultivos</option>
                <option value="Biopsias">Biopsias</option>
                <option value="Examen Ocular">Examen Ocular</option>
                <option value="Examen de Oído">Examen de Oído</option>
                <option value="Chequeo Dental">Chequeo Dental</option>
                <option value="Otros">Otros</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Fecha del Examen</FormLabel>
              <Input
                type="date"
                value={newExam.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
              />
            </FormControl>
            <FormControl gridColumn="span 2">
              <FormLabel>Resultados del Examen</FormLabel>
              <Textarea
                placeholder="Detalles del examen y observaciones"
                value={newExam.result}
                onChange={(e) => handleInputChange('result', e.target.value)}
              />
            </FormControl>
          </SimpleGrid>
          <Flex justify="end" mt={4}>
            <Button colorScheme="teal" onClick={handleAddExam}>
              Agregar Examen
            </Button>
          </Flex>
        </Box>
      </VStack>

      {/* Modal para ver detalles del examen */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Resultados del Examen</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedExam && (
              <Box>
                <Box>{selectedExam.result}</Box>
              </Box>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ExamsSection;
