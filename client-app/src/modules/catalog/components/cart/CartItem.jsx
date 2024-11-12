// client-app/src/modules/catalog/components/cart/CartItem.jsx
import React, { useState } from 'react';
import { 
  Flex, Image, Box, Text, Button, IconButton, 
  HStack, VStack, Badge, Select, useColorModeValue,
  Popover, PopoverTrigger, PopoverContent, 
  PopoverHeader, PopoverBody, PopoverArrow,
  PopoverCloseButton, Link
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';

const CartItem = ({ 
  _id,
  product, 
  name, 
  price, 
  priceAtAddition,
  quantity, 
  imageUrl, 
  variation,
  variations = [],
  sku,
  onRemove, 
  onUpdateQuantity,
  onUpdateVariation 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const totalPrice = quantity * priceAtAddition;
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
          <Link as={RouterLink} to={`/products/${product?._id}`}>
            <Image 
              src={imageUrl} 
              alt={name} 
              borderRadius="md" 
              objectFit="cover"
              w="150px"
              h="150px"
            />
          </Link>
          {variation && (
            <Badge
              position="absolute"
              top="2"
              right="2"
              colorScheme="blue"
              variant="solid"
            >
              {variation}
            </Badge>
          )}
        </Box>

        {/* Información del Producto */}
        <VStack align="stretch" flex="1" spacing={2}>
          <Flex justify="space-between" align="flex-start">
            <VStack align="start" spacing={1}>
              <Link
                as={RouterLink}
                to={`/products/${product?._id}`}
                fontWeight="bold"
                fontSize="lg"
                _hover={{ color: 'teal.500' }}
              >
                {name}
              </Link>
              <Text color={textColor} fontSize="sm">SKU: {sku}</Text>
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
          <Flex 
            justify="space-between" 
            align="center"
            wrap="wrap"
            gap={2}
          >
            <VStack align="start" spacing={0}>
              <Text fontSize="sm" color={textColor}>Precio unitario:</Text>
              <Text fontWeight="bold">${priceAtAddition.toLocaleString()}</Text>
            </VStack>
            <VStack align="end" spacing={0}>
              <Text fontSize="sm" color={textColor}>Total:</Text>
              <Text fontWeight="bold" color="teal.500">
                ${totalPrice.toLocaleString()}
              </Text>
            </VStack>
          </Flex>

          {/* Controles de Cantidad y Variación */}
          <Flex 
            justify="space-between" 
            align="center"
            mt={2}
            wrap="wrap"
            gap={4}
          >
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
                          onClick={() => handleQuantityChange(quantity - 1)}
                          isDisabled={quantity <= 1}
                        />
                        <Text fontWeight="medium">{quantity}</Text>
                        <IconButton
                          size="xs"
                          icon={<Text>+</Text>}
                          onClick={() => handleQuantityChange(quantity + 1)}
                        />
                      </HStack>
                    </HStack>

                    {/* Selector de variación si hay variaciones disponibles */}
                    {variations.length > 0 && (
                      <Box w="full">
                        <Text fontSize="sm" mb={1}>Variación:</Text>
                        <Select
                          size="sm"
                          value={variation}
                          onChange={(e) => onUpdateVariation(e.target.value)}
                        >
                          {variations.map((v) => (
                            <option key={v} value={v}>
                              {v}
                            </option>
                          ))}
                        </Select>
                      </Box>
                    )}
                  </VStack>
                </PopoverBody>
              </PopoverContent>
            </Popover>

            <HStack spacing={1}>
              <Text fontSize="sm" color={textColor}>Cantidad:</Text>
              <Text fontWeight="medium">{quantity}</Text>
            </HStack>
          </Flex>
        </VStack>
      </Flex>
    </Box>
  );
};

export default CartItem;