import React, { useState } from 'react';
import {
  Box, Heading, Button, Select, HStack, VStack, FormControl, FormLabel, Table, Thead, Tbody, Tr, Th, Td,
  useToast, Flex, IconButton, Input, SimpleGrid, Text
} from '@chakra-ui/react';
import { DownloadIcon, SearchIcon } from '@chakra-ui/icons';
import { FaFilePdf, FaFileCsv, FaFileExcel } from 'react-icons/fa';

const ReportsPage = () => {
  const [reportType, setReportType] = useState('');
  const [reportData, setReportData] = useState([]);
  const [filter, setFilter] = useState('');
  const toast = useToast();

  const handleGenerateReport = () => {
    // Simulación de generación de reportes basada en el tipo seleccionado
    const data = [
      { id: 1, type: "Citas Programadas", date: "15/08/2023", value: "10 citas" },
      { id: 2, type: "Tratamientos Realizados", date: "15/08/2023", value: "5 tratamientos" },
      { id: 3, type: "Ventas", date: "15/08/2023", value: "$500" }
    ];
    setReportData(data.filter(item => item.type === reportType));
    toast({
      title: "Reporte generado",
      description: `Reporte de ${reportType} generado con éxito`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleExport = (format) => {
    toast({
      title: `Reporte exportado en formato ${format.toUpperCase()}`,
      description: `El reporte se ha exportado como ${format.toUpperCase()}`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    // Lógica de exportación de reportes en formato PDF, CSV o Excel
  };

  return (
    <Box p={4}>
      <Heading fontSize="2xl" fontWeight="bold" mb={6}>
        Reportes y Análisis
      </Heading>

      {/* Selección de tipo de reporte y generación */}
      <VStack spacing={4} align="start" mb={8}>
        <FormControl maxW="400px">
          <FormLabel>Tipo de Reporte</FormLabel>
          <Select
            placeholder="Selecciona el tipo de reporte"
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
          >
            <option value="Citas Programadas">Citas Programadas</option>
            <option value="Tratamientos Realizados">Tratamientos Realizados</option>
            <option value="Ventas">Ventas</option>
            <option value="Inventario">Inventario</option>
          </Select>
        </FormControl>
        <Button colorScheme="blue" onClick={handleGenerateReport}>
          Generar Reporte
        </Button>
      </VStack>

      {/* Filtros adicionales */}
      {reportData.length > 0 && (
        <Flex justify="space-between" mb={4}>
          <Input
            maxW="300px"
            placeholder="Filtrar resultados"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <HStack spacing={2}>
            <Button leftIcon={<FaFilePdf />} colorScheme="red" onClick={() => handleExport('pdf')}>
              Exportar PDF
            </Button>
            <Button leftIcon={<FaFileCsv />} colorScheme="yellow" onClick={() => handleExport('csv')}>
              Exportar CSV
            </Button>
            <Button leftIcon={<FaFileExcel />} colorScheme="green" onClick={() => handleExport('excel')}>
              Exportar Excel
            </Button>
          </HStack>
        </Flex>
      )}

      {/* Tabla de datos del reporte */}
      {reportData.length > 0 ? (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Tipo de Reporte</Th>
              <Th>Fecha</Th>
              <Th>Detalle</Th>
            </Tr>
          </Thead>
          <Tbody>
            {reportData.filter(item => item.value.toLowerCase().includes(filter.toLowerCase())).map(item => (
              <Tr key={item.id}>
                <Td>{item.id}</Td>
                <Td>{item.type}</Td>
                <Td>{item.date}</Td>
                <Td>{item.value}</Td>
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
  );
};

export default ReportsPage;
