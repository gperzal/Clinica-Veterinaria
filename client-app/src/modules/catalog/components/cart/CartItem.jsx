// src/components/catalog/Cart/CartItem.jsx
import React, { useContext } from 'react';
import { Box, Flex, Text, Button } from '@chakra-ui/react';
import { CartContext } from '../../../context/CartContext';

const CartItem = ({ item }) => {
  const { removeFromCart } = useContext(CartContext);

  return (
    <Flex justify="space-between" align="center" mt={4}>
      <Text>{item.name}</Text>
      <Box>
        <Text fontWeight="bold">£{item.price.toFixed(2)}</Text>
        <Button colorScheme="red" size="sm" onClick={() => removeFromCart(item.id)}>
          Eliminar
        </Button>
      </Box>
    </Flex>
  );
};

export default CartItem;
