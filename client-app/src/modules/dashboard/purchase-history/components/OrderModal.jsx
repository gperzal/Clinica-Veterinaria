// src/pages/dashboard/components/OrderModal.jsx
import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  VStack,
  Badge,
  Box,
  Flex,
  Divider,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaBox, FaTruck, FaCheck } from 'react-icons/fa';
import {
  TimelineRoot,
  TimelineItem,
  TimelineConnector,
  TimelineContent,
  TimelineTitle,
  TimelineDescription,
} from '../components/ui/timeline';
import OrderSummary from './OrderSummary';

const OrderModal = ({ isOpen, onClose, order }) => {
  if (!order) return null;

  const bgColor = useColorModeValue('gray.50', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const getOrderTimeline = (status) => {
    const timeline = [
      { icon: FaBox, title: 'Orden Creada', date: new Date(order.createdAt).toLocaleString() },
      { icon: FaTruck, title: 'En Proceso de Envío', date: 'Pendiente' },
      { icon: FaCheck, title: 'Entregado', date: 'Pendiente' },
    ];

    switch (status) {
      case 'Enviado':
        timeline[1].date = new Date().toLocaleString();
        break;
      case 'Entregado':
        timeline[1].date = new Date(new Date(order.createdAt).getTime() + 24 * 60 * 60 * 1000).toLocaleString();
        timeline[2].date = new Date().toLocaleString();
        break;
      default:
        break;
    }

    return timeline;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader bg={bgColor} borderBottomWidth="1px" borderColor={borderColor}>
          Detalles del Pedido: {order.orderNumber}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction={{ base: 'column', md: 'row' }} gap={6}>
            <Box flex={1}>
              <VStack align="stretch" spacing={4}>
                <Box bg={bgColor} p={4} borderRadius="md" borderWidth="1px" borderColor={borderColor}>
                  <Text fontWeight="bold" mb={2}>Información del Cliente</Text>
                  <Text>Nombre: {order.customer.name}</Text>
                  <Text>Email: {order.customer.email}</Text>
                  <Text>Teléfono: {order.customer.phone}</Text>
                </Box>
                <Box bg={bgColor} p={4} borderRadius="md" borderWidth="1px" borderColor={borderColor}>
                  <Text fontWeight="bold" mb={2}>Detalles de Envío</Text>
                  <Text>Método: {order.shipping.method}</Text>
                  <Text>Dirección: {order.shipping.address}</Text>
                </Box>
                <Box bg={bgColor} p={4} borderRadius="md" borderWidth="1px" borderColor={borderColor}>
                  <Text fontWeight="bold" mb={2}>Detalles de Pago</Text>
                  <Text>Método: {order.payment.method}</Text>
                  <Text>Estado: <Badge colorScheme={order.payment.status === 'Pendiente' ? 'yellow' : 'green'}>{order.payment.status}</Badge></Text>
                </Box>
              </VStack>
            </Box>
            <Box flex={1}>
              <TimelineRoot>
                {getOrderTimeline(order.status).map((item, index) => (
                  <TimelineItem key={index}>
                    <TimelineConnector>
                      <item.icon />
                    </TimelineConnector>
                    <TimelineContent>
                      <TimelineTitle>{item.title}</TimelineTitle>
                      <TimelineDescription>{item.date}</TimelineDescription>
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </TimelineRoot>
            </Box>
          </Flex>
          <Divider my={6} />
          <OrderSummary order={order} />
        </ModalBody>

      </ModalContent>
    </Modal>
  );
};

export default OrderModal;