// src/pages/dashboard/components/OrderCard.jsx
import React from 'react';
import { Box, Text, Flex, Badge, Button, VStack, HStack, Icon, useColorModeValue } from '@chakra-ui/react';
import { FaBox, FaCalendarAlt, FaDollarSign } from 'react-icons/fa';

const OrderCard = ({ order, onClick }) => {
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const textColor = useColorModeValue('gray.800', 'white');
  const iconColor = useColorModeValue('blue.500', 'blue.300');

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pendiente': return useColorModeValue('yellow', 'yellow.300');
      case 'enviado': return useColorModeValue('blue', 'blue.300');
      case 'entregado': return useColorModeValue('green', 'green.300');
      default: return useColorModeValue('gray', 'gray.400');
    }
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p={4}
      shadow="md"
      transition="all 0.3s"
      _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }}
      bg={bgColor}
      borderColor={borderColor}
    >
      <Flex justifyContent="space-between" alignItems="flex-start">
        <VStack align="start" spacing={3} flex={1}>
          <HStack>
            <Icon as={FaBox} color={iconColor} />
            <Text fontWeight="bold" fontSize="lg" color={textColor}>Pedido: {order.orderNumber}</Text>
          </HStack>
          <HStack>
            <Icon as={FaCalendarAlt} color={iconColor} />
            <Text color={textColor}>{new Date(order.createdAt).toLocaleDateString()}</Text>
          </HStack>
          <HStack>
            <Icon as={FaDollarSign} color={iconColor} />
            <Text fontWeight="medium" color={textColor}>${order.total}</Text>
          </HStack>
         
        </VStack>
        <Badge colorScheme={getStatusColor(order.status)}  p={2} mt={16} borderRadius="full">
            {order.status}
          </Badge>
          
      </Flex>
      <Button
          onClick={onClick}
          colorScheme="blue"
          size="sm"
          mt={4}
          rightIcon={<Icon as={FaBox} />}
        >
          Ver Detalles
        </Button>
    </Box>
  );
};

export default OrderCard;