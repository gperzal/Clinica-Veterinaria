// src/components/catalog/ProductCard.jsx
import React from 'react';
import { 
  Box, Flex, Image, Badge, useColorModeValue, Icon, chakra, Tooltip, Text 
} from '@chakra-ui/react';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import { FiShoppingCart } from 'react-icons/fi';

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
  return (
    <Flex p={4} w="full" alignItems="center" justifyContent="center">
      <Box
        bg={useColorModeValue('white', 'gray.800')}
        maxW="sm"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
        textAlign="center"
      >
        {product.isNew && (
          <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="red">
            New
          </Badge>
        )}

        <Image src={product.imageURL} alt={`Picture of ${product.name}`} roundedTop="lg" objectFit="cover" mx="auto" />

        <Box p="6">
          <Box display="flex" alignItems="baseline">
            {product.isNew && (
              <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="red">
                New
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
              <Box as="span" color={'gray.600'} fontSize="lg">
                $
              </Box>
              {product.price.toFixed(2)}
            </Box>
          </Flex>

          <Tooltip
            label="Add to cart"
            bg="white"
            placement={'top'}
            color={'gray.800'}
            fontSize={'1.2em'}>
            <chakra.a href={'#'} display={'flex'} alignItems="center" justifyContent="center">
              <Icon as={FiShoppingCart} h={7} w={7} alignSelf={'center'} />
            </chakra.a>
          </Tooltip>
        </Box>
      </Box>
    </Flex>
  );
}

export default ProductCard;
