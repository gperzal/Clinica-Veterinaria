import React, { useState } from 'react';
import { Box, Heading, HStack, VStack, IconButton, 
    Textarea, Badge, Checkbox, Button, SimpleGrid, useColorModeValue, 
Icon, Select, Text
} from '@chakra-ui/react';
import { FaCheck, FaExclamationTriangle, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const TreatmentLog = ({ daysInClinic }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("all"); // Estado de filtro: "all", "pending", "confirmed"
  const treatmentsPerPage = 2;

  const [treatmentLogs, setTreatmentLogs] = useState(
    Array.from({ length: daysInClinic }, (_, i) => ({
      date: new Date(Date.now() + i * 86400000).toLocaleDateString(),
      treatment: "Tratamiento general",
      notes: "",
      confirmed: false,
    }))
  );

  // Filtrar tratamientos según el estado seleccionado
  const filteredLogs = treatmentLogs.filter(log => {
    if (filter === "all") return true;
    return filter === "confirmed" ? log.confirmed : !log.confirmed;
  });

  // Paginación
  const startIdx = (currentPage - 1) * treatmentsPerPage;
  const paginatedLogs = filteredLogs.slice(startIdx, startIdx + treatmentsPerPage);

  // Maneja la confirmación de un tratamiento
  const toggleConfirm = (index) => {
    setTreatmentLogs((logs) =>
      logs.map((log, i) => (i === index ? { ...log, confirmed: !log.confirmed } : log))
    );
  };

  // Actualiza las notas
  const updateNotes = (index, newNote) => {
    setTreatmentLogs((logs) =>
      logs.map((log, i) => (i === index ? { ...log, notes: newNote } : log))
    );
  };

  return (
    <Box mb={6} p={4} borderWidth="1px" borderRadius="lg" bg={useColorModeValue("white", "gray.800")}>
      <Heading size="md" color={useColorModeValue("teal.600", "teal.300")} mb={4}>
        Registro Diario de Tratamientos
      </Heading>

      {/* Filtro */}
      <HStack spacing={4} mb={4}>
        <Select value={filter} onChange={(e) => setFilter(e.target.value)} maxW="200px">
          <option value="all">Todos</option>
          <option value="pending">Pendientes</option>
          <option value="confirmed">Confirmados</option>
        </Select>
      </HStack>

      {/* Tarjetas de Tratamiento */}
      <SimpleGrid columns={{ base: 1, md: 1, lg: 1 }} spacing={4}>
        {paginatedLogs.map((log, index) => (
          <Box key={index} p={4} borderWidth="1px" borderRadius="md" bg={log.confirmed ? "green.500" : "yellow.500"}>
            <HStack justify="space-between" mb={2}>
              <Badge colorScheme={log.confirmed ? "green" : "yellow"}>{log.date}</Badge>
              <Icon as={log.confirmed ? FaCheck : FaExclamationTriangle} color={log.confirmed ? "green.500" : "yellow.500"} />
            </HStack>

            <VStack align="start" spacing={2}>
              <Box fontWeight="bold" color={useColorModeValue("gray.700", "gray.100")}>
                {log.treatment}
              </Box>
              <Textarea
                value={log.notes}
                placeholder="Añadir observaciones..."
                onChange={(e) => updateNotes(index, e.target.value)}
                size="sm"
                bg={useColorModeValue("gray.100", "gray.700")}
              />
              <Checkbox
                isChecked={log.confirmed}
                onChange={() => toggleConfirm(index)}
                colorScheme="teal"
                alignSelf="flex-start"
              >
                Confirmar Tratamiento
              </Checkbox>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>

      {/* Paginador */}
      <HStack justify="center" mt={6} spacing={4}>
        <IconButton
          icon={<FaArrowLeft />}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          isDisabled={currentPage === 1}
          colorScheme="teal"
          aria-label="Página anterior"
        />
        <Text>{`Página ${currentPage} de ${Math.ceil(filteredLogs.length / treatmentsPerPage)}`}</Text>
        <IconButton
          icon={<FaArrowRight />}
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(filteredLogs.length / treatmentsPerPage)))}
          isDisabled={currentPage === Math.ceil(filteredLogs.length / treatmentsPerPage)}
          colorScheme="teal"
          aria-label="Página siguiente"
        />
      </HStack>

      {/* Guardar Cambios */}
      <Box mt={4} textAlign="center">
        <Button colorScheme="teal" onClick={() => alert('Tratamientos guardados')}>
          Guardar Registro de Tratamientos
        </Button>
      </Box>
    </Box>
  );
};

export default TreatmentLog;
