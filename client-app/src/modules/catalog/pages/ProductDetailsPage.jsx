import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Image,
  Text,
  Heading,
  Badge,
  Button,
  HStack,
  Select,
  Input,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Grid,
  VStack,
  Icon,
  useColorModeValue,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  useNumberInput,
} from '@chakra-ui/react';
import { FaShoppingCart } from 'react-icons/fa';
import { FaInfoCircle, FaClipboardList } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import useToastNotification from '../../../hooks/useToastNotification';
import useProduct from '../hooks/useProduct';
import { useAuth } from '../../auth/context/AuthContext';

function ProductDetailsPage() {
  const { productId } = useParams();
  const { product, loading, error } = useProduct(productId);
  const { addToCart } = useCart();
  const { user } = useAuth();
  const showToast = useToastNotification();

  const [selectedVariation, setSelectedVariation] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);

  const bgColor = useColorModeValue('gray.50', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');

  // Manejo de cantidad
  const {
    getInputProps,
    getIncrementButtonProps,
    getDecrementButtonProps,
  } = useNumberInput({
    step: 1,
    value: quantity,
    onChange: (valueAsString, valueAsNumber) => setQuantity(valueAsNumber),
    min: 1,
    max: selectedVariation ? selectedVariation.stock : product?.details?.stock || 1,
  });

  useEffect(() => {
    if (product && product.details) {
      // Inicialmente, no se selecciona ninguna variación (producto principal)
      setSelectedVariation(null);
      setSelectedImage(product.imageURL || '');
    }
  }, [product]);

  useEffect(() => {
    // Actualizar la cantidad a 1 y la imagen al cambiar la variación
    setQuantity(1);
    if (selectedVariation) {
      if (selectedVariation.imageURL) {
        setSelectedImage(selectedVariation.imageURL);
      } else {
        setSelectedImage(product?.imageURL || '');
      }
    } else {
      // Si no hay variación seleccionada, usar la imagen del producto principal
      setSelectedImage(product?.imageURL || '');
    }
  }, [selectedVariation, product]);

  const handleAddToCart = () => {

    // Verificar stock
    const stockAvailable = selectedVariation
      ? selectedVariation.stock
      : product?.details?.stock || 0;
    if (stockAvailable < quantity) {
      showToast({
        title: 'Stock insuficiente',
        description: `Solo hay ${stockAvailable} unidades disponibles.`,
        status: 'error',
      });
      return;
    }
  
    // Obtener el nombre de la variación seleccionada
    const variationName = selectedVariation ? selectedVariation.name : '';
  
   
    addToCart(product, quantity, variationName);
    showToast({
      title: 'Producto agregado',
      description: `${product.name}${variationName ? ` (${variationName})` : ''} ha sido agregado al carrito (${quantity} unidades).`,
      status: 'success',
    });
  };

  if (loading) {
    return (
      <Box maxW="7xl" mx="auto" p={6} textAlign="center">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
        <Text>Cargando producto...</Text>
      </Box>
    );
  }

  if (error || !product) {
    return (
      <Box maxW="7xl" mx="auto" p={6} textAlign="center">
        <Text fontSize="xl" color="red.500">
          Error al cargar el producto.
        </Text>
      </Box>
    );
  }

  // Obtener precio y descuento según la variación seleccionada
  const price = selectedVariation ? selectedVariation.price : product?.price || 0;

  const discount = selectedVariation
    ? selectedVariation.discount
    : product?.details?.discount || 0;

  const hasDiscount = discount > 0;
  const discountedPrice = hasDiscount ? price * (1 - discount / 100) : price;

  // Stock disponible
  const stockAvailable = selectedVariation
    ? selectedVariation.stock
    : product?.details?.stock || 0;

  // SKU
  const sku = selectedVariation ? selectedVariation.sku : product?.details?.sku || '';

  return (
    <Box maxW="7xl" mx="auto" p={6}>
      <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={6}>
        {/* Imagen Principal */}
        <Box>
          <Image
            src={selectedImage}
            alt={product?.name || 'Producto'}
            rounded="lg"
            objectFit="cover"
            w="100%"
            h="auto"
          />
        </Box>

        {/* Información del Producto */}
        <Box>
          <Heading as="h2" fontSize="2xl" mb={4}>
            {selectedVariation ? selectedVariation.name : product?.name || 'Producto'}
          </Heading>
          <Text fontSize="lg" color="gray.500" mb={4}>
            SKU: {sku}
          </Text>

          {/* Badges */}
          <HStack spacing={2} mb={4}>
            {hasDiscount && (
              <Badge colorScheme="red" fontSize="md">
                {discount}% OFF
              </Badge>
            )}
            {stockAvailable > 0 ? (
              <Badge colorScheme="green" fontSize="md">
                En Stock
              </Badge>
            ) : (
              <Badge colorScheme="red" fontSize="md">
                Agotado
              </Badge>
            )}
          </HStack>

          {/* Precio */}
          <HStack spacing={4} mb={6}>
            {hasDiscount ? (
              <>
                <Text as="s" fontSize="2xl" color="gray.600">
                  ${price.toLocaleString()}
                </Text>
                <Text fontSize="3xl" fontWeight="bold" color="teal.500">
                  ${discountedPrice.toLocaleString()}
                </Text>
              </>
            ) : (
              <Text fontSize="3xl" fontWeight="bold" color="teal.500">
                ${price.toLocaleString()}
              </Text>
            )}
          </HStack>

          {/* Variaciones */}
          {product?.details?.variations && product.details.variations.length > 0 && (
            <Box mb={4}>
              <Text mb={2}>Variación:</Text>
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
                  // Actualizar la cantidad a 1 al cambiar la variación
                  setQuantity(1);
                }}
                mb={4}
              >
                {/* Opción para el producto principal */}
                <option value="">Producto principal</option>
                {product.details.variations.map((variation) => (
                  <option key={variation._id} value={variation.name}>
                    {variation.name}
                  </option>
                ))}
              </Select>
            </Box>
          )}

          {/* Cantidad */}
          <Box mb={6}>
            <Text mb={2}>Cantidad:</Text>
            <HStack maxW="200px">
              <Button {...getDecrementButtonProps()}>-</Button>
              <Input {...getInputProps()} readOnly textAlign="center" />
              <Button {...getIncrementButtonProps()}>+</Button>
            </HStack>
          </Box>

          {/* Botón Agregar al Carrito */}
          <Button
            leftIcon={<FaShoppingCart />}
            colorScheme="teal"
            size="lg"
            width="100%"
            mt={4}
            onClick={handleAddToCart}
            disabled={stockAvailable === 0}
          >
            Agregar al Carrito
          </Button>
        </Box>
      </Grid>

      {/* Tabs */}
      <Box mt={10}>
        <Tabs variant="soft-rounded" colorScheme="blue">
          <TabList>
            <Tab _selected={{ color: 'white', bg: 'blue.500' }}>
              <HStack spacing={2}>
                <Icon as={FaInfoCircle} />
                <Text>Descripción</Text>
              </HStack>
            </Tab>
            <Tab _selected={{ color: 'white', bg: 'blue.500' }}>
              <HStack spacing={2}>
                <Icon as={FaClipboardList} />
                <Text>Ficha Técnica</Text>
              </HStack>
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <VStack
                align="start"
                spacing={4}
                bg={bgColor}
                p={6}
                borderRadius="md"
                boxShadow="md"
              >
                <Text fontSize="xl" fontWeight="bold" color={textColor}>
                  Descripción del Producto
                </Text>
                <Box
                  dangerouslySetInnerHTML={{
                    __html: product?.details?.descriptionFull || '',
                  }}
                />
              </VStack>
            </TabPanel>
            <TabPanel>
              <VStack
                align="start"
                spacing={4}
                bg={bgColor}
                p={6}
                borderRadius="md"
                boxShadow="md"
              >
                <Text fontSize="xl" fontWeight="bold" color={textColor}>
                  Especificaciones Técnicas
                </Text>
                {product?.details?.specificationsArray ? (
                  <Table variant="simple" size="md" mt={4}>
                    <Thead>
                      <Tr>
                        <Th>Característica</Th>
                        <Th>Detalle</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {product.details.specificationsArray.map((spec, index) => (
                        <Tr key={`${spec.key}-${index}`}>
                          <Td>{spec.key}</Td>
                          <Td>{spec.value}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                ) : (
                  <Text>No hay especificaciones disponibles.</Text>
                )}
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
}

export default ProductDetailsPage;
