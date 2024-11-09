import React, { useState } from 'react';
import { 
  Box, Heading, Text, Button, Textarea, Checkbox, VStack, Stack, useColorModeValue, 
  Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon,Icon,
  List, ListItem, ListIcon, Badge, SimpleGrid, HStack, Select, IconButton
} from '@chakra-ui/react';
import { FaCheckCircle, FaCheck, FaExclamationTriangle,
    FaArrowLeft, FaArrowRight
   } from "react-icons/fa";
import GeneralRestSection from './treatmen-thistory/GeneralRestSection';
import TreatmentLogSection from './treatmen-thistory/TreatmentLogSection';
import ContractSection from './treatmen-thistory/ContractSection';

const TreatmentHistory = ({ medicalFicheId, petData, ownerData }) => {
  
  const [termsAccepted, setTermsAccepted] = useState(false);
  const daysInClinic = 7;
  const treatmentDays = 7;
  const bgColor = useColorModeValue("gray.50", "gray.800");
  const labelColor = useColorModeValue("teal.600", "teal.300");

  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("all"); // Estado de filtro: "all", "pending", "confirmed"
  const treatmentsPerPage = 2;




  // Generación automática de registros de tratamiento según los días de estancia
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
    
    

  // Maneja la confirmación del tratamiento
  const handleConfirmTreatment = (index) => {
    setTreatmentLogs((prevLogs) =>
      prevLogs.map((log, i) =>
        i === index ? { ...log, confirmed: !log.confirmed } : log
      )
    );
  };

  // Maneja la edición de notas en línea
  const handleNoteChange = (index, newNote) => {
    setTreatmentLogs((prevLogs) =>
      prevLogs.map((log, i) =>
        i === index ? { ...log, notes: newNote } : log
      )
    );
  };


   // Cambia estado de confirmación
   const toggleConfirm = (index) => {
    setTreatmentLogs((logs) =>
      logs.map((log, i) => (i === index ? { ...log, confirmed: !log.confirmed } : log))
    );
  };

  // Actualiza notas
  const updateNotes = (index, newNote) => {
    setTreatmentLogs((logs) =>
      logs.map((log, i) => (i === index ? { ...log, notes: newNote } : log))
    );
  };


  return (
    <Box p={6} bg={bgColor} borderRadius="lg" shadow="lg" maxWidth="90vw" mx="auto">
        <Heading size="lg" textAlign="center" mb={6} color={labelColor}>
          Reposo Clínico de {petData?.name}
        </Heading>

        {/* Información General del Reposo */}
        <GeneralRestSection />

        {/* Registro Diario de Tratamientos */}
        <TreatmentLogSection daysInClinic={daysInClinic} />

        {/* Contrato de Responsabilidad */}
        <ContractSection />
    </Box>
  
  );
};

export default TreatmentHistory;
