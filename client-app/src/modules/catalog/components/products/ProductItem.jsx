// src/components/catalog/products/ProductItem.jsx
import {
    Box, Image, Flex, Badge, useColorModeValue, Icon, chakra, Tooltip,
  } from '@chakra-ui/react';
  import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
  import { FiShoppingCart } from 'react-icons/fi';
  import { useContext } from 'react';
  import { CartContext } from '../../../context/CartContext';
  
  const ProductItem = ({ product }) => {
    const { addToCart } = useContext(CartContext);
  
    return (
      <Flex p={5} w="full" alignItems="center" justifyContent="center">
        <Box
          bg={useColorModeValue('white', 'gray.800')}
          maxW="sm"
          borderWidth="1px"
          rounded="lg"
          shadow="lg"
          position="relative">
          {product.isNew && (
            <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="red">
              Nuevo
            </Badge>
          )}
          <Image src={product.imageURL} alt={`Imagen de ${product.name}`} roundedTop="lg" />
          <Box p="6">
            <Flex justifyContent="space-between" alignContent="center">
              <Box fontSize="2xl" fontWeight="semibold" as="h4" isTruncated>
                {product.name}
              </Box>
              <Tooltip label="Agregar al carrito" bg="white" color={'gray.800'} fontSize={'1.2em'}>
                <chakra.a href={'#'} display={'flex'} onClick={() => addToCart(product)}>
                  <Icon as={FiShoppingCart} h={7} w={7} alignSelf={'center'} />
                </chakra.a>
              </Tooltip>
            </Flex>
            <Flex justifyContent="space-between" alignContent="center">
              <Box fontSize="2xl" color={useColorModeValue('gray.800', 'white')}>
                <Box as="span" color={'gray.600'} fontSize="lg">£</Box>
                {product.price}
              </Box>
            </Flex>
          </Box>
        </Box>
      </Flex>
    );
  };
  
  export default ProductItem;
  