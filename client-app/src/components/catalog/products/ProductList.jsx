// src/components/catalog/products/ProductList.jsx
import React from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import ProductItem from './ProductItem';

const ProductList = ({ products }) => {
  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={5}>
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </SimpleGrid>
  );
};

export default ProductList;
