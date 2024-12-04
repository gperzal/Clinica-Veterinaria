import React, { useState, useMemo, useEffect } from "react";
import {
  Box,
  Heading,
  Input,
  Button,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  useColorModeValue,
  Icon,
  Tooltip,
  HStack,
} from "@chakra-ui/react";
import { FaCalendarAlt, FaClock, FaPlayCircle } from "react-icons/fa";
import useToastNotification from "../../../../../hooks/useToastNotification";

const GeneralRestSection = ({ onStartRest, treatmentLogData }) => {
  const labelColor = useColorModeValue("teal.600", "teal.300");
  const showToast = useToastNotification();

  const formatDate = (date) => date.split("T")[0]; // Convertir "2024-11-29T00:00:00.000Z" a "2024-11-29"

  const [treatmentDays, setTreatmentDays] = useState({
    startDate: treatmentLogData?.startDate
      ? formatDate(treatmentLogData.startDate)
      : new Date().toISOString().split("T")[0],
    endDate: treatmentLogData?.endDate
      ? formatDate(treatmentLogData.endDate)
      : "",
  });

  useEffect(() => {
    // Sincronizar datos al cambiar `treatmentLogData`
    if (treatmentLogData) {
      setTreatmentDays({
        startDate: treatmentLogData.startDate
          ? formatDate(treatmentLogData.startDate)
          : new Date().toISOString().split("T")[0],
        endDate: treatmentLogData.endDate ? formatDate(treatmentLogData.endDate) : "",
      });
    }
  }, [treatmentLogData]);

  const { totalDays, remainingDays } = useMemo(() => {
    const start = new Date(treatmentDays.startDate);
    const end = new Date(treatmentDays.endDate || start);
    const today = new Date();

    const totalDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
    const remainingDays = Math.max(
      Math.ceil((end - today) / (1000 * 60 * 60 * 24)) + 1,
      0
    );

    return { totalDays, remainingDays };
  }, [treatmentDays]);

  const handleDateChange = (key, value) => {
    setTreatmentDays((prev) => ({ ...prev, [key]: value }));
  };

  const handleStartRestLocal = () => {
    if (!treatmentDays.startDate || !treatmentDays.endDate) {
      showToast({
        title: "Error",
        description: "Por favor, selecciona ambas fechas.",
        status: "error",
      });
      return;
    }

    if (new Date(treatmentDays.startDate) > new Date(treatmentDays.endDate)) {
      showToast({
        title: "Error",
        description: "La fecha de inicio no puede ser mayor que la de fin.",
        status: "error",
      });
      return;
    }

    onStartRest({
      startDate: treatmentDays.startDate,
      endDate: treatmentDays.endDate,
    });

    showToast({
      title: "Reposo Iniciado",
      description: "Se han registrado las fechas del reposo clínico.",
      status: "success",
    });
    
  };

  return (
    <Box
      mb={6}
      p={6}
      borderWidth="1px"
      borderRadius="lg"
      bg={useColorModeValue("white", "gray.800")}
      textAlign="center"
    >
      <Heading size="md" color={labelColor} mb={4} textAlign={"start"}>
        Información General del Reposo
      </Heading>

      {/* Calendarios */}
      <HStack spacing={8} justify="center" mb={6}>
        <HStack>
          <Icon as={FaCalendarAlt} color="teal.500" />
          <Input
            type="date"
            value={treatmentDays.startDate}
            onChange={(e) => handleDateChange("startDate", e.target.value)}
            size="sm"
            maxW="200px"
          />
          <Tooltip label="Fecha de inicio del reposo" fontSize="sm">
            <span>Inicio</span>
          </Tooltip>
        </HStack>

        <HStack>
          <Icon as={FaCalendarAlt} color="teal.500" />
          <Input
            type="date"
            value={treatmentDays.endDate}
            onChange={(e) => handleDateChange("endDate", e.target.value)}
            size="sm"
            maxW="200px"
          />
          <Tooltip label="Fecha de fin del reposo" fontSize="sm">
            <span>Fin</span>
          </Tooltip>
        </HStack>
      </HStack>

      {/* Estadísticas */}
      <HStack spacing={8} justify="center" mb={6}>
        <Stat>
          <StatLabel color={labelColor}>Días Totales</StatLabel>
          <StatNumber>{totalDays}</StatNumber>
          <StatHelpText>
            <Icon as={FaClock} mr={2} />
            Desde inicio hasta fin
          </StatHelpText>
        </Stat>

        <Stat>
          <StatLabel color={labelColor}>Días Restantes</StatLabel>
          <StatNumber>{remainingDays}</StatNumber>
          <StatHelpText>
            <Icon as={FaClock} mr={2} />
            Basado en la fecha actual
          </StatHelpText>
        </Stat>
      </HStack>

      {/* Botón para iniciar el reposo */}
      <Button
        leftIcon={<FaPlayCircle />}
        colorScheme="teal"
        isDisabled={!treatmentDays.endDate}
        onClick={handleStartRestLocal}
      >
        Iniciar Reposo
      </Button>
    </Box>
  );
};

export default GeneralRestSection;
