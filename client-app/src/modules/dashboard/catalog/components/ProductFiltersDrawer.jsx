import React, { useState } from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  VStack,
  HStack,
  Text,
  useDisclosure,
  IconButton,
  Box,
  Divider,
  useColorModeValue,
  Checkbox,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Flex,
} from '@chakra-ui/react';
import { FaFilter } from 'react-icons/fa';

const ProductFiltersDrawer = ({ onFilterChange }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: [0, 1000],
    inStock: false
  });

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const handleCategoryChange = (category) => {
    const updatedCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    setFilters({ ...filters, categories: updatedCategories });
  };

  const handlePriceRangeChange = (newRange) => {
    setFilters({ ...filters, priceRange: newRange });
  };

  const handleCheckboxChange = (key) => {
    setFilters({ ...filters, [key]: !filters[key] });
  };

  const applyFilters = () => {
    onFilterChange(filters);
    onClose();
  };

  const resetFilters = () => {
    setFilters({
      categories: [],
      priceRange: [0, 1000],
      status: false
    });
  };

  return (
    <>
      <IconButton
        icon={<FaFilter />}
        onClick={onOpen}
        aria-label="Open filters"
        colorScheme="blue"
        variant="outline"
      />
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
        <DrawerOverlay />
        <DrawerContent bg={bgColor}>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px" borderColor={borderColor}>
            Filtros de Productos
          </DrawerHeader>

          <DrawerBody>
            <VStack spacing={6} align="stretch" py={4}>
              <Box>
                <Text fontWeight="bold" mb={2}>Categorías</Text>
                <VStack align="start">
                  {['Salud y Bienestar', 'Alimentos y Suplementos', 'Juguetes', 
                  'Higiene y Cuidado', 'Cama y Refugio', 'Transporte', 'Decoración y Muebles', 
                  'Deportes'].map((category) => (
                    <Checkbox
                      key={category}
                      isChecked={filters.categories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                    >
                      {category}
                    </Checkbox>
                  ))}
                </VStack>
              </Box>
              <Divider />
              <Box>
                <Text fontWeight="bold" mb={2}>Rango de Precio</Text>
                <RangeSlider
                  aria-label={['min', 'max']}
                  min={0}
                  max={1000}
                  step={10}
                  value={filters.priceRange}
                  onChange={handlePriceRangeChange}
                >
                  <RangeSliderTrack>
                    <RangeSliderFilledTrack />
                  </RangeSliderTrack>
                  <RangeSliderThumb index={0} />
                  <RangeSliderThumb index={1} />
                </RangeSlider>
                <Flex justify="space-between" mt={2}>
                  <Text>${filters.priceRange[0]}</Text>
                  <Text>${filters.priceRange[1]}</Text>
                </Flex>
              </Box>

              <Divider />

              <VStack align="start">
                <Checkbox
                  isChecked={filters.status}
                  onChange={() => handleCheckboxChange(true)}
                >
                  En Stock
                </Checkbox>
                
              </VStack>
            </VStack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px" borderColor={borderColor}>
            <HStack spacing={4} width="100%">
              <Button variant="outline" mr={3} onClick={resetFilters} width="50%">
                Reiniciar
              </Button>
              <Button colorScheme="blue" onClick={applyFilters} width="50%">
                Aplicar Filtros
              </Button>
            </HStack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ProductFiltersDrawer;