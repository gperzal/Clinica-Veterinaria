// src/modules/dashboard/catalog/components/ProductSearchAndFilter.jsx

import React, { useState } from 'react';
import { Box, InputGroup, InputLeftElement, Input } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import ProductFiltersDrawer from './ProductFiltersDrawer';

const ProductSearchAndFilter = ({ onSearch, onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value); // Envía el término de búsqueda al padre
  };

  return (
    <Box mb={4} display="flex" alignItems="center" justifyContent="space-between">
      {/* Campo de búsqueda visible en todas las versiones */}
      <InputGroup maxW="300px" mr={4}>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.600" />
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Buscar Producto"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </InputGroup>

      {/* Botón de filtros para móvil */}
      <ProductFiltersDrawer onFilterChange={onFilterChange} />
    </Box>
  );
};

export default ProductSearchAndFilter;

