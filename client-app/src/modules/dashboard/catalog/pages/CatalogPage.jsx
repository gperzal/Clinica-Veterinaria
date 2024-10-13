// src/modules/dashboard/catalog/pages/CatalogPage.jsx

import React, { useState } from 'react';
import {
  Box, Heading, Flex, Text, HStack, Divider,
  useBreakpointValue, Icon, Spinner, Center, useDisclosure,
} from '@chakra-ui/react';
import { FaBoxOpen } from 'react-icons/fa';
import AddProductForm from '../components/AddProductForm';
import ProductTable from '../components/ProductTable';
import ProductSearchAndFilter from '../components/ProductSearchAndFilter';
import EditProductModal from '../components/EditProductModal';
import ProductFilters from '../components/ProductFilters';
import Paginator from '../components/Paginator';
import useProducts from '../hooks/useProducts';
import useProductFilters from '../hooks/useProductFilters';
import usePagination from '../hooks/usePagination';

const CatalogPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [step, setStep] = useState(0);

  const { products, loading, createProduct, updateProduct, deleteProduct } = useProducts();

  const {
    searchTerm,
    filteredProducts,
    handleSearch,
    handleFilterChange,
  } = useProductFilters(products);

  const productsPerPage = 5;
  const {
    currentPage,
    totalPages,
    paginatedItems: paginatedProducts,
    handlePageChange,
  } = usePagination(filteredProducts, productsPerPage);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    onOpen();
  };

  return (
    <Box p={4}>
      <Heading fontSize="2xl" fontWeight="bold" mb={6}>Agregar Nuevo Producto</Heading>

      <AddProductForm step={step} setStep={setStep} onProductCreate={createProduct} />


      <Divider my={8} />
      <HStack>
        <Icon as={FaBoxOpen} w={10} h={10} color="blue.500" mr={2} mb={6} />
        <Heading fontSize="2xl" fontWeight="bold" mb={6}>Productos en el Catálogo</Heading>
      </HStack>

      {loading ? (
        <Center>
          <Text>Buscando: {searchTerm}</Text>
          <Spinner size="xl" />
        </Center>
      ) : (
        <>
          {isMobile ? (
            <ProductSearchAndFilter onSearch={handleSearch} onFilterChange={handleFilterChange} />
          ) : (
            <ProductFilters onSearch={handleSearch} onFilterChange={handleFilterChange} />
          )}

          <ProductTable
            products={paginatedProducts}
            handleEditClick={handleEditClick}
            handleProductDelete={deleteProduct}
          />

          <Flex justify="space-between" align="center" mt={4}>
            <Text>Mostrando {paginatedProducts.length} de {filteredProducts.length} resultados</Text>
            <HStack>
              <Paginator currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </HStack>
          </Flex>
        </>
      )}

      {selectedProduct && (
        <EditProductModal
          product={selectedProduct}
          isOpen={isOpen}
          onClose={onClose}
          onSave={updateProduct}
        />
      )}
    </Box>
  );
};

export default CatalogPage;
