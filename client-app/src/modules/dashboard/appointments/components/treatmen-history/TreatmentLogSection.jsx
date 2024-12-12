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
import { formatDate } from "../../utils/formatDate";
import { useMedicalAppointments } from "../../context/MedicalAppointmentsContext";

const TreatmentLogSection = ({ treatmentLogs, setTreatmentLogs, treatmentLogId  }) => {
  const { handleUpdateTreatments } = useMedicalAppointments();
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const treatmentsPerPage = 3;

  const bgCardColor = useColorModeValue("gray.50", "gray.700");
  const borderColor = useColorModeValue("teal.300", "teal.500");

  const toggleConfirm = async (index) => {
    const treatmentToUpdate = treatmentLogs[index]; 
    const updatedTreatment = {
      ...treatmentToUpdate,
      confirmed: !treatmentToUpdate.confirmed, 
    };
    const updatedLogs = treatmentLogs.map((log, i) =>
      i === index ? updatedTreatment : log
    );
    setTreatmentLogs(updatedLogs);
  
    try {
      await handleUpdateTreatments(treatmentLogId, updatedTreatment);
    } catch (error) {
      console.error("Error al actualizar el tratamiento:", error);
      setTreatmentLogs(treatmentLogs); 
    }
  };
  

  const updateNotes = (index, newNote) => {
    const updatedLogs = treatmentLogs.map((log, i) =>
      i === index ? { ...log, notes: newNote } : log
    );
    setTreatmentLogs(updatedLogs);
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
          <option value="unconfirmed">Pendientes</option>
          <option value="confirmed">Confirmados</option>
        </Select>
      </HStack>

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
                {log.date ? formatDate(log.date) : "Fecha no disponible"}
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
