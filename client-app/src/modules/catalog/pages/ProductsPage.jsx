// client-app/src/modules/catalog/pages/ProductsPage.jsx

import React, { useState, useEffect, useCallback } from 'react';
import { 
  Box, Container, Flex, SimpleGrid, VStack, Text, Input, 
  Button, IconButton, useDisclosure, Drawer, DrawerOverlay, DrawerContent, 
  DrawerHeader, DrawerBody, InputGroup, InputLeftElement,  
  Menu, MenuButton, MenuList, MenuItem, 
  RangeSlider, RangeSliderTrack, RangeSliderFilledTrack, RangeSliderThumb, 
  Skeleton, SkeletonText, HStack,  useColorModeValue,  NumberInput, NumberInputField, 
  Divider,
  Wrap, WrapItem, Tag, Icon, Checkbox, CloseButton
} from '@chakra-ui/react';
import { FiFilter, FiTag, FiDollarSign, FiStar } from 'react-icons/fi';
import { SearchIcon } from '@chakra-ui/icons';
import { FaSortAmountDown, FaThList } from 'react-icons/fa';
import ProductCard from '../../catalog/components/products/ProductCard';
import { productServices } from '../../dashboard/catalog/services/catalogService'; 
import CustomRatingIcon from '../../catalog/components/icons/CustomRatingIcon';

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState(''); 
  const [loading, setLoading] = useState(true);

  const { isOpen, onOpen, onClose } = useDisclosure();

  // Estados para filtros
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 200000]); 
  const [selectedRatings, setSelectedRatings] = useState([]); 

  const updateVisibleProducts = useCallback((page, perPage, filteredProducts) => {
    const startIndex = (page - 1) * perPage;
    const selectedProducts = filteredProducts.slice(startIndex, startIndex + perPage);
    setVisibleProducts(selectedProducts);
    setLoading(false);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await productServices.getProducts();
        // Convertir ratings a números
      const productsWithNumericRatings = response.data.map(product => ({
        ...product,
        rating: Number(product.rating),
      }));
      setProducts(productsWithNumericRatings);
      updateVisibleProducts(1, productsPerPage, productsWithNumericRatings);
      } catch (error) {
        console.error('Error al cargar productos:', error);
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [productsPerPage, updateVisibleProducts]);

  // Filtrar productos por los criterios seleccionados
  const filteredProducts = products
    .filter(product => 
      (selectedCategories.length === 0 || selectedCategories.includes(product.category)) &&
      (product.price >= priceRange[0] && product.price <= priceRange[1]) &&
      (selectedRatings.length === 0 || selectedRatings.some(rating => product.rating >= rating))
    )
    .filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      product.details.sku.toLowerCase().includes(searchTerm.toLowerCase())
    );

  useEffect(() => {
    updateVisibleProducts(currentPage, productsPerPage, filteredProducts);
  }, [currentPage, productsPerPage, searchTerm, updateVisibleProducts, filteredProducts]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleProductsPerPageChange = (perPage) => {
    setProductsPerPage(perPage);
    setCurrentPage(1); 
  };

  const handleSort = (criteria) => {
    let sortedProducts = [...filteredProducts];
    if (criteria === 'price-asc') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (criteria === 'price-desc') {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (criteria === 'rating') {
      sortedProducts.sort((a, b) => b.rating - a.rating);
    }
    setProducts(sortedProducts);
    updateVisibleProducts(currentPage, productsPerPage, sortedProducts);
  };

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Manejadores de filtro
  const handleCategoryToggle = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handlePriceChange = (value) => {
    setPriceRange(value);
  };

  const handleRatingToggle = (rating) => {
    if (selectedRatings.includes(rating)) {
      setSelectedRatings(selectedRatings.filter(r => r !== rating));
    } else {
      setSelectedRatings([...selectedRatings, rating]);
    }
  };

  const handlePriceInputChange = (index, value) => {
    const newRange = [...priceRange];
    newRange[index] = value === '' ? 0 : Number(value);
    setPriceRange(newRange);
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 200000]);
    setSelectedRatings([]);
  };

  return (
    <Container maxW="8xl" py={8}>
      <Flex justify="space-between" align="center" mb={6} direction={{ base: 'column', md: 'row' }}>
        {/* Buscador y Botones */}
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
          <InputGroup maxW="300px">
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.600" />
            </InputLeftElement>
            <Input
              placeholder="Buscar por SKU o Nombre"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Flex>
      </Flex>

      {/* Lista de productos o Skeletons */}
      <Box>
        <Flex justify="space-between"  align="center" mt={8} direction={{ base: 'column', md: 'row' }}>
          {/* Texto mostrando la cantidad de productos */}
          <Text mb={4}>Mostrando {visibleProducts.length} de {filteredProducts.length} productos</Text>
          
          {/* Paginador */}
          {!loading && (
            <Flex justify="center" align="center">
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
          )}
        </Flex>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
        {loading
            ? Array(10) 
              .fill(0)
              .map((_, index) => (
                <Box
                  key={index}
                  padding="6"
                  boxShadow="lg"
                  bg={useColorModeValue('white', 'gray.800')}
                  borderWidth="1px"
                  rounded="lg"
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                  height="100%"
                >
                  {/* Imagen del producto */}
                  <Skeleton height="200px" borderRadius="lg" />

                  {/* Título del producto */}
                  <SkeletonText mt="4" noOfLines={1} width="80%" />

                  {/* Descripción simulada */}
                  <SkeletonText mt="4" noOfLines={2} spacing="4" width="90%" />

                  {/* Simular Rating */}
                  <SkeletonText mt="4" noOfLines={1} width="60%" />

                  {/* Simular precio */}
                  <Skeleton mt="4" height="20px" width="30%" />

                  {/* Botón de Agregar al Carrito */}
                  <Skeleton mt="4" height="40px" borderRadius="md" />
                </Box>
              ))
            : visibleProducts.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
        </SimpleGrid>

        {/* Paginador */}
        {!loading && (
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
        )}
      </Box>

      {/* Drawer para los Filtros */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">
            <Flex justifyContent="space-between" alignItems="center">
              <Text fontSize="xl" fontWeight="bold">Filtros</Text>
              <IconButton icon={<CloseButton />} onClick={onClose} aria-label="Cerrar" variant="ghost" />
            </Flex>
          </DrawerHeader>
          <DrawerBody>
            <VStack align="start" spacing={5} mt={4}>
              {/* Categoría */}
  
                  <Box flex="1" textAlign="left" display="flex" alignItems="center">
                    <Icon as={FiTag} mr={2} />
                    <Text fontSize="lg">Categoría</Text>
                  </Box>
                  <Wrap>
                    {['Medicamentos', 'Comida', 'Juguetes'].map(category => (
                      <WrapItem key={category}>
                        <Tag
                          size="lg"
                          variant={selectedCategories.includes(category) ? 'solid' : 'outline'}
                          colorScheme="blue"
                          cursor="pointer"
                          onClick={() => handleCategoryToggle(category)}
                        >
                          {category}
                        </Tag>
                      </WrapItem>
                    ))}
                  </Wrap>
              {/* Rango de Precio */}
              <Divider />
                  <Box flex="1" textAlign="left" display="flex" alignItems="center">
                    <Icon as={FiDollarSign} mr={2} />
                    <Text fontSize="lg">Rango de Precio</Text>
                  </Box>
                  <VStack align="stretch" spacing={4}>
                    <HStack spacing={4}>
                      <NumberInput
                        maxW="100px"
                        min={0}
                        max={200000}
                        value={priceRange[0]}
                        onChange={(value) => handlePriceInputChange(0, value)}
                      >
                        <NumberInputField placeholder="Mínimo" />
                      </NumberInput>
                      <Text>-</Text>
                      <NumberInput
                        maxW="100px"
                        min={0}
                        max={200000}
                        value={priceRange[1]}
                        onChange={(value) => handlePriceInputChange(1, value)}
                      >
                        <NumberInputField placeholder="Máximo" />
                      </NumberInput>
                    </HStack>
                    <RangeSlider
                      aria-label={['Precio mínimo', 'Precio máximo']}
                      min={0}
                      max={200000}
                      step={1000}
                      value={priceRange}
                      onChange={handlePriceChange}
                      colorScheme="blue"
                    >
                      <RangeSliderTrack>
                        <RangeSliderFilledTrack />
                      </RangeSliderTrack>
                      <RangeSliderThumb index={0} />
                      <RangeSliderThumb index={1} />
                    </RangeSlider>
                  </VStack>
                  <Divider />
              {/* Rating */}
      
              <Box flex="1" textAlign="left" display="flex" alignItems="center">
                    <Icon as={FiStar} mr={2} />
                    <Text fontSize="lg">Rating</Text>
              </Box> 
                  <Box>
                <Text fontSize="lg" mb={2}>Rating</Text>
                <VStack align="start">
                  {[5, 4, 3].map((ratingValue) => (
                    <HStack key={ratingValue}>
                      <Checkbox
                        isChecked={selectedRatings.includes(ratingValue)}
                        onChange={() => handleRatingToggle(ratingValue)}
                      />
                      <CustomRatingIcon rating={ratingValue} />
                      <Text fontSize="sm">&nbsp;{ratingValue} estrellas</Text>
                    </HStack>
                  ))}
                </VStack>
              </Box>

            {/* Botón de Limpiar Filtros */}
            <Button colorScheme="red" variant="outline" onClick={handleClearFilters} w="full" mt={4}>
              Limpiar Filtros
            </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Container>
  );
}

export default ProductsPage;
