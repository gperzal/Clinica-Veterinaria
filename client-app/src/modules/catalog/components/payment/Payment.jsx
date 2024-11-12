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
import { useOrder } from '../../context/OrderContext';

const Payment = ({ orderDetails, onPaymentComplete }) => {
  const [step, setStep] = useState(1);
  const { createNewOrder } = useOrder();
  const bgColor = useColorModeValue('white', 'gray.800');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const processPayment = async () => {
      if (isProcessing) return; // Prevenir procesamiento múltiple
      
      try {
        setIsProcessing(true);
        const steps = [
          { message: 'Conectando con el servidor de pago...', time: 1000 },
          { message: 'Verificando información de tarjeta...', time: 1500 },
          { message: 'Procesando el pago...', time: 1500 },
          { message: 'Creando orden...', time: 1000 },
          { message: '¡Pago completado con éxito!', time: 1000 }
        ];
  
        for (let i = 0; i < steps.length; i++) {
          await new Promise(resolve => setTimeout(resolve, steps[i].time));
          setStep(i + 1);
        }
  
        console.log('Creando orden con detalles:', orderDetails);
        const newOrder = await createNewOrder(orderDetails);
        console.log('Orden creada:', newOrder);
        onPaymentComplete(newOrder);
  
      } catch (error) {
        console.error('Error en el proceso de pago:', error);
        // Aquí podrías agregar manejo de errores UI
      } finally {
        setIsProcessing(false);
      }
    };
  
    if (orderDetails && !isProcessing) {
      processPayment();
    }
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderDetails]);

  const messages = [
    'Conectando con el servidor de pago...',
    'Verificando información de tarjeta...',
    'Procesando el pago...',
    'Creando orden...',
    '¡Pago completado con éxito!'
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