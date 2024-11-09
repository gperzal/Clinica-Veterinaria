// client-app/src/modules/catalog/components/cart/CartOrderSummary.jsx
import React, { useState } from 'react';
import { 
  Box, Stack, Text, Divider, Button, Input, 
  Flex, useColorModeValue, Alert, AlertIcon 
} from '@chakra-ui/react';

const CartOrderSummary = ({ subtotal = 0, shippingCost = 0 }) => {
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [discount, setDiscount] = useState(0);

  const handleApplyCoupon = () => {
    if (couponCode.trim().toUpperCase() === 'DISCOUNT10') {
      setDiscount(subtotal * 0.1);
      setCouponError('');
    } else {
      setCouponError('Cupón inválido');
      setDiscount(0);
    }
  };

  const total = subtotal + shippingCost - discount;

  return (
    <Box 
      w="full" 
      p="6" 
      mt={16} 
      borderWidth="1px" 
      borderRadius="lg" 
      shadow="md" 
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing="4">
        <Text fontSize="xl" fontWeight="bold" textAlign="center">
          Resumen del Pedido
        </Text>
        <Divider />

        <Stack spacing="2">
          <Flex justify="space-between">
            <Text>Subtotal</Text>
            <Text fontWeight="semibold">${subtotal.toLocaleString()}</Text>
          </Flex>
          
          {discount > 0 && (
            <Flex justify="space-between" color="green.500">
              <Text>Descuento</Text>
              <Text fontWeight="semibold">-${discount.toLocaleString()}</Text>
            </Flex>
          )}
          
          {shippingCost > 0 && (
            <Flex justify="space-between">
              <Text>Envío</Text>
              <Text fontWeight="semibold">${shippingCost.toLocaleString()}</Text>
            </Flex>
          )}
          
          <Divider />
          
          <Flex justify="space-between" fontSize="lg" fontWeight="bold">
            <Text>Total</Text>
            <Text>${total.toLocaleString()}</Text>
          </Flex>
        </Stack>

        {/* Cupón de Descuento */}
        <Stack spacing="2" mt="4">
          <Input 
            placeholder="Código de Descuento" 
            variant="filled"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
          />
          <Button 
            colorScheme="teal"
            onClick={handleApplyCoupon}
            isDisabled={!couponCode}
          >
            Aplicar Cupón
          </Button>
          
          {couponError && (
            <Alert status="error" size="sm">
              <AlertIcon />
              {couponError}
            </Alert>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

export default CartOrderSummary;
