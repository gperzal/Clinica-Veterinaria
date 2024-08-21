import React, { useState } from 'react';
import {
  Box, Heading, VStack, Button, Step, StepIndicator, StepStatus, StepTitle, StepDescription, StepSeparator,
  Stepper, FormControl, FormLabel, Input, Select, SimpleGrid, Table, Thead, Tbody, Tr, Th, Td, TableCaption,
  TableContainer, HStack, IconButton, useToast, Text, Flex, Icon, Divider, InputGroup, InputLeftElement, useDisclosure
} from '@chakra-ui/react';
import { SearchIcon, DeleteIcon, EditIcon, ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { FaPaw } from 'react-icons/fa';
import EditProductModal from '../../components/dashboard/EditProductModal';

const steps = [
  { title: "Información Básica", description: "Nombre, Categoría, etc." },
  { title: "Detalles del Producto", description: "Descripción, Precios, etc." },
  { title: "Inventario", description: "Cantidad disponible, SKU, etc." },
  { title: "Imágenes", description: "Subir imágenes del producto." }
];

const CatalogPage = () => {
  const [step, setStep] = useState(0);
  const [products, setProducts] = useState([
    { id: 1, name: "Producto 1", category: "Categoría 1", price: "$10.00", stock: 20, rating: 4, status: "Activo" , image: "https://via.placeholder.com/150" },
    { id: 2, name: "Producto 2", category: "Categoría 2", price: "$15.00", stock: 35, rating: 5, status: "Inactivo" },
    { id: 3, name: "Producto 3", category: "Categoría 3", price: "$25.00", stock: 10, rating: 3, status: "Activo" }
  ]);
  const toast = useToast();

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleProductDelete = (productId) => {
    setProducts(products.filter(product => product.id !== productId));
    toast({
      title: "Producto eliminado.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const [selectedProduct, setSelectedProduct] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    onOpen();
  };

  const handleProductSave = (updatedProduct) => {
    setProducts(products.map(product =>
      product.id === updatedProduct.id ? updatedProduct : product
    ));
  };

  return (
    <Box p={4}>
      <Heading fontSize="2xl" fontWeight="bold" mb={6}>
        Agregar Nuevo Producto
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
              <FormLabel>Nombre del Producto</FormLabel>
              <Input placeholder="Nombre del Producto" />
            </FormControl>
            <FormControl>
              <FormLabel>Categoría</FormLabel>
              <Select placeholder="Selecciona la Categoría">
                <option value="cat1">Categoría 1</option>
                <option value="cat2">Categoría 2</option>
                <option value="cat3">Categoría 3</option>
              </Select>
            </FormControl>
          </SimpleGrid>
        )}
        {step === 1 && (
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="full">
            <FormControl>
              <FormLabel>Precio</FormLabel>
              <Input placeholder="Precio" />
            </FormControl>
            <FormControl>
              <FormLabel>Descripción</FormLabel>
              <Input placeholder="Descripción del Producto" />
            </FormControl>
            <FormControl>
              <FormLabel>Rating</FormLabel>
              <HStack>
                {[1, 2, 3, 4, 5].map((num) => (
                  <Icon key={num} as={FaPaw} color={num <= 4 ? "blue.500" : "gray.300"} boxSize={6} />
                ))}
              </HStack>
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
              <Input placeholder="SKU del Producto" />
            </FormControl>
          </SimpleGrid>
        )}
        {step === 3 && (
          <FormControl>
            <FormLabel>Imágenes del Producto</FormLabel>
            <Input type="file" multiple />
          </FormControl>
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
        Productos en el Catálogo
      </Heading>

      {/* Filtros y Buscador */}
      <Flex mb={4} justify="space-between" align="center">
        <HStack spacing={4}>
        <FormControl maxW="300px">
            <InputGroup>
            <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.600" />
              </InputLeftElement>
              <Input type="text" placeholder="Buscar Producto" />
            </InputGroup>
          </FormControl>
          <FormControl maxW="200px">
            <Select placeholder="Filtrar por categoría">
              <option value="cat1">Categoría 1</option>
              <option value="cat2">Categoría 2</option>
              <option value="cat3">Categoría 3</option>
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

      {/* Tabla de productos */}
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Lista de productos actualmente en el catálogo</TableCaption>
          <Thead>
            <Tr>
              <Th>Nombre</Th>
              <Th>Categoría</Th>
              <Th>Precio</Th>
              <Th>Inventario</Th>
              <Th>Rating</Th>
              <Th>Estado</Th>
              <Th>Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {products.map(product => (
              <Tr key={product.id}>
                <Td>{product.name}</Td>
                <Td>{product.category}</Td>
                <Td>{product.price}</Td>
                <Td>{product.stock}</Td>
                <Td>
                  <HStack>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <Icon key={num} as={FaPaw} color={num <= product.rating ? "blue.500" : "gray.300"} boxSize={4} />
                    ))}
                  </HStack>
                </Td>
                <Td>{product.status}</Td>
                <Td>
                  <HStack>
                  <IconButton
                      icon={<EditIcon />}
                      colorScheme="blue"
                      variant="outline"
                      onClick={() => handleEditClick(product)}
                    />
                    <IconButton
                      icon={<DeleteIcon />}
                      colorScheme="red"
                      variant="outline"
                      onClick={() => handleProductDelete(product.id)}
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
        <Text>Mostrando 1 a 5 de {products.length} resultados</Text>
        <HStack>
          <IconButton icon={<ChevronLeftIcon />} />
          <IconButton icon={<ChevronRightIcon />} />
        </HStack>
      </Flex>

      {/* Modal de Edición */}
      <EditProductModal
        product={selectedProduct}
        isOpen={isOpen}
        onClose={onClose}
        onSave={handleProductSave}
      />
    </Box>
  );
};

export default CatalogPage;
