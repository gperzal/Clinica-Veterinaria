// client-app/src/modules/catalog/components/payment/PaymentConfirmation.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  Icon,
  Button,
  Divider,
  useColorModeValue,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Container,
  Badge,
  SimpleGrid,
  Card,
  CardBody,
  Stack,
  Flex
} from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { FaTruck, FaRegCreditCard, FaBoxOpen, FaReceipt } from 'react-icons/fa';
import { motion } from 'framer-motion';
const MotionBox = motion(Box);

const PaymentConfirmation = ({ orderDetails }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const bgColor = useColorModeValue('white', 'gray.800');
  const cardBgColor = useColorModeValue('gray.50', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const accentColor = useColorModeValue('teal.500', 'teal.300');
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  useEffect(() => {
    console.log('OrderDetails recibidos PaymentConfirmation:', orderDetails);
    
  }, [orderDetails]);

  const orderData = {
    orderNumber: orderDetails?.orderNumber || 'PED-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    paymentMethod: orderDetails?.payment?.method || 'Visa terminada en 4242',
    date: new Date(orderDetails?.createdAt).toLocaleDateString(),
    customer: {
      name: orderDetails?.customer?.name || '',
      email: orderDetails?.customer?.email || '',
      phone: orderDetails?.customer?.phone || '',
      address: orderDetails?.shipping?.address || ''
    },
    shipping: {
      method: orderDetails?.shipping?.method || '',
      cost: orderDetails?.shipping?.cost || 0,
      address: orderDetails?.shipping?.address || ''
    },
    items: orderDetails?.items || [],
    subtotal: orderDetails?.subtotal || 0,
    total: orderDetails?.total || 0,
    status: orderDetails?.status || 'Pendiente'
  };

    // Función para formatear números
    const formatMoney = (amount) => {
      return Number(amount).toLocaleString('es-CL');
    };

  const shippingMethodDisplay = orderData.shipping.method === 'Express - Entrega en 24 horas' 
    ? 'Envío Express' 
    : 'Envío Standard';

  return (
    <Container maxW="6xl" py={8}>
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card
          bg={bgColor}
          borderRadius="xl"
          borderWidth="1px"
          borderColor={borderColor}
          overflow="hidden"
          boxShadow="xl"
        >
          <CardBody p={0}>
            <VStack spacing={8} align="stretch">
              {/* Header Section */}
              <Box 
                bg={accentColor} 
                py={10} 
                px={8}
                color="white"
                position="relative"
                overflow="hidden"
              >
                <Box
                  position="absolute"
                  top="0"
                  left="0"
                  right="0"
                  bottom="0"
                  bgGradient={`linear(to-r, ${accentColor}, teal.400)`}
                  opacity="0.8"
                />
                <VStack spacing={4} position="relative" zIndex="1">
                  <Icon as={CheckCircleIcon} w={16} h={16} />
                  <Heading size="xl">¡Gracias por tu compra!</Heading>
                  <Text fontSize="lg" textAlign="center" maxW="2xl">
                    Tu pedido ha sido confirmado y está siendo procesado.
                  </Text>
                </VStack>
              </Box>

              {/* Order Information */}
              <Box px={8}>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                  <Card variant="outline">
                    <CardBody>
                      <HStack spacing={4}>
                        <Icon as={FaReceipt} color={accentColor} boxSize={6} />
                        <Stack spacing={1}>
                          <Text fontSize="sm" color="gray.500">Número de Pedido</Text>
                          <Text fontSize="lg" fontWeight="bold">{orderData.orderNumber}</Text>
                        </Stack>
                      </HStack>
                    </CardBody>
                  </Card>
                  <Card variant="outline">
                    <CardBody>
                      <HStack spacing={4}>
                        <Icon as={FaBoxOpen} color={accentColor} boxSize={6} />
                        <Stack spacing={1}>
                          <Text fontSize="sm" color="gray.500">Fecha de Compra</Text>
                          <Text fontSize="lg" fontWeight="bold">{orderData.date}</Text>
                        </Stack>
                      </HStack>
                    </CardBody>
                  </Card>
                </SimpleGrid>
              </Box>

              {/* Shipping and Payment Information */}
              <Box px={8}>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                  <Card bg={cardBgColor}>
                    <CardBody>
                      <VStack align="stretch" spacing={4}>
                        <HStack spacing={4}>
                          <Icon as={FaTruck} color={accentColor} boxSize={6} />
                          <Heading size="md">Información de Envío</Heading>
                        </HStack>
                        <VStack align="start" spacing={2} pl={10}>
                          <Text><strong>Nombre:</strong> {orderData.customer.name}</Text>
                          <Text><strong>Dirección:</strong> {orderData.shipping.address}</Text>
                          <Text><strong>Teléfono:</strong> {orderData.customer.phone}</Text>
                          <Badge colorScheme="teal" fontSize="sm" px={2} py={1}>
                            {shippingMethodDisplay}
                          </Badge>
                        </VStack>
                      </VStack>
                    </CardBody>
                  </Card>

                  <Card bg={cardBgColor}>
                    <CardBody>
                      <VStack align="stretch" spacing={4}>
                        <HStack spacing={4}>
                          <Icon as={FaRegCreditCard} color={accentColor} boxSize={6} />
                          <Heading size="md">Método de Pago</Heading>
                        </HStack>
                        <VStack align="start" spacing={2} pl={10}>
                          <Text>{orderData.paymentMethod}</Text>
                          <Badge colorScheme="blue" fontSize="sm" px={2} py={1}>
                            Visa terminada en 4242
                          </Badge>
                        </VStack>
                      </VStack>
                    </CardBody>
                  </Card>
                </SimpleGrid>
              </Box>

              {/* Order Summary */}
              <Box px={8}>
                <Card variant="outline">
                  <CardBody>
                    <VStack spacing={4} align="stretch">
                      <Heading size="md">Resumen de la Compra</Heading>
                      <VStack spacing={3} align="stretch">
                        {orderData.items.map((item, index) => (
                          <Flex
                            key={index}
                            justify="space-between"
                            p={3}
                            bg={cardBgColor}
                            borderRadius="md"
                            align="center"
                          >
                            <HStack spacing={4}>
                              <Badge colorScheme="teal" fontSize="sm">
                                {item.quantity}x
                              </Badge>
                              <Text fontWeight="medium">{item.name}</Text>
                            </HStack>
                            <Text fontWeight="bold">
                              ${formatMoney(item.quantity * item.priceAtPurchase)}
                            </Text>
                          </Flex>
                        ))}
                      </VStack>

                      <Divider />

                      <Stack spacing={3}>
                        <Flex justify="space-between">
                          <Text color="gray.600">Subtotal</Text>
                          <Text>${formatMoney(orderData.subtotal)}</Text>
                        </Flex>
                        <Flex justify="space-between">
                          <Text color="gray.600">Envío</Text>
                          <Text>${formatMoney(orderData.shipping.cost)}</Text>
                        </Flex>
                        {orderData.discount > 0 && (
                          <Flex justify="space-between" color="green.500">
                            <Text>Descuento Aplicado</Text>
                            <Text>-${formatMoney(orderData.discount)}</Text>
                          </Flex>
                        )}
                        <Divider />
                        <Flex justify="space-between" fontSize="xl" fontWeight="bold">
                          <Text>Total</Text>
                          <Text color={accentColor}>${formatMoney(orderData.total)}</Text>
                        </Flex>
                      </Stack>
                    </VStack>
                  </CardBody>
                </Card>
              </Box>

              {/* Action Buttons */}
              <Box px={8} pb={8}>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  <Button
                    size="lg"
                    colorScheme="teal"
                    leftIcon={<FaTruck />}
                    onClick={toggleModal}
                  >
                    Ver Estado del Pedido
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    colorScheme="teal"
                    as="a"
                    href="/catalog"
                  >
                    Volver a la Tienda
                  </Button>
                </SimpleGrid>
              </Box>
            </VStack>
          </CardBody>
        </Card>
      </MotionBox>

      {/* Order Status Modal */}
      <Modal isOpen={isModalOpen} onClose={toggleModal} isCentered size="md">
        <ModalOverlay backdropFilter="blur(5px)" />
        <ModalContent>
          <ModalHeader>Estado del Pedido</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <Text>
                La funcionalidad de seguimiento de pedidos no está disponible actualmente.
                Gracias por su compra.
              </Text>
              <Badge colorScheme="yellow" p={2} textAlign="center">
                Pedido en Preparación
              </Badge>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={toggleModal} width="full">
              Entendido
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default PaymentConfirmation;