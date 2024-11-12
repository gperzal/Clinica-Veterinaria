// src/modules/catalog/components/products/ProductCard.jsx
import React from 'react';
import {
  Box,
  Flex,
  Image,
  Badge,
  useColorModeValue,
  Button,
  Text,
  HStack,
  Tooltip,
} from '@chakra-ui/react';
import { FiShoppingCart, FiInfo } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import CustomRatingIcon from '../icons/CustomRatingIcon';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../../auth/context/AuthContext';
import useToastNotification from '../../../../hooks/useToastNotification';

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const showToast = useToastNotification();
  const isNew =
    (new Date() - new Date(product.createdAt)) / (1000 * 60 * 60 * 24) < 15;
  const hasDiscount = product.details.discount > 0;
  const discountPercentage = product.details.discount;
  const hasVariations = product.details.variations?.length > 0;

  // Calcula el precio con descuento si existe un descuento
  const discountedPrice = hasDiscount
    ? product.price * (1 - discountPercentage / 100)
    : product.price;

  const handleAddToCart = () => {
    if (!user) {
      showToast({
        title: 'Debes iniciar sesión',
        description: 'Por favor, inicia sesión para agregar productos al carrito.',
        status: 'warning',
      });
      return;
    }

    if (hasVariations) {
      showToast({
        title: 'Variaciones disponibles',
        description:
          'Por favor, selecciona una variación en la página de detalles del producto.',
        status: 'info',
      });
    } else if (product.details.stock > 0) {
      addToCart(product);
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
        _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }}
      >
        {/* Badges con inclinación */}
        {isNew && (
          <Badge
            rounded="full"
            px="2"
            mt="2"
            fontSize="0.8em"
            colorScheme="blue"
            border="2px solid"
            borderColor="blue.500"
            boxShadow="0 0 8px blue"
            animation="pulse 2s infinite"
            ml={2}
            position="absolute"
            top="0"
            right="-2"
            transform="rotate(45deg)"
          >
            NUEVO
          </Badge>
        )}

        {hasDiscount && (
          <Badge
            position="absolute"
            top="4"
            right="-2"
            transform="rotate(45deg)"
            fontSize="0.8em"
            bg="green.500"
            color="white"
            p="2"
            boxShadow="lg"
            zIndex="1"
          >
            {discountPercentage}% Dcto
          </Badge>
        )}

        {/* Imagen y enlace al producto */}
        <Link to={`/products/${product._id}`}>
          <Box p="6">
            <Image
              src={product.imageURL}
              alt={`Imagen de ${product.name}`}
              roundedTop="lg"
              objectFit="cover"
              mx="auto"
              boxSize="300px"
            />

            <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
              {product.name}
            </Box>
            <Text mt={2} color={useColorModeValue('gray.700', 'gray.400')} noOfLines={2}>
              {product.description}
            </Text>

            {/* Rating y Precio */}
            <Flex mt="2" justifyContent="space-between" alignContent="center">
              <CustomRatingIcon rating={product.rating} numReviews={product.numReviews} />
              <Box textAlign="right">
                {hasDiscount && (
                  <Box
                    as="span"
                    fontSize="md"
                    textDecoration="line-through"
                    display="block"
                    color="gray.500"
                  >
                    ${product.price.toLocaleString()}
                  </Box>
                )}
                <Box
                  as="span"
                  fontSize="xl"
                  color={useColorModeValue('gray.800', 'white')}
                >
                  ${discountedPrice.toLocaleString()}
                </Box>
              </Box>
            </Flex>
          </Box>
        </Link>

        {/* Botones de Acción */}
        <Box p="6">
          <HStack spacing={2} width="full">
            <Tooltip
              label={hasVariations ? 'Ver opciones disponibles' : 'Ver detalles'}
              placement="top"
            >
              <Button
                as={Link}
                to={`/products/${product._id}`}
                colorScheme="blue"
                variant="outline"
                flex="1"
                leftIcon={<FiInfo />}
              >
                {hasVariations ? 'Ver Opciones' : 'Ver Detalles'}
              </Button>
            </Tooltip>

            {!hasVariations && product.details.stock > 0 && (
              <Tooltip label="Agregar al carrito" placement="top">
                <Button
                  colorScheme="teal"
                  variant="solid"
                  flex="1"
                  leftIcon={<FiShoppingCart />}
                  onClick={handleAddToCart}
                  isDisabled={!product.details.stock}
                >
                  Agregar
                </Button>
              </Tooltip>
            )}
          </HStack>

          {/* Indicadores de Stock y Variaciones */}
          {!product.details.stock ? (
            <Badge colorScheme="red" mt={2} width="full" textAlign="center">
              Agotado
            </Badge>
          ) : hasVariations && (
            <Text fontSize="sm" color="gray.500" mt={2} textAlign="center">
              {product.details.variations.length} variaciones disponibles
            </Text>
          )}
        </Box>
      </Box>
    </Flex>
  );
}

export default ProductCard;
