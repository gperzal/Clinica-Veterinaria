import React from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  VStack,
  HStack,
  Divider,
  useColorModeValue,
} from '@chakra-ui/react';

const OrderSummary = ({ order }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const hoverBgColor = useColorModeValue('gray.50', 'gray.500');

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="sm"
      bg={bgColor}
    >
      <Box overflowX="auto">
        <Table variant="simple">
          <Thead
            position="sticky"
            top={0}
            zIndex={1}
            bg={bgColor}
            borderBottomWidth="1px"
            borderColor={borderColor}
          >
            <Tr>
              <Th borderRightWidth="1px" borderColor={borderColor}>Producto</Th>
              <Th isNumeric borderRightWidth="1px" borderColor={borderColor}>Cantidad</Th>
              <Th isNumeric borderRightWidth="1px" borderColor={borderColor}>Precio Unitario</Th>
              <Th isNumeric>Total</Th>
            </Tr>
          </Thead>
          <Tbody>
            {order.items.map((item, index) => (
              <Tr key={index} _hover={{ bg: hoverBgColor }}>
                <Td borderRightWidth="1px" borderColor={borderColor}>{item.name}</Td>
                <Td isNumeric borderRightWidth="1px" borderColor={borderColor}>{item.quantity}</Td>
                <Td isNumeric borderRightWidth="1px" borderColor={borderColor}>
                  ${item.priceAtPurchase}
                </Td>
                <Td isNumeric>${(item.quantity * item.priceAtPurchase)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      <Divider />
      <Box p={4}>
        <VStack align="stretch" spacing={2}>
          <HStack justify="space-between">
            <Text>Subtotal:</Text>
            <Text fontWeight="medium">${order.subtotal}</Text>
          </HStack>
          <HStack justify="space-between">
            <Text>Costo de Envío:</Text>
            <Text fontWeight="medium">${order.shipping.cost}</Text>
          </HStack>
          <Divider />
          <HStack justify="space-between">
            <Text fontSize="lg" fontWeight="bold">Total:</Text>
            <Text fontSize="lg" fontWeight="bold" color="blue.500">
              ${order.total}
            </Text>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
};

export default OrderSummary;