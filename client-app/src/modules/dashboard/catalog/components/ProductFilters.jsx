import React, { useState } from 'react';
import { HStack, FormControl, Input, InputGroup, InputLeftElement, Select, Flex } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

const ProductFilters = ({ onSearch, onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState(true);

  // Manejar cambios en el campo de búsqueda
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);  
  };

  // Manejar cambios en los filtros
  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setCategory(value);
    onFilterChange({ category: value, status  });
  };

  const handleStatusChange = (e) => {
    const value = e.target.value === 'true'; 
    setStatus(value);
    onFilterChange({ category, status: value  }); 
  };

  return (
    <>
      {/* Filtros para versión escritorio (ocultos en móvil) */}
      <Flex display={{ base: 'none', md: 'flex' }} mb={4} justify="space-between" align="center">
        <HStack spacing={4}>
          {/* Búsqueda */}
          <FormControl maxW="300px">
            <InputGroup>
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
          </FormControl>

          {/* Filtro por categoría */}
          <FormControl maxW="200px">
            <Select value={category} onChange={handleCategoryChange} placeholder="Filtrar por categoría">
              <option value="Salud y Bienestar">Salud y Bienestar</option>
              <option value="Alimentos y Suplementos">Alimentos y Suplementos</option>
              <option value="Juguetes">Juguetes</option>
              <option value="Higiene y Cuidado">Higiene y Cuidado</option>
              <option value="Cama y Refugio">Cama y Refugio</option>
              <option value="Transporte">Transporte</option>
              <option value="Decoración y Muebles">Decoración y Muebles</option>
              <option value="Ropa y Accesorios">Ropa y Accesorios</option>
            </Select>
          </FormControl>

          {/* Filtro por estado */}
          <FormControl maxW="200px">
            <Select value={status}  onChange={handleStatusChange} >
              <option value="true" >Activo</option>
              <option value="false">Inactivo</option>
            </Select>
          </FormControl>
        </HStack>
      </Flex>
    </>
  );
};

export default ProductFilters;
