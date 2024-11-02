import React from 'react';
import {
  Table, Thead, Tbody, Tr, Th, Td, Badge, Heading, VStack, SimpleGrid,
  FormControl, FormLabel, Input, Select, Button, Flex, IconButton,
  useColorModeValue, Box, Textarea
} from '@chakra-ui/react';
import { IoClose } from "react-icons/io5";

const ExamsSection = () => (
    <Box as="section" w="full" p={4} borderWidth="1px" borderRadius="lg" bg={useColorModeValue("gray.50", "gray.800")}>
        <Heading size="md" color="teal.500" mb={4}>Exámenes</Heading>
        
        <VStack align="start" spacing={4} w="full">
            {/* Tabla de Exámenes Anteriores */}
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
                  {/* Mock de Exámenes realizados */}
                  {[
                      { id: 1, tipo: "Radiografía", fecha: "01-10-2024", resultado: "Sin anomalías" },
                      { id: 2, tipo: "Análisis de Sangre", fecha: "15-10-2024", resultado: "Valores normales" }
                  ].map((examen) => (
                    <Tr key={examen.id}>
                      <Td>{examen.tipo}</Td>
                      <Td>{examen.fecha}</Td>
                      <Td>{examen.resultado}</Td>
                      <Td>
                        <IconButton
                          icon={<IoClose />}
                          colorScheme="red"
                          variant="outline"
                          size="sm"
                          aria-label="Eliminar examen"
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>

            {/* Formulario para Agregar Nuevo Examen */}
            <Box
              w="full"
              mt={4}
              p={4}
              borderWidth="1px"
              borderRadius="lg"
              bg={useColorModeValue("gray.50", "gray.700")}
            >
              <Heading fontSize="md" mb={2} color={useColorModeValue("gray.700", "gray.200")}>
                  Agregar Nuevo Examen
              </Heading>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  <FormControl id="exam-type">
                    <FormLabel color={useColorModeValue("gray.600", "gray.300")}>Tipo de Examen</FormLabel>
                    <Select
                      placeholder="Selecciona tipo de examen"
                      bg={useColorModeValue("white", "gray.600")}
                      color={useColorModeValue("gray.800", "white")}
                    >
                      <option>Radiografía</option>
                      <option>Análisis de Sangre</option>
                      <option>Ultrasonido</option>
                      <option>Otros</option>
                    </Select>
                  </FormControl>
                  <FormControl id="exam-date">
                    <FormLabel color={useColorModeValue("gray.600", "gray.300")}>Fecha del Examen</FormLabel>
                    <Input
                      type="date"
                      bg={useColorModeValue("white", "gray.600")}
                      color={useColorModeValue("gray.800", "white")}
                    />
                  </FormControl>
                  <FormControl id="exam-results" gridColumn="span 2">
                    <FormLabel color={useColorModeValue("gray.600", "gray.300")}>Resultados del Examen</FormLabel>
                    <Textarea
                      placeholder="Detalles del examen y observaciones"
                      bg={useColorModeValue("white", "gray.600")}
                      color={useColorModeValue("gray.800", "white")}
                    />
                  </FormControl>
              </SimpleGrid>
              <Flex justify="end" mt={4}>
                  <Button colorScheme="teal">
                    Agregar Examen
                  </Button>
              </Flex>
            </Box>
        </VStack>
    </Box>
);

export default ExamsSection;
