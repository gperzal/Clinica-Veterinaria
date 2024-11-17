// client-app/src/modules/catalog/components/cart/CartItem.jsx

import React, { useState } from 'react';
import {
  Flex,
  Image,
  Box,
  Text,
  Button,
  IconButton,
  HStack,
  VStack,
  Badge,
  useColorModeValue,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Link,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';

const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
  const [isEditing, setIsEditing] = useState(false);
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const totalPrice = item.quantity * item.priceAtAddition;

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      onUpdateQuantity(newQuantity);
    }
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p="4"
      bg={cardBg}
      borderColor={borderColor}
      boxShadow="sm"
      _hover={{ boxShadow: 'md' }}
      position="relative"
    >
      <Flex direction={{ base: 'column', md: 'row' }} gap={4}>
        {/* Imagen y Link al Producto */}
        <Box position="relative" minW="150px">
          <Link as={RouterLink} to={`/products/${item.product._id}`}>
            <Image
              src={item.imageUrl}
              alt={item.name}
              borderRadius="md"
              objectFit="cover"
              w="150px"
              h="150px"
            />
          </Link>
          {item.variation && (
              <Badge
                position="absolute"
                top="2"
                right="2"
                colorScheme="blue"
                variant="solid"
              >
                {item.variation}
              </Badge>
            )}
        </Box>

        {/* Información del Producto */}
        <VStack align="stretch" flex="1" spacing={2}>
          <Flex justify="space-between" align="flex-start">
            <VStack align="start" spacing={1}>
              <Link
                as={RouterLink}
                to={`/products/${item.product._id}`}
                fontWeight="bold"
                fontSize="lg"
                _hover={{ color: 'teal.500' }}
              >
                {item.name} {item.variation ? `(${item.variation})` : ''}
              </Link>
              <Text color={textColor} fontSize="sm">
                SKU: {item.sku}
              </Text>
            </VStack>
            <IconButton
              icon={<CloseIcon />}
              variant="ghost"
              colorScheme="red"
              size="sm"
              onClick={onRemove}
              aria-label="Eliminar producto"
            />
          </Flex>

          {/* Precios */}
          <Flex justify="space-between" align="center" wrap="wrap" gap={2}>
            <VStack align="start" spacing={0}>
              <Text fontSize="sm" color={textColor}>
                Precio unitario:
              </Text>
              <Text fontWeight="bold">${item.priceAtAddition.toLocaleString()}</Text>
            </VStack>
            <VStack align="end" spacing={0}>
              <Text fontSize="sm" color={textColor}>
                Total:
              </Text>
              <Text fontWeight="bold" color="teal.500">
                ${totalPrice.toLocaleString()}
              </Text>
            </VStack>
          </Flex>

          {/* Controles de Cantidad */}
          <Flex justify="space-between" align="center" mt={2} wrap="wrap" gap={4}>
            <Popover
              isOpen={isEditing}
              onClose={() => setIsEditing(false)}
              placement="bottom"
              closeOnBlur={true}
            >
              <PopoverTrigger>
                <Button
                  leftIcon={<FaEdit />}
                  size="sm"
                  variant="outline"
                  onClick={() => setIsEditing(true)}
                >
                  Editar
                </Button>
              </PopoverTrigger>
              <PopoverContent p={2}>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Editar producto</PopoverHeader>
                <PopoverBody>
                  <VStack spacing={3}>
                    {/* Control de cantidad */}
                    <HStack>
                      <Text fontSize="sm">Cantidad:</Text>
                      <HStack maxW="120px">
                        <IconButton
                          size="xs"
                          icon={<Text>-</Text>}
                          onClick={() => handleQuantityChange(item.quantity - 1)}
                          isDisabled={item.quantity <= 1}
                        />
                        <Text fontWeight="medium">{item.quantity}</Text>
                        <IconButton
                          size="xs"
                          icon={<Text>+</Text>}
                          onClick={() => handleQuantityChange(item.quantity + 1)}
                        />
                      </HStack>
                    </HStack>
                  </VStack>
                </PopoverBody>
              </PopoverContent>
            </Popover>

            <HStack spacing={1}>
              <Text fontSize="sm" color={textColor}>
                Cantidad:
              </Text>
              <Text fontWeight="medium">{item.quantity}</Text>
            </HStack>
          </Flex>
        </VStack>
      </Flex>
    </Box>
  );
};

export default CartItem;
