import React, { useState, useMemo } from "react";
import {
  Box,
  SimpleGrid,
  Badge,
  Textarea,
  Checkbox,
  useColorModeValue,
  Select,
  HStack,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const TreatmentLogSection = ({ treatmentLogs, setTreatmentLogs, onUpdateTreatment }) => {
  const [filter, setFilter] = useState("all"); // Filtro para los tratamientos
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const treatmentsPerPage = 3; // Número de cards por página

  const bgCardColor = useColorModeValue("gray.50", "gray.700");
  const borderColor = useColorModeValue("teal.300", "teal.500");

  // Cambiar el estado de "confirmed" para un tratamiento específico
  const toggleConfirm = async (index) => {
    const updatedLogs = treatmentLogs.map((log, i) =>
      i === index ? { ...log, confirmed: !log.confirmed } : log
    );
    setTreatmentLogs(updatedLogs);

    // Actualización optimista
    if (typeof onUpdateTreatment === "function") {
      try {
        await onUpdateTreatment(updatedLogs);
      } catch (error) {
        console.error("Error al actualizar el tratamiento:", error);
      }
    }
  };

  // Actualizar las notas de un tratamiento específico
  const updateNotes = (index, newNote) => {
    const updatedLogs = treatmentLogs.map((log, i) =>
      i === index ? { ...log, notes: newNote } : log
    );
    setTreatmentLogs(updatedLogs);

    // Actualización optimista
    if (typeof onUpdateTreatment === "function") {
      onUpdateTreatment(updatedLogs).catch((error) =>
        console.error("Error al actualizar las notas:", error)
      );
    }
  };

  // Filtrar los tratamientos según el filtro seleccionado
  const filteredLogs = useMemo(() => {
    if (filter === "all") return treatmentLogs;
    return filter === "confirmed"
      ? treatmentLogs.filter((log) => log.confirmed)
      : treatmentLogs.filter((log) => !log.confirmed);
  }, [filter, treatmentLogs]);

  // Calcular paginación
  const totalPages = Math.ceil(filteredLogs.length / treatmentsPerPage);
  const paginatedLogs = filteredLogs.slice(
    (currentPage - 1) * treatmentsPerPage,
    currentPage * treatmentsPerPage
  );

  return (
    <Box mt={6} p={6} borderWidth="1px" borderRadius="lg" bg={useColorModeValue("white", "gray.800")}>
      {/* Header con filtro */}
      <HStack justify="space-between" mb={6}>
        <Text fontSize="xl" fontWeight="bold" color="teal.500">
          Registro Diario de Tratamientos
        </Text>
        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          maxW="200px"
          bg={bgCardColor}
          borderColor={borderColor}
        >
          <option value="all">Todos</option>
          <option value="pending">Pendientes</option>
          <option value="confirmed">Confirmados</option>
        </Select>
      </HStack>

      {/* Cards de tratamientos */}
      <SimpleGrid columns={1} spacing={4}>
        {paginatedLogs.map((log, index) => (
          <Box
            key={index}
            p={4}
            borderWidth="1px"
            borderRadius="lg"
            bg={bgCardColor}
            borderColor={borderColor}
            w="full"
          >
            <HStack justify="space-between" mb={4}>
              <Badge colorScheme="teal" fontSize="md">
                {log.date}
              </Badge>
              <Checkbox
                isChecked={log.confirmed}
                onChange={() => toggleConfirm(index)}
                colorScheme="teal"
              >
                Confirmar Tratamiento
              </Checkbox>
            </HStack>
            <Textarea
              value={log.notes}
              onChange={(e) => updateNotes(index, e.target.value)}
              placeholder="Anota las observaciones del tratamiento para este día..."
              size="sm"
              bg={bgCardColor}
            />
          </Box>
        ))}
      </SimpleGrid>
asd
      {/* Paginación */}
      <HStack justify="center" mt={6} spacing={4}>
        <IconButton
          icon={<FaArrowLeft />}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          isDisabled={currentPage === 1}
          colorScheme="teal"
          aria-label="Página anterior"
        />
        <Text>
          Página {currentPage} de {totalPages}
        </Text>
        <IconButton
          icon={<FaArrowRight />}
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          isDisabled={currentPage === totalPages}
          colorScheme="teal"
          aria-label="Página siguiente"
        />
      </HStack>
    </Box>
  );
};

export default TreatmentLogSection;
