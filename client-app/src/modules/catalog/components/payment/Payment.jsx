// client-app/src/modules/catalog/components/payment/Payment.jsx
import React, { useEffect, useState } from 'react';
import {
  Box,
  VStack,
  Text,
  Progress,
  Center,
  Spinner,
  useColorModeValue
} from '@chakra-ui/react';

const Payment = ({ onPaymentComplete }) => {
  const [step, setStep] = useState(1);
  const bgColor = useColorModeValue('white', 'gray.800');

  useEffect(() => {
    // Simulación de proceso de pago
    const steps = [
      { message: 'Conectando con el servidor de pago...', time: 1000 },
      { message: 'Verificando información de tarjeta...', time: 1500 },
      { message: 'Procesando el pago...', time: 1500 },
      { message: 'Confirmando transacción...', time: 1000 },
      { message: 'Pago completado con éxito!', time: 1000 }
    ];

    steps.forEach((stepInfo, index) => {
      setTimeout(() => {
        setStep(index + 1);
        if (index === steps.length - 1) {
          setTimeout(() => {
            onPaymentComplete();
          }, 1000);
        }
      }, steps.slice(0, index).reduce((acc, curr) => acc + curr.time, 0));
    });
  }, [onPaymentComplete]);

  const messages = [
    'Conectando con el servidor de pago...',
    'Verificando información de tarjeta...',
    'Procesando el pago...',
    'Confirmando transacción...',
    'Pago completado con éxito!'
  ];

  return (
    <Center h="400px">
      <Box
        p={8}
        bg={bgColor}
        borderRadius="lg"
        boxShadow="xl"
        maxW="md"
        w="full"
        textAlign="center"
      >
        <VStack spacing={6}>
          <Spinner size="xl" color="teal.500" thickness="4px" />
          <Text fontSize="xl" fontWeight="medium">
            {messages[step - 1]}
          </Text>
          <Progress
            hasStripe
            isAnimated
            value={(step / 5) * 100}
            w="full"
            colorScheme="teal"
            borderRadius="full"
          />
        </VStack>
      </Box>
    </Center>
  );
};

export default Payment;