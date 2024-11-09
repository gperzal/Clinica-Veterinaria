// client-app/src/modules/catalog/components/cart/CartItem.jsx
import React from 'react';
import { 
  Flex, Image, Box, Text, Button, Stack, IconButton, HStack, useColorModeValue 
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

const CartItem = ({ name, description, price, quantity, imageUrl, currency, onRemove, onUpdateQuantity }) => {
  return (
    <Flex 
      direction={{ base: 'column', md: 'row' }} 
      justify="space-between" 
      align="center" 
      borderWidth="1px" 
      borderRadius="lg" 
      p="4" 
      shadow="sm" 
      bg={useColorModeValue('gray.100', 'gray.800')}
    >
      <Flex align="center" w={{ base: 'full', md: 'auto' }}>
        <Image boxSize="100px" src={imageUrl} alt={name} borderRadius="md" mr="4" />
        <Box flex="1">
          <Text fontWeight="bold" fontSize="lg">{name}</Text>
          <Text color="gray.500" fontSize="sm">{description}</Text>
          <Text fontWeight="semibold" mt="2">{currency} {price.toFixed(2)}</Text>
        </Box>
      </Flex>

      {/* Controles de Cantidad y Eliminación */}
      <HStack mt={{ base: 4, md: 0 }} spacing="4" justify="space-between">
        <HStack maxW="100px">
          <Button size="sm" variant="outline" onClick={() => onUpdateQuantity(quantity - 1)}>-</Button>
          <Text>{quantity}</Text>
          <Button size="sm" variant="outline" onClick={() => onUpdateQuantity(quantity + 1)}>+</Button>
        </HStack>
        <IconButton 
          aria-label="Eliminar" 
          icon={<CloseIcon />} 
          colorScheme="red" 
          size="sm" 
          onClick={onRemove} 
        />
      </HStack>
    </Flex>
  );
};

export default CartItem;
