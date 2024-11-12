// src/modules/catalog/pages/ProductDetailsPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Flex,
  Image,
  Text,
  Heading,
  Badge,
  Button,
  Stack,
  HStack,
  Select,
  Input,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  IconButton,
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
import { FaShoppingCart, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
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
  const [selectedVariation, setSelectedVariation] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const bgColor = useColorModeValue('gray.50', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');

  const {
    getInputProps,
    getIncrementButtonProps,
    getDecrementButtonProps,
    value: quantity,
  } = useNumberInput({
    step: 1,
    defaultValue: 1,
    min: 1,
    max: product?.details.stock || 1,
  });

  useEffect(() => {
    if (product) {
      setSelectedImage(product.details.images[0]);
    }
  }, [product]);

  const handleAddToCart = () => {
    // Verificar si el usuario está autenticado
    if (!user) {
      showToast({
        title: 'Debes iniciar sesión',
        description: 'Por favor, inicia sesión para agregar productos al carrito.',
        status: 'warning',
      });
      return;
    }
  
    // Verificar si el producto tiene variaciones
    const hasVariations = product && product.details && product.details.variations && product.details.variations.length > 0;
  
    // Si el producto tiene variaciones, validar que se haya seleccionado una
    if (hasVariations) {
      if (selectedVariation === '') {
        showToast({
          title: 'Selecciona una variación',
          description: 'Por favor, selecciona una variación antes de agregar al carrito.',
          status: 'warning',
        });
        return;
      }
    }
  
    // Agregar el producto al carrito
    addToCart(product, parseInt(quantity), hasVariations ? selectedVariation : undefined);
    
  };

  const handlePrevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : product.details.images.length - 1
    );
    setSelectedImage(product.details.images[currentIndex]);
  };

  const handleNextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < product.details.images.length - 1 ? prevIndex + 1 : 0
    );
    setSelectedImage(product.details.images[currentIndex]);
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

  return (
    <Box maxW="7xl" mx="auto" p={6}>
      <Grid
        templateColumns={{ base: '1fr', lg: '100px 1fr 1fr' }}
        gap={6}
      >
        {/* Thumbnails */}
        <Stack
          direction={{ base: 'row', lg: 'column' }}
          spacing={2}
          overflowX={{ base: 'auto', lg: 'visible' }}
          overflowY={{ base: 'visible', lg: 'auto' }}
          maxHeight={{ lg: '400px' }}
        >
          {product.details.images.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt={`Thumbnail ${index + 1}`}
              onClick={() => {
                setSelectedImage(image);
                setCurrentIndex(index);
              }}
              cursor="pointer"
              boxSize="75px"
              objectFit="cover"
              border={
                selectedImage === image
                  ? '2px solid teal'
                  : '2px solid transparent'
              }
            />
          ))}
        </Stack>

        {/* Main Image */}
        <Box position="relative">
          <Image
            src={selectedImage}
            alt={product.name}
            rounded="lg"
            objectFit="cover"
            w="100%"
            h="400px"
          />
          <Flex
            position="absolute"
            top="0"
            bottom="0"
            left="0"
            right="0"
            alignItems="center"
            justifyContent="space-between"
          >
            <IconButton
              icon={<FaChevronLeft />}
              aria-label="Previous Image"
              onClick={handlePrevImage}
              ml={2}
              variant="solid"
              bg="whiteAlpha.700"
              color="gray.800"
              _hover={{ bg: 'whiteAlpha.900' }}
              size="lg"
            />
            <IconButton
              icon={<FaChevronRight />}
              aria-label="Next Image"
              onClick={handleNextImage}
              mr={2}
              variant="solid"
              bg="whiteAlpha.700"
              color="gray.800"
              _hover={{ bg: 'whiteAlpha.900' }}
              size="lg"
            />
          </Flex>
        </Box>

        {/* Product Info */}
        <Box>
          <Heading as="h2" fontSize="2xl" mb={4}>
            {product.name}
          </Heading>
          <Text fontSize="lg" color="gray.500" mb={4}>
            SKU: {product.details.sku}
          </Text>
          {product.details.discount > 0 && (
            <Badge colorScheme="red" fontSize="lg" mb={2}>
              -{product.details.discount}%
            </Badge>
          )}
          <HStack spacing={4} mb={6}>
            {product.details.discount ? (
              <>
                <Text
                  as="s"
                  fontSize="2xl"
                  color="gray.600"
                >
                  $
                  {(
                    product.price *
                    (1 - product.details.discount / 100)
                  ).toLocaleString()}
                </Text>
                <Text
                  fontSize="3xl"
                  fontWeight="bold"
                >
                  ${product.price.toLocaleString()}
                </Text>
              </>
            ) : (
              <Text fontSize="3xl" fontWeight="bold">
                ${product.price.toLocaleString()}
              </Text>
            )}
          </HStack>
          <Text
            fontSize="lg"
            color={product.details.stock ? 'green.600' : 'red.600'}
            mb={4}
          >
            {product.details.stock ? 'En Stock' : 'Agotado'}
          </Text>
          {product.details.variations.length > 0 && (
            <Box mb={4}>
              <Text mb={2}>Variación:</Text>
              <Select
                placeholder="Selecciona una variación"
                value={selectedVariation}
                onChange={(e) =>
                  setSelectedVariation(e.target.value)
                }
                mb={4}
              >
                {product.details.variations.map((variation, index) => (
                  <option key={index} value={variation}>
                    {variation}
                  </option>
                ))}
              </Select>
            </Box>
          )}
          <Box mb={6}>
            <Text mb={2}>Cantidad:</Text>
            <HStack maxW="320px">
              <Button {...getDecrementButtonProps()}>-</Button>
              <Input {...getInputProps()} readOnly />
              <Button {...getIncrementButtonProps()}>+</Button>
            </HStack>
          </Box>
          <Button
            leftIcon={<FaShoppingCart />}
            colorScheme="teal"
            size="lg"
            width="100%"
            mt={4}
            onClick={handleAddToCart}
            disabled={
              !product.details.stock ||
              (product.details.variations.length > 0 &&
                selectedVariation === '')
            }
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
                <Text
                  fontSize="xl"
                  fontWeight="bold"
                  color={textColor}
                >
                  Descripción del Producto
                </Text>
                <Box
                  dangerouslySetInnerHTML={{
                    __html: product.details.descriptionFull,
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
                <Text
                  fontSize="xl"
                  fontWeight="bold"
                  color={textColor}
                >
                  Especificaciones Técnicas
                </Text>
                <Table
                  variant="simple"
                  size="md"
                  mt={4}
                >
                  <Thead>
                    <Tr>
                      <Th>Característica</Th>
                      <Th>Detalle</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {product.details.specificationsArray.map(
                      (spec, index) => (
                        <Tr
                          key={`${spec.key}-${index}`}
                        >
                          <Td>{spec.key}</Td>
                          <Td>{spec.value}</Td>
                        </Tr>
                      )
                    )}
                  </Tbody>
                </Table>
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
}

export default ProductDetailsPage;
