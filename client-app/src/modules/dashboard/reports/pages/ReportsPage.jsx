import React, { useState } from "react";
import {
  Box,
  Heading,
  Button,
  Select,
  VStack,
  FormControl,
  FormLabel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useToast,
  HStack,
  Input,
  Flex,
  Text,
} from "@chakra-ui/react";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

const ReportsPage = () => {
  const [reportType, setReportType] = useState("");
  const [reportData, setReportData] = useState([]);
  const [filter, setFilter] = useState("");
  const toast = useToast();

  // Función para aplanar las citas
  const flattenAppointments = (data) => {
    const flattenedData = [];
    data.forEach((doctorData) => {
      const { doctor, months } = doctorData;
      Object.keys(months).forEach((month) => {
        months[month].forEach((appointment) => {
          flattenedData.push({
            doctor,
            month,
            ...appointment, // Incluye date, patient, time, status
          });
        });
      });
    });
    return flattenedData;
  };

  // Generar Reportes Basados en Tipo Seleccionado
  const handleGenerateReport = () => {
    if (reportType === "Citas Programadas") {
      const rawData = [
        {
          doctor: "Dr. Smith",
          months: {
            November: [
              { date: "15/11/2024", patient: "Juan Lizama", time: "10:30", status: "Atendida" },
              { date: "20/11/2024", patient: "María Pérez", time: "09:00", status: "Atendida" },
            ],
            December: [
              { date: "10/12/2024", patient: "Juan Lizama", time: "10:30", status: "Pendiente" },
            ],
          },
        },
      ];
      const flattenedData = flattenAppointments(rawData);
      setReportData(flattenedData);
    }
    toast({
      title: "Reporte generado",
      description: `Reporte de ${reportType} generado con éxito`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  // Exportar a PDF
  const handleExportToPDF = () => {
    const doc = new jsPDF();
    doc.text(`Reporte de ${reportType}`, 14, 10);
    doc.autoTable({
      head: [["Doctor", "Mes", "Fecha", "Paciente", "Hora", "Estado"]],
      body: reportData.map((item) => [
        item.doctor,
        item.month,
        item.date,
        item.patient,
        item.time,
        item.status,
      ]),
    });
    doc.save(`${reportType}.pdf`);
  };

  // Exportar a Excel
  const handleExportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(reportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Reporte");
    XLSX.writeFile(wb, `${reportType}.xlsx`);
  };

  return (
    <Box p={4}>
      <Heading fontSize="2xl" fontWeight="bold" mb={6}>
        Reportes y Análisis
      </Heading>

      {/* Selección de tipo de reporte y generación */}
      <VStack spacing={4} align="start" mb={8} w="full">
        <FormControl maxW={{ base: "100%", md: "400px" }}>
          <FormLabel>Tipo de Reporte</FormLabel>
          <Select
            placeholder="Selecciona el tipo de reporte"
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
          >
            <option value="Citas Programadas">Citas Programadas</option>
          </Select>
        </FormControl>
        <Button colorScheme="blue" onClick={handleGenerateReport} w={{ base: "full", md: "auto" }}>
          Generar Reporte
        </Button>
      </VStack>

      {/* Filtros adicionales */}
      {reportData.length > 0 && (
        <Flex
          justify="space-between"
          mb={4}
          direction={{ base: "column", md: "row" }}
          gap={4}
          alignItems="flex-start"
        >
          <Input
            maxW={{ base: "100%", md: "300px" }}
            placeholder="Filtrar resultados"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <HStack spacing={2}>
            <Button leftIcon={<FaFilePdf />} colorScheme="red" onClick={handleExportToPDF}>
              Exportar PDF
            </Button>
            <Button leftIcon={<FaFileExcel />} colorScheme="green" onClick={handleExportToExcel}>
              Exportar Excel
            </Button>
          </HStack>
        </Flex>
      )}

      {/* Tabla de datos del reporte */}
      <Box overflowX="auto" w="full">
        {reportData.length > 0 ? (
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Doctor</Th>
                <Th>Mes</Th>
                <Th>Fecha</Th>
                <Th>Paciente</Th>
                <Th>Hora</Th>
                <Th>Estado</Th>
              </Tr>
            </Thead>
            <Tbody>
              {reportData.map((item, index) => (
                <Tr key={index}>
                  <Td>{item.doctor}</Td>
                  <Td>{item.month}</Td>
                  <Td>{item.date}</Td>
                  <Td>{item.patient}</Td>
                  <Td>{item.time}</Td>
                  <Td>{item.status}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        ) : (
          <Text fontSize="lg" color="gray.500" mt={8}>
            No hay datos para mostrar. Selecciona un tipo de reporte y genera el informe.
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default ReportsPage;
