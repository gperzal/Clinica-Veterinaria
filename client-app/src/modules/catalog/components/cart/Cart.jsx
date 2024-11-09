// client-app/src/modules/catalog/components/cart/Cart.jsx
import React, { useContext } from 'react';
import { Box, Text, Button, VStack } from '@chakra-ui/react';
import { CartContext } from '../../../context/CartContext';
import CartItem from './CartItem';

const Cart = () => {
  const { cartItems, clearCart, removeFromCart, updateQuantity } = useContext(CartContext);

  return (
    <Box w="full" maxW="md" p={4} borderWidth="1px" borderRadius="lg" boxShadow="lg">
      <Text fontSize="2xl" fontWeight="bold">Carrito de Compras</Text>
      {cartItems.length === 0 ? (
        <Text mt={4}>Tu carrito está vacío.</Text>
      ) : (
        <VStack spacing={4} align="stretch">
          {cartItems.map((item) => (
            <CartItem
              key={item._id}
              {...item}
              onRemove={() => removeFromCart(item._id, item.variation)}
              onUpdateQuantity={(quantity) => updateQuantity(item._id, quantity, item.variation)}
            />
          ))}
        </VStack>
      )}
      <Button mt={4} w="full" colorScheme="blue" onClick={clearCart}>Vaciar Carrito</Button>
    </Box>
  );
};

export default Cart;
