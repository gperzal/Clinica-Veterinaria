// src/components/catalog/Cart/Cart.jsx
import React, { useContext } from 'react';
import { Box, Text, Button } from '@chakra-ui/react';
import { CartContext } from '../../../context/CartContext';
import CartItem from './CartItem';

const Cart = () => {
  const { cartItems, clearCart } = useContext(CartContext);

  return (
    <Box w="full" maxW="md" p={4} borderWidth="1px" borderRadius="lg" boxShadow="lg">
      <Text fontSize="2xl" fontWeight="bold">Carrito de Compras</Text>
      {cartItems.length === 0 ? (
        <Text mt={4}>Tu carrito está vacío.</Text>
      ) : (
        cartItems.map((item, index) => (
          <CartItem key={index} item={item} />
        ))
      )}
      <Button mt={4} w="full" colorScheme="blue" onClick={clearCart}>Vaciar Carrito</Button>
    </Box>
  );
};

export default Cart;
