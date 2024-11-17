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
  useColorMode,
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

  const [selectedVariation, setSelectedVariation] = useState(
    hasVariations ? product.details.variations[0] : null
  );

  const price = selectedVariation ? selectedVariation.price : product.price;
  const discount = selectedVariation ? selectedVariation.discount : product.details.discount || 0;
  const hasDiscount = discount > 0;
  const discountedPrice = hasDiscount ? price * (1 - discount / 100) : price;
  const stock = selectedVariation ? selectedVariation.stock : product.details.stock;
  const imageURL = product.imageURL;

  const handleAddToCart = () => {
    if (stock > 0) {
      const cartItem = {
        ...product,
        selectedVariation: selectedVariation,
      };
      addToCart(cartItem);
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
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        height="100%"
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
        >
          <Image
            src={imageURL}
            alt={`Imagen de ${product.name}`}
            roundedTop="lg"
            objectFit="cover"
            mx="auto"
            boxSize="300px"
            border="2px solid"
            borderColor={useColorModeValue('gray.200', 'gray.600')}
            _hover={{
              borderColor: useColorModeValue('teal.400', 'teal.300'),
              transform: 'scale(1.02)',
              transition: 'transform 0.3s',
            }}
          />
        </Box>

        {/* Contenido */}
        <Box p="6">
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
                value={selectedVariation?.name}
                onChange={(e) => {
                  e.stopPropagation(); // Evitar navegación al interactuar
                  const variationName = e.target.value;
                  const variation = product.details.variations.find(
                    (v) => v.name === variationName
                  );
                  setSelectedVariation(variation);
                }}
              >
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
                {/* Precio Original */}
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

                {/* Precio con Descuento */}
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
        </Box>

        {/* Botón de Agregar al Carrito */}
          <Box p="6">
            {stock > 0 ? (
              <Tooltip label="Agregar al carrito" placement="top">
                <Button
                  colorScheme="teal"
                  variant="solid"
                  w="full"
                  leftIcon={<FiShoppingCart />}
                  onClick={(e) => {
                    e.preventDefault(); // Prevenir navegación al hacer clic
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
