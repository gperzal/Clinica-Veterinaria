// client-app/src/modules/catalog/components/checkout/Checkout.jsx
import React, { useState, useEffect } from 'react';
import { Box, Stack, Heading, FormControl, FormLabel, Input, RadioGroup, Radio, VStack, Text, Grid, GridItem, useColorModeValue, HStack, Icon } from '@chakra-ui/react';
import { FaCreditCard } from 'react-icons/fa';
import { SiMercadopago } from 'react-icons/si';
import { getProfile } from '../../../dashboard/profile/services/profileService';

const Checkout = ({ cartTotal, cartItems, setShippingCost, setOrderDetails, setShippingMethod }) => {
  const [profile, setProfile] = useState(null);
  const [selectedShipping, setSelectedShipping] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState('credit-debit');
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await getProfile();
        setProfile(data);
      } catch (error) {
        console.error('Error al obtener el perfil:', error);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    const shippingCost = selectedShipping === 'express' ? 15000 : selectedShipping === 'standard' ? 5000 : 0;
    const shippingMethod = selectedShipping === 'express' ? 'Express - Entrega en 24 horas' : selectedShipping === 'standard' ? 'Standard - 1 a 3 días hábiles' : 'No seleccionado';
    
    setShippingCost(shippingCost);
    setShippingMethod(shippingMethod);

    if (profile) {
      setOrderDetails({
        customer: {
          name: profile.user.name,
          email: profile.user.email,
          phone: profile.user.phone,
          address: profile.user.address,
        },
        items: cartItems,
        subtotal: cartTotal,
        shippingCost,
        shippingMethod, // Agregando shippingMethod a orderDetails
        paymentMethod: selectedPayment === 'credit-debit' ? 'Tarjeta de Crédito/Débito' : 'Mercado Pago',
        total: cartTotal + shippingCost,
      });
    }
  }, [selectedShipping, selectedPayment, profile, cartTotal, cartItems, setShippingCost, setOrderDetails, setShippingMethod]);

  return (
    <Box w="full" bg={bgColor} p={6} borderRadius="lg" borderWidth="1px" borderColor={borderColor} shadow="md">
      <Stack spacing={8}>
        {/* Información del Cliente */}
        <Box>
          <Heading size="md" mb={4}>Información del Cliente</Heading>
          <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }} gap={4}>
            <FormControl isRequired>
              <FormLabel>Nombre Completo</FormLabel>
              <Input value={profile?.user.name || ''} isReadOnly />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Correo Electrónico</FormLabel>
              <Input value={profile?.user.email || ''} isReadOnly />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Teléfono</FormLabel>
              <Input value={profile?.user.phone || ''} isReadOnly />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Dirección</FormLabel>
              <Input value={profile?.user.address || ''} isReadOnly />
            </FormControl>
          </Grid>
        </Box>

        {/* Tipo de Envío */}
        <Box>
          <Heading size="md" mb={4}>Tipo de Envío</Heading>
          <RadioGroup onChange={setSelectedShipping} value={selectedShipping}>
            <VStack align="stretch" spacing={4}>
              <Box p={4} borderWidth="1px" borderRadius="md" borderColor={selectedShipping === 'express' ? 'teal.500' : borderColor}>
                <Radio value="express">
                  <HStack justify="space-between" w="full">
                    <Box>
                      <Text fontWeight="bold">Express</Text>
                      <Text fontSize="sm" color="gray.500">Entrega en 24 horas</Text>
                    </Box>
                    <Text fontWeight="bold">$15.000</Text>
                  </HStack>
                </Radio>
              </Box>
              <Box p={4} borderWidth="1px" borderRadius="md" borderColor={selectedShipping === 'standard' ? 'teal.500' : borderColor}>
                <Radio value="standard">
                  <HStack justify="space-between" w="full">
                    <Box>
                      <Text fontWeight="bold">Standard</Text>
                      <Text fontSize="sm" color="gray.500">1 a 3 días hábiles</Text>
                    </Box>
                    <Text fontWeight="bold">$5.000</Text>
                  </HStack>
                </Radio>
              </Box>
            </VStack>
          </RadioGroup>
        </Box>

        {/* Método de Pago */}
        <Box>
          <Heading size="md" mb={4}>Método de Pago</Heading>
          <RadioGroup onChange={setSelectedPayment} value={selectedPayment}>
            <HStack spacing={4}>
              <Box p={4} borderWidth="1px" borderRadius="md" borderColor={selectedPayment === 'credit-debit' ? 'teal.500' : borderColor} cursor="pointer">
                <Radio value="credit-debit">
                  <HStack>
                    <Icon as={FaCreditCard} />
                    <Text>Tarjeta de Crédito/Débito</Text>
                  </HStack>
                </Radio>
              </Box>
              <Box p={4} borderWidth="1px" borderRadius="md" borderColor={selectedPayment === 'mercadopago' ? 'teal.500' : borderColor} cursor="pointer">
                <Radio value="mercadopago">
                  <HStack>
                    <Icon as={SiMercadopago} />
                    <Text>Mercado Pago</Text>
                  </HStack>
                </Radio>
              </Box>
            </HStack>
          </RadioGroup>
           {/* Campos de tarjeta de crédito, solo visuales */}
           {selectedPayment === 'credit-debit' && (
            <VStack spacing={4} align="stretch" mt={4}>
              <FormControl isRequired>
                <FormLabel>Número de Tarjeta</FormLabel>
                <Input value="1234 5678 9012 3456" isReadOnly />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Nombre del Titular</FormLabel>
                <Input value={profile?.user.name || ''} isReadOnly />
              </FormControl>
              <Grid templateColumns="2fr 1fr" gap={4}>
                <GridItem>
                  <FormControl isRequired>
                    <FormLabel>Fecha de Expiración</FormLabel>
                    <HStack>
                      <Input value="12" maxWidth="100px" isReadOnly />
                      <Text>/</Text>
                      <Input value="30" maxWidth="100px" isReadOnly />
                    </HStack>
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl isRequired>
                    <FormLabel>CVV/CVC</FormLabel>
                    <Input type="password" value="123" maxWidth="100px" isReadOnly />
                  </FormControl>
                </GridItem>
              </Grid>
            </VStack>
          )}
        </Box>
      </Stack>
    </Box>
  );
};

export default Checkout;
