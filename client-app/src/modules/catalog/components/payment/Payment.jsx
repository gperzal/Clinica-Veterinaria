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
    let isMounted = true;
  
    const processPayment = async () => {
      if (isProcessing) return; // Si ya se está procesando, no volver a ejecutarlo
  
      try {
        setIsProcessing(true); // Indica que el proceso está en curso
        const steps = [
          { message: 'Conectando con el servidor de pago...', time: 1000 },
          { message: 'Verificando información de tarjeta...', time: 1500 },
          { message: 'Procesando el pago...', time: 1500 },
          { message: 'Creando orden...', time: 1000 },
          { message: '¡Pago completado con éxito!', time: 1000 }
        ];
  
        for (let i = 0; i < steps.length; i++) {
          await new Promise(resolve => setTimeout(resolve, steps[i].time));
          if (!isMounted) return; // Si el componente se desmonta, detén la ejecución
          setStep(i + 1);
        }
  
        console.log('Creando orden con detalles:', orderDetails);
        const newOrder = await createNewOrder(orderDetails);
        console.log('Orden creada:', newOrder);
  
        if (isMounted) onPaymentComplete(newOrder); // Llama a la función solo si el componente está montado
  
      } catch (error) {
        console.error('Error en el proceso de pago:', error);
      } finally {
        setIsProcessing(false); // Resetea el estado de procesamiento
      }
    };
  
    if (orderDetails && !isProcessing) {
      processPayment(); // Llama a la función si hay detalles y no se está procesando
    }
  
    return () => {
      isMounted = false; // Marca como desmontado cuando se desmonta el componente
    };
  }, [orderDetails]); // Escucha cambios en orderDetails
  

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