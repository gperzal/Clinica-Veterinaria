import React, { useState } from 'react';
import {
  Box,
  Flex,
  Image,
  Tag,
  TagLabel,
  Button,
  Text,
  Tooltip,
  FormControl,
  FormLabel,
  Select,
  useColorModeValue,
  useNumberInput,
  HStack,
  Input,
} from '@chakra-ui/react';
import { FiShoppingCart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import useToastNotification from '../../../../hooks/useToastNotification';
import Rating from './Rating.jsx';

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const showToast = useToastNotification();

  const isNew = (new Date() - new Date(product.createdAt)) / (1000 * 60 * 60 * 24) < 15;
  const hasVariations = product.details.variations?.length > 0;

  const [selectedVariation, setSelectedVariation] = useState(null); // Iniciar con el producto principal
  const [quantity, setQuantity] = useState(1);

  const price = selectedVariation ? selectedVariation.price : product.price;
  const discount = selectedVariation
    ? selectedVariation.discount
    : product.details.discount || 0;
  const hasDiscount = discount > 0;
  const discountedPrice = hasDiscount ? price * (1 - discount / 100) : price;
  const stock = selectedVariation ? selectedVariation.stock : product.details.stock;
  const imageURL = selectedVariation?.imageURL || product.imageURL;

  const {
    getInputProps,
    getIncrementButtonProps,
    getDecrementButtonProps,
  } = useNumberInput({
    step: 1,
    value: quantity,
    onChange: (valueAsString, valueAsNumber) => setQuantity(valueAsNumber),
    min: 1,
    max: stock,
  });

  const handleAddToCart = () => {
    if (stock > 0) {
      const variationName = selectedVariation ? selectedVariation.name : ''; 
      const cartItem = {
        ...product,
        selectedVariation: selectedVariation,
      };
  
      // Pasar la cantidad seleccionada al método addToCart
      addToCart(cartItem, quantity, variationName);
  
      showToast({
        title: 'Producto agregado',
        description: `${product.name}${variationName ? ` (${variationName})` : ''} ha sido agregado al carrito (${quantity} unidades).`,
        status: 'success',
      });
    } else {
      showToast({
        title: 'Producto agotado',
        description: 'Este producto no está disponible actualmente.',
        status: 'error',
      });
    }
  };
  
  

  return (
    <Flex p={4} w="full" alignItems="center" justifyContent="center">
      <Box
        as="div"
        bg={useColorModeValue('white', 'gray.800')}
        maxW="sm"
        w="300px"
        h="650px"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        transition="transform 0.2s"
        _hover={{ transform: 'translateY(-5px)', shadow: '2xl' }}
        overflow="hidden"
      >
        {/* Badges */}
        <Box position="absolute" top="2" left="2" zIndex={1}>
          {isNew && (
            <Tag
              bg="rgba(0, 0, 255, 0.7)"
              color="white"
              size="md"
              borderRadius="full"
              mb={1}
              px={3}
              py={1}
            >
              <TagLabel>NUEVO</TagLabel>
            </Tag>
          )}
        </Box>

        {/* Imagen */}
        <Box
          as={Link}
          to={`/products/${product._id}`}
          onClick={(e) => e.stopPropagation()}
          position="relative"
          h="200px"
          w="full"
        >
          <Image
            src={imageURL}
            alt={`Imagen de ${product.name}`}
            objectFit="cover"
            w="100%"
            h="100%"
            roundedTop="lg"
            transition="transform 0.3s"
            border="2px solid"
            borderColor={useColorModeValue('gray.200', 'gray.600')}
            _hover={{
              borderColor: useColorModeValue('teal.400', 'teal.300'),
              transform: 'scale(1.05)',
            }}
          />
        </Box>

        {/* Contenido */}
        <Box p="4" flex="1">
          <Text fontSize="lg" fontWeight="bold" isTruncated>
            {product.name}
          </Text>
          <Text mt={2} color={useColorModeValue('gray.700', 'gray.400')} noOfLines={2}>
            {product.description}
          </Text>

          {/* Rating */}
          <Flex mt="2" justifyContent="space-between" alignItems="center">
            <Rating rating={product.rating || 0} numReviews={product.numReviews || 0} />
          </Flex>

          {/* Selector de Variaciones */}
          {hasVariations && (
            <FormControl mt={4}>
              <FormLabel>Variedades</FormLabel>
              <Select
                value={selectedVariation ? selectedVariation.name : ''}
                onChange={(e) => {
                  const variationName = e.target.value;
                  if (variationName === '') {
                    // Producto principal seleccionado
                    setSelectedVariation(null);
                  } else {
                    const variation = product.details.variations.find(
                      (v) => v.name === variationName
                    );
                    setSelectedVariation(variation);
                  }
                  setQuantity(1); // Reset cantidad
                }}
              >
                <option value="">Producto principal</option>
                {product.details.variations.map((variation) => (
                  <option key={variation._id} value={variation.name}>
                    {variation.name}
                  </option>
                ))}
              </Select>
            </FormControl>
          )}

          {/* Precio */}
          <Flex mt={4} justifyContent="space-between" alignItems="center">
            <Box textAlign="left" w="full">
              <Flex justifyContent="space-between" alignItems="center">
                {hasDiscount && (
                  <Text
                    fontSize="sm"
                    textDecoration="line-through"
                    color={useColorModeValue('gray.500', 'gray.400')}
                    mr={2}
                  >
                    ${price.toLocaleString()}
                  </Text>
                )}
                <Flex alignItems="center" gap={3}>
                  <Text
                    fontSize="2xl"
                    fontWeight="extrabold"
                    color={useColorModeValue('teal.600', 'teal.300')}
                  >
                    ${discountedPrice.toLocaleString()}
                  </Text>
                  {hasDiscount && (
                    <Box
                      fontSize="sm"
                      color="white"
                      bgGradient="linear(to-r, red.400, red.600)"
                      px={3}
                      py={1}
                      borderRadius="full"
                      boxShadow="md"
                    >
                      - {discount}%.
                    </Box>
                  )}
                </Flex>
              </Flex>
            </Box>
          </Flex>

          {/* Cantidad */}
          <Box mt={4}>
            <FormLabel>Cantidad</FormLabel>
            <HStack maxW="200px">
              <Button {...getDecrementButtonProps()}>-</Button>
              <Input {...getInputProps()} readOnly textAlign="center" />
              <Button {...getIncrementButtonProps()}>+</Button>
            </HStack>
          </Box>
        </Box>

        {/* Botón de Agregar al Carrito */}
        <Box p="4">
          {stock > 0 ? (
            <Tooltip label="Agregar al carrito" placement="top">
              <Button
                colorScheme="teal"
                variant="solid"
                w="full"
                leftIcon={<FiShoppingCart />}
                onClick={(e) => {
                  e.preventDefault();
                  handleAddToCart();
                }}
                _hover={{
                  background: useColorModeValue('teal.500', 'teal.400'),
                  transform: 'scale(1.02)',
                }}
              >
                Agregar al Carrito
              </Button>
            </Tooltip>
          ) : (
            <Button colorScheme="red" variant="solid" w="full" isDisabled>
              Agotado
            </Button>
          )}
        </Box>
      </Box>
    </Flex>
  );
}

export default ProductCard;
