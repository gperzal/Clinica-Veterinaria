// src/modules/dashboard/catalog/hooks/useProductFilters.js

import { useState, useEffect } from 'react';

const useProductFilters = (products) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ category: '', status: undefined });
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Función para filtrar productos
  const filterProducts = () => {
    const { category, status } = filters;
    const filtered = products.filter((product) => {
      const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !category || product.category === category;
      const matchesStatus = status === undefined || product.status === status;
      return matchesSearchTerm && matchesCategory && matchesStatus;
    });
    setFilteredProducts(filtered);
  };

  // Efecto para filtrar productos cuando cambian los productos, el término de búsqueda o los filtros
  useEffect(() => {
    filterProducts();
    // eslint-disable-next-line
  }, [products, searchTerm, filters]);

  // Funciones para manejar búsqueda y filtros
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return {
    searchTerm,
    filters,
    filteredProducts,
    handleSearch,
    handleFilterChange,
  };
};

export default useProductFilters;
