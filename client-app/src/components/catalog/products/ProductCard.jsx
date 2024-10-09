// src/components/catalog/ProductCard.jsx
import React from 'react';
import { 
  Box, Flex, Image, Badge, useColorModeValue, Icon, chakra, Tooltip, Text , Button
} from '@chakra-ui/react';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import { FiShoppingCart } from 'react-icons/fi';
import { Link } from 'react-router-dom';

function Rating({ rating, numReviews }) {

  
  return (
    <Box display="flex" alignItems="center">
      {Array(5)
        .fill('')
        .map((_, i) => {
          const roundedRating = Math.round(rating * 2) / 2;
          if (roundedRating - i >= 1) {
            return (
              <BsStarFill
                key={i}
                style={{ marginLeft: '1' }}
                color={i < rating ? 'teal.500' : 'gray.300'}
              />
            );
          }
          if (roundedRating - i === 0.5) {
            return <BsStarHalf key={i} style={{ marginLeft: '1' }} />;
          }
          return <BsStar key={i} style={{ marginLeft: '1' }} />;
        })}
      <Box as="span" ml="2" color="gray.600" fontSize="sm">
        {numReviews} review{numReviews > 1 && 's'}
      </Box>
    </Box>
  );
}

function ProductCard({ product }) {

  // Condicion para mostrar u ocultar el nuevo producto por 30 dias
  const isNew = (new Date() - new Date(product.createdAt)) / (1000 * 60 * 60 * 24) < 15;

  // Verificar si el producto tiene descuento
  const hasDiscount = product.details.discount > 0;
  
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
      >
        {/* Enlace que envuelve toda la tarjeta */}
        <Link to={`/products/${product._id}`} style={{ textDecoration: 'none' }}>
          {/* Contenido de la tarjeta */}
          <Box p="6">
            <Image 
              src={product.imageURL} 
              alt={`Picture of ${product.name}`} 
              roundedTop="lg" 
              objectFit="cover" 
              mx="auto" 
              boxSize="300px" 
            />

            <Box display="flex" alignItems="baseline" >
              {isNew && (
                <Badge rounded="full" px="2" mt="2" fontSize="0.8em"
                colorScheme="blue"
    border="2px solid"
    borderColor="blue.500"
    boxShadow="0 0 8px blue"
    animation="pulse 2s infinite" ml={2}>
                  NUEVO  
                </Badge>
              )}


              {/* Mostrar badge de descuento */}
              {hasDiscount && (
                <Badge position="absolute"
                top="0"
                right="0"
                transform="rotate(45deg)"
                bg="green.500"
                color="white"
                p="2"
                fontSize="0.8em"
                boxShadow="lg">
                  {product.details.discount}% Dcto
                </Badge>
              )}
            </Box>
            <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
              {product.name}
            </Box>
            <Text mt={2} color={useColorModeValue('gray.700', 'gray.400')} noOfLines={2}>
              {product.description}
            </Text>
            <Flex mt="2" justifyContent="space-between" alignContent="center">
              <Rating rating={product.rating} numReviews={product.numReviews} />
              <Box fontSize="2xl" color={useColorModeValue('gray.800', 'white')}>
                <Box as="span" fontSize="xxl" >
                  $ 
                </Box>
                {/* Mostrar precio original tachado si hay descuento */}
                {hasDiscount && (
                  <Box as="span" fontSize="md" textDecoration="line-through" mr={2}>
                    {product.details.originalPrice.toFixed(3)}
                  </Box>
                )}
                {product.price.toFixed(3)}
              </Box>
            </Flex>
          </Box>
        </Link>

        {/* Botón para agregar al carrito */}
        <Box p="6">
          <Button leftIcon={<FiShoppingCart />} colorScheme="teal" variant="solid">
            Agregar al Carrito
          </Button>
        </Box>
      </Box>
    </Flex>
  );
}

export default ProductCard;