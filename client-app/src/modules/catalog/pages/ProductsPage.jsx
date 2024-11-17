import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Container,
  Flex,
  SimpleGrid,
  VStack,
  Text,
  Input,
  Button,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Skeleton,
  HStack,
  useColorModeValue,
  NumberInput,
  NumberInputField,
  Divider,
  Wrap,
  WrapItem,
  Tag,
  Icon,
  Checkbox,
  CloseButton,
} from '@chakra-ui/react';
import { FiFilter, FiTag, FiDollarSign, FiStar } from 'react-icons/fi';
import { SearchIcon } from '@chakra-ui/icons';
import { FaSortAmountDown, FaThList } from 'react-icons/fa';
import ProductCard from '../../catalog/components/products/ProductCard';
import { productServices } from '../../dashboard/catalog/services/catalogService';

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

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 200000]);
    setSelectedRatings([]);
    setSearchTerm('');
    setCurrentPage(1); // Volver a la primera página después de limpiar los filtros
    updateVisibleProducts(1, productsPerPage, products); // Mostrar todos los productos disponibles
  };

  return (
    <Container maxW="8xl" py={8}>
      <Flex justify="space-between" align="center" mb={6} direction={{ base: 'column', md: 'row' }}>
        {/* Buscador y Botones */}
        <Flex w="full" justifyContent="space-between" alignItems="center" mb={{ base: 4, md: 0 }}>
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

      <Box>
        <Text mb={4}>Mostrando {visibleProducts.length} de {filteredProducts.length} productos</Text>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
          {loading
            ? Array(10).fill(0).map((_, index) => (
                <Skeleton key={index} height="300px" borderRadius="lg" />
              ))
            : visibleProducts.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
        </SimpleGrid>
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
              <Box>
                <Text fontSize="lg" mb={2}>Categorías</Text>
                <Wrap>
                  {['Medicamentos', 'Comida', 'Juguetes'].map(category => (
                    <WrapItem key={category}>
                      <Tag
                        size="lg"
                        variant={selectedCategories.includes(category) ? 'solid' : 'outline'}
                        colorScheme="blue"
                        cursor="pointer"
                        onClick={() => {
                          if (selectedCategories.includes(category)) {
                            setSelectedCategories(selectedCategories.filter(c => c !== category));
                          } else {
                            setSelectedCategories([...selectedCategories, category]);
                          }
                        }}
                      >
                        {category}
                      </Tag>
                    </WrapItem>
                  ))}
                </Wrap>
              </Box>
              {/* Rango de Precio */}
              <Divider />
              <Box>
                <Text fontSize="lg" mb={2}>Rango de Precio</Text>
                <VStack align="stretch" spacing={4}>
                  <HStack spacing={4}>
                    <NumberInput
                      maxW="100px"
                      min={0}
                      max={200000}
                      value={priceRange[0]}
                      onChange={(value) => {
                        const newRange = [...priceRange];
                        newRange[0] = Number(value);
                        setPriceRange(newRange);
                      }}
                    >
                      <NumberInputField placeholder="Mínimo" />
                    </NumberInput>
                    <Text>-</Text>
                    <NumberInput
                      maxW="100px"
                      min={0}
                      max={200000}
                      value={priceRange[1]}
                      onChange={(value) => {
                        const newRange = [...priceRange];
                        newRange[1] = Number(value);
                        setPriceRange(newRange);
                      }}
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
                    onChange={(value) => setPriceRange(value)}
                  >
                    <RangeSliderTrack>
                      <RangeSliderFilledTrack />
                    </RangeSliderTrack>
                    <RangeSliderThumb index={0} />
                    <RangeSliderThumb index={1} />
                  </RangeSlider>
                </VStack>
              </Box>
              {/* Rating */}
              <Divider />
              <Box>
                <Text fontSize="lg" mb={2}>Rating</Text>
                <VStack align="start">
                  {[5, 4, 3].map(ratingValue => (
                    <HStack key={ratingValue}>
                      <Checkbox
                        isChecked={selectedRatings.includes(ratingValue)}
                        onChange={() => {
                          if (selectedRatings.includes(ratingValue)) {
                            setSelectedRatings(selectedRatings.filter(r => r !== ratingValue));
                          } else {
                            setSelectedRatings([...selectedRatings, ratingValue]);
                          }
                        }}
                      />
                      <Text fontSize="sm">{ratingValue} estrellas</Text>
                    </HStack>
                  ))}
                </VStack>
              </Box>
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
