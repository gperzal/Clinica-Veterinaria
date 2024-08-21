import React, { useState } from 'react';
import {
  Box, Heading, VStack, Button, Step, StepIndicator, StepStatus, StepTitle, StepDescription, StepSeparator,
  Stepper, FormControl, FormLabel, Input, Select, SimpleGrid, Table, Thead, Tbody, Tr, Th, Td, TableCaption,
  TableContainer, HStack, IconButton, useToast, Text, Flex, Icon, Divider, InputGroup, InputLeftElement, useDisclosure
} from '@chakra-ui/react';
import { SearchIcon, DeleteIcon, EditIcon, ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import EditInventoryItemModal from '../../components/dashboard/EditInventoryItemModal';

const steps = [
  { title: "Información Básica", description: "Nombre, Categoría, etc." },
  { title: "Detalles del Producto", description: "Descripción, Fecha de Expiración, etc." },
  { title: "Inventario", description: "Cantidad disponible, SKU, etc." }
];

const InventoryPage = () => {
  const [step, setStep] = useState(0);
  const [inventoryItems, setInventoryItems] = useState([
    { id: 1, name: "Estetoscopio", category: "Herramientas Médicas", description: "Estetoscopio de alta precisión", expirationDate: "N/A", stock: 5, sku: "MED12345", status: "Activo" },
    { id: 2, name: "Vacuna Antirrábica", category: "Medicamentos", description: "Vacuna para prevenir la rabia", expirationDate: "2025-12-01", stock: 20, sku: "MED67890", status: "Activo" }
  ]);
  const toast = useToast();

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleItemDelete = (itemId) => {
    setInventoryItems(inventoryItems.filter(item => item.id !== itemId));
    toast({
      title: "Artículo eliminado.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const [selectedItem, setSelectedItem] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleEditClick = (item) => {
    setSelectedItem(item);
    onOpen();
  };

  const handleItemSave = (updatedItem) => {
    setInventoryItems(inventoryItems.map(item =>
      item.id === updatedItem.id ? updatedItem : item
    ));
  };

  return (
    <Box p={4}>
      <Heading fontSize="2xl" fontWeight="bold" mb={6}>
        Agregar Nuevo Artículo de Inventario
      </Heading>
      
      {/* Multi-Step Form */}
      <Stepper size="lg" index={step} orientation="horizontal">
        {steps.map((stepInfo, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus complete={<Box color="green.500" />} />
            </StepIndicator>
            <Box>
              <StepTitle>{stepInfo.title}</StepTitle>
              <StepDescription>{stepInfo.description}</StepDescription>
            </Box>
            <StepSeparator />
          </Step>
        ))}
      </Stepper>

      {/* Formulario dinámico basado en el paso actual */}
      <VStack spacing={4} mt={8}>
        {step === 0 && (
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="full">
            <FormControl>
              <FormLabel>Nombre del Artículo</FormLabel>
              <Input placeholder="Nombre del Artículo" />
            </FormControl>
            <FormControl>
              <FormLabel>Categoría</FormLabel>
              <Select placeholder="Selecciona la Categoría">
                <option value="Herramientas Médicas">Herramientas Médicas</option>
                <option value="Medicamentos">Medicamentos</option>
                <option value="Insumos">Insumos</option>
              </Select>
            </FormControl>
          </SimpleGrid>
        )}
        {step === 1 && (
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="full">
            <FormControl>
              <FormLabel>Descripción</FormLabel>
              <Input placeholder="Descripción del Artículo" />
            </FormControl>
            <FormControl>
              <FormLabel>Fecha de Expiración</FormLabel>
              <Input type="date" placeholder="Fecha de Expiración" />
            </FormControl>
            <FormControl>
              <FormLabel>Estado</FormLabel>
              <Select placeholder="Selecciona el Estado">
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </Select>
            </FormControl>
          </SimpleGrid>
        )}
        {step === 2 && (
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="full">
            <FormControl>
              <FormLabel>Stock</FormLabel>
              <Input placeholder="Cantidad en Inventario" />
            </FormControl>
            <FormControl>
              <FormLabel>SKU</FormLabel>
              <Input placeholder="SKU del Artículo" />
            </FormControl>
          </SimpleGrid>
        )}

        {/* Navegación entre pasos */}
        <HStack w="full" justify="space-between">
          <Button onClick={prevStep} disabled={step === 0}>
            Atrás
          </Button>
          <Button colorScheme="blue" onClick={nextStep} disabled={step === steps.length - 1}>
            Siguiente
          </Button>
        </HStack>
      </VStack>

      <Divider my={8} />

      <Heading fontSize="2xl" fontWeight="bold" mb={6}>
        Inventario Actual
      </Heading>

      {/* Filtros y Buscador */}
      <Flex mb={4} justify="space-between" align="center">
        <HStack spacing={4}>
          <FormControl maxW="300px">
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.600" />
              </InputLeftElement>
              <Input type="text" placeholder="Buscar Artículo" />
            </InputGroup>
          </FormControl>
          <FormControl maxW="200px">
            <Select placeholder="Filtrar por categoría">
              <option value="Herramientas Médicas">Herramientas Médicas</option>
              <option value="Medicamentos">Medicamentos</option>
              <option value="Insumos">Insumos</option>
            </Select>
          </FormControl>
          <FormControl maxW="200px">
            <Select placeholder="Filtrar por estado">
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </Select>
          </FormControl>
        </HStack>
      </Flex>

      {/* Tabla de Inventario */}
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Lista de artículos actualmente en el inventario</TableCaption>
          <Thead>
            <Tr>
              <Th>Nombre</Th>
              <Th>Categoría</Th>
              <Th>Descripción</Th>
              <Th>Fecha de Expiración</Th>
              <Th>Inventario</Th>
              <Th>Estado</Th>
              <Th>Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {inventoryItems.map(item => (
              <Tr key={item.id}>
                <Td>{item.name}</Td>
                <Td>{item.category}</Td>
                <Td>{item.description}</Td>
                <Td>{item.expirationDate}</Td>
                <Td>{item.stock}</Td>
                <Td>{item.status}</Td>
                <Td>
                  <HStack>
                    <IconButton
                      icon={<EditIcon />}
                      colorScheme="blue"
                      variant="outline"
                      onClick={() => handleEditClick(item)}
                    />
                    <IconButton
                      icon={<DeleteIcon />}
                      colorScheme="red"
                      variant="outline"
                      onClick={() => handleItemDelete(item.id)}
                    />
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {/* Paginación */}
      <Flex justify="space-between" align="center" mt={4}>
        <Text>Mostrando 1 a 5 de {inventoryItems.length} resultados</Text>
        <HStack>
          <IconButton icon={<ChevronLeftIcon />} />
          <IconButton icon={<ChevronRightIcon />} />
        </HStack>
      </Flex>

      {/* Modal de Edición */}
      <EditInventoryItemModal
        item={selectedItem}
        isOpen={isOpen}
        onClose={onClose}
        onSave={handleItemSave}
      />
    </Box>
  );
};

export default InventoryPage;
