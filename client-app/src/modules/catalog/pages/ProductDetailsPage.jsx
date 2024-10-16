// /src/pages/catalog/ProductDetailsPage.jsx
import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box, Flex, Image, Text, Heading, Badge, Button, Stack, HStack, Select, 
  Input, Tabs, TabList, TabPanels, Tab, TabPanel, IconButton, Grid, VStack, 
  Icon, useColorModeValue, Table, Thead, Tbody, Tr, Th, Td, Spinner
} from '@chakra-ui/react';
import { FaShoppingCart, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { FaInfoCircle, FaClipboardList } from 'react-icons/fa';
import { productServices } from '../../dashboard/catalog/services/catalogService'; 

function ProductDetailsPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const bgColor = useColorModeValue('gray.50', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productServices.getProductById(productId);
        setProduct(response.data);
        setSelectedImage(response.data.details.images[0]); 
      } catch (error) {
        console.error('Error al cargar producto:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) {
    return <Box maxW="7xl" mx="auto" p={6}><Spinner
    thickness='4px'
    speed='0.65s'
    emptyColor='gray.200'
    color='blue.500'
    size='xl'
  /></Box>;
  }

  const handlePrevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : product.details.images.length - 1));
    setSelectedImage(product.details.images[currentIndex]);
  };

  const handleNextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex < product.details.images.length - 1 ? prevIndex + 1 : 0));
    setSelectedImage(product.details.images[currentIndex]);
  };

  if (!product) {
    return <Text>Producto no encontrado</Text>;
  }

  return (
    <Box maxW="7xl" mx="auto" p={6}>
      <Grid templateColumns={{ base: "1fr", lg: "100px 1fr 1fr" }} gap={6}>
        {/* Thumbnails */}
        <Stack direction={{ base: 'row', lg: 'column' }} spacing={2} overflowX={{ base: 'auto', lg: 'visible' }} overflowY={{ base: 'visible', lg: 'auto' }} maxHeight={{ lg: '400px' }}>
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
              border={selectedImage === image ? "2px solid teal" : "2px solid transparent"}
            />
          ))}
        </Stack>

        {/* Main Image */}
        <Box position="relative">
  <Image src={selectedImage} alt={product.name} rounded="lg" objectFit="cover" w="100%" h="400px" />
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
      _hover={{ bg: "whiteAlpha.900" }}
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
      _hover={{ bg: "whiteAlpha.900" }}
      size="lg"
    />
  </Flex>
</Box>

        {/* Product Info */}
        <Box>
          <Heading as="h2" fontSize="2xl" mb={4}>{product.name}</Heading>
          <Text fontSize="lg" color="gray.500" mb={4}>SKU: {product.details.sku}</Text>
          {product.details.discount && (
            <Badge colorScheme="red" fontSize="lg" mb={2}>-{product.details.discount}%</Badge>
          )}
          <HStack spacing={4} mb={6}>
            {product.details.discount ? (
              <>
                <Text as="s" fontSize="2xl" color="gray.600">$ {product.price * (1 - product.details.discount / 100)}</Text>
                <Text fontSize="3xl" fontWeight="bold">${product.price}</Text>
              </>
            ) : (
              <Text fontSize="3xl" fontWeight="bold">${product.price}</Text>
            )}
          </HStack>
          <Text fontSize="lg" color={product.details.inStock ? "green.600" : "red.600"} mb={4}>
            {product.status ? "En stock" : "Agotado"}
          </Text>
          <Box mb={4}>
            <Text mb={2}>Variedad:</Text>
            <Select placeholder="Selecciona una variedad">
              {product.details.variations.map((variation, index) => (
                <option key={index} value={variation}>{variation}</option>
              ))}
            </Select>
          </Box>
          <Box mb={6}>
            <Text mb={2}>Cantidad:</Text>
            <Input type="number" defaultValue={1} min={1} max={product.details.inStock} w="80px" />
          </Box>
          <Button leftIcon={<FaShoppingCart />} colorScheme="teal" size="lg" width="100%" disabled={!product.details.inStock}>
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
            <VStack align="start" spacing={4} bg={bgColor} p={6} borderRadius="md" boxShadow="md">
              <Text fontSize="xl" fontWeight="bold" color={textColor}>Descripción del Producto</Text>
              <Box dangerouslySetInnerHTML={{ __html: product.details.descriptionFull }} />
            </VStack>
          </TabPanel>
          <TabPanel>
            <VStack align="start" spacing={4} bg={bgColor} p={6} borderRadius="md" boxShadow="md">
              <Text fontSize="xl" fontWeight="bold" color={textColor}>Especificaciones Técnicas</Text>
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
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
    </Box>
  );
}

export default ProductDetailsPage;