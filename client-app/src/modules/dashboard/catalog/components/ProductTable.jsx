// src/modules/dashboard/catalog/components/ProductTable.jsx
import React from 'react';
import {
  Box, Text, VStack, HStack, Icon, Button, useBreakpointValue,
  Table, Thead, Tbody, Tr, Th, Td, TableContainer, TableCaption, 
  IconButton
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { FaPaw } from 'react-icons/fa';

const ProductCardMobile = ({ product, onEdit, onDelete }) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} mb={4} w="full" mt={4}>
      <VStack align="start" spacing={2}>
        <Text fontSize="lg" fontWeight="bold">{product.name}</Text>
        <Text>Categoría: {product.category}</Text>
        <Text>Precio: {product.price}</Text>
        <Text>Stock: {product.stock}</Text>
        <HStack>
          {[1, 2, 3, 4, 5].map((num) => (
            <Icon key={num} as={FaPaw} color={num <= product.rating ? "blue.500" : "gray.300"} boxSize={4} />
          ))}
        </HStack>
        <HStack spacing={2}>
          <Button size="sm" colorScheme="blue" onClick={onEdit}>Editar</Button>
          <Button size="sm" colorScheme="red" onClick={onDelete}>Eliminar</Button>
        </HStack>
      </VStack>
    </Box>
  );
};

const ProductTable = ({ products, handleEditClick, handleProductDelete }) => {

  const isMobile = useBreakpointValue({ base: true, md: false });
  if (isMobile) {
    return (
      <>
        {products.map((product) => (
          <ProductCardMobile
            key={product._id}
            product={product}
            onEdit={() => handleEditClick(product)}
            onDelete={() => handleProductDelete(product.id)}
          />
        ))}
      </>
    );
  }

  return (
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
            <Tr key={product._id}>
              <Td>{product.name}</Td>
              <Td>{product.category}</Td>
              <Td>{product.price}</Td>
              <Td>{product.details.stock}</Td>
              <Td>
                <HStack>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <Icon key={num} as={FaPaw} color={num <= product.rating ? "blue.500" : "gray.300"} boxSize={4} />
                  ))}
                </HStack>
              </Td>
              <Td>{product.status ? 'Disponible' : 'No Disponible'}</Td>

              <Td>
                <HStack>
                  <IconButton icon={<EditIcon />} colorScheme="blue" variant="outline" onClick={() => handleEditClick(product)} />
                  <IconButton icon={<DeleteIcon />} colorScheme="red" variant="outline" onClick={() => handleProductDelete(product._id)} />
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default ProductTable;
