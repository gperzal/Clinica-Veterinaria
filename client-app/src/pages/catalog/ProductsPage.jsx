import React, { useState, useEffect, useCallback } from 'react';
import { 
  Box, Container, Flex, SimpleGrid, VStack, Text,  Input, 
   Button, IconButton, useDisclosure, Drawer, DrawerOverlay, DrawerContent, 
  DrawerHeader, DrawerBody, CloseButton, InputGroup, InputLeftElement,  
  Menu, MenuButton, MenuList, MenuItem,  
  Checkbox, Slider, CheckboxGroup, SliderTrack, SliderFilledTrack, SliderThumb
} from '@chakra-ui/react';
import { FiFilter } from 'react-icons/fi';
import { SearchIcon } from '@chakra-ui/icons';
import { FaSortAmountDown, FaThList } from 'react-icons/fa';
import ProductCard from '../../components/catalog/products/ProductCard';
import productsData from '../../data/productsData.json';


function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(10);
  const [totalProducts, setTotalProducts] = useState(0);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const updateVisibleProducts = useCallback((page, perPage) => {
    const startIndex = (page - 1) * perPage;
    const selectedProducts = products.slice(startIndex, startIndex + perPage);
    setVisibleProducts(selectedProducts);
  }, [products]);

  useEffect(() => {
    setProducts(productsData);
    setTotalProducts(productsData.length);
    updateVisibleProducts(1, productsPerPage);
  }, [productsPerPage, updateVisibleProducts]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    updateVisibleProducts(newPage, productsPerPage);
  };

  const handleProductsPerPageChange = (perPage) => {
    setProductsPerPage(perPage);
  };

  const handleSort = (criteria) => {
    let sortedProducts = [...products];
    if (criteria === 'price-asc') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (criteria === 'price-desc') {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (criteria === 'rating') {
      sortedProducts.sort((a, b) => b.rating - a.rating);
    }
    setProducts(sortedProducts);
    updateVisibleProducts(currentPage, productsPerPage);
  };

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  return (
    <Container maxW="8xl" py={8}>
      <Flex justify="space-between" align="center" mb={6} direction={{ base: 'column', md: 'row' }}>
        {/* Buscador a la derecha y los botones a la izquierda */}
        <Flex w="full" justifyContent="space-between" alignItems="center" mb={{ base: 4, md: 0 }}>
          {/* Botones de Filtro, Ordenar y Visualizar */}
          <Flex alignItems="center">
            <IconButton icon={<FiFilter />} aria-label="Open Filters" onClick={onOpen} mr={1} />
            
            <Menu>
              <MenuButton as={IconButton} icon={<FaSortAmountDown />} aria-label="Ordenar por" mr={1} />
              <MenuList>
                <MenuItem onClick={() => handleSort('price-asc')}>Precio: Menor a Mayor</MenuItem>
                <MenuItem onClick={() => handleSort('price-desc')}>Precio: Mayor a Menor</MenuItem>
                <MenuItem onClick={() => handleSort('rating')}>Rating</MenuItem>
              </MenuList>
            </Menu>

            <Menu>
              <MenuButton as={IconButton} icon={<FaThList />} aria-label="Visualizar Cantidad" mr={2} />
              <MenuList>
                <MenuItem onClick={() => handleProductsPerPageChange(5)}>5</MenuItem>
                <MenuItem onClick={() => handleProductsPerPageChange(10)}>10</MenuItem>
                <MenuItem onClick={() => handleProductsPerPageChange(25)}>25</MenuItem>
              </MenuList>
            </Menu>
          </Flex>

          {/* Buscador */}
          <InputGroup maxW="300px" >
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.600" />
            </InputLeftElement>
            <Input placeholder="Buscar por SKU o Nombre" />
          </InputGroup>
        </Flex>
      </Flex>

      {/* Lista de productos */}
      <Box>
        <Text mb={4}>Mostrando {visibleProducts.length} de {totalProducts} productos</Text>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
          {visibleProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </SimpleGrid>

        {/* Paginador */}
        <Flex justify="center" align="center" mt={8}>
          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              colorScheme={currentPage === i + 1 ? 'blue' : 'gray'}
              mx={1}
            >
              {i + 1}
            </Button>
          ))}
        </Flex>
      </Box>

      {/* Drawer para los Filtros */}
      <Drawer isOpen={isOpen} placement={{ base: 'left', md: 'right' }} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            Filtros
            <CloseButton onClick={onClose} position="absolute" right="8px" top="8px" />
          </DrawerHeader>
          <DrawerBody>
            <VStack align="start" spacing={5}>
              <Box>
                <Text fontSize="lg" mb={2}>Categoría</Text>
                <CheckboxGroup colorScheme="blue">
                  <VStack align="start">
                    <Checkbox value="Medicamentos">Medicamentos</Checkbox>
                    <Checkbox value="Comida">Comida</Checkbox>
                    <Checkbox value="Juguetes">Juguetes</Checkbox>
                  </VStack>
                </CheckboxGroup>
              </Box>
              <Box>
                <Text fontSize="lg" mb={2}>Rango de Precio</Text>
                <Slider aria-label="slider-ex-1" defaultValue={30} min={0} max={100}>
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
              </Box>
              <Box>
                <Text fontSize="lg" mb={2}>Rating</Text>
                <CheckboxGroup colorScheme="blue">
                  <VStack align="start">
                    <Checkbox value="4">4 estrellas y más</Checkbox>
                    <Checkbox value="3">3 estrellas y más</Checkbox>
                    <Checkbox value="2">2 estrellas y más</Checkbox>
                  </VStack>
                </CheckboxGroup>
              </Box>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Container>
  );
}

export default ProductsPage;