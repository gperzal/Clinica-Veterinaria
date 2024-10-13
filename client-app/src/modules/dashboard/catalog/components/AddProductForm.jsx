import React, { useState } from 'react';
import {
  Box, Button, FormControl, FormLabel, Input,InputGroup, InputRightAddon, SimpleGrid, HStack, VStack, 
  Stepper, Step, StepTitle, StepDescription, StepIndicator, StepSeparator, StepStatus,
  IconButton, Textarea, Text, Switch, useBreakpointValue, Image,
   Menu, MenuButton, MenuList, MenuItem, Icon
} from '@chakra-ui/react';
import { FaHeart, FaBone, FaPaw, FaShower, FaBed, FaCar, FaCouch, FaTshirt } from 'react-icons/fa'
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';

const steps = [
  { title: "Información Básica", description: "Nombre, Categoría, etc." },
  { title: "Detalles del Producto", description: "Descripción, Precios, etc." },
  { title: "Inventario", description: "Cantidad disponible, SKU, etc." },
  { title: "Imágenes y Variaciones", description: "Subir imágenes, especificaciones, etc." }
];

const AddProductForm = ({ step, setStep, onProductCreate }) => {
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);
  const stepperOrientation = useBreakpointValue({ base: "vertical", md: "horizontal" });

  const [productData, setProductData] = useState({
    name: '',
    category: '',
    price: 0,
    description: '',
    imageURL: '',
    status: true,
    details: {
      stock: 0,
      sku: '',
      discount: 0,
      originalPrice: 0,     
      images: [],        
      descriptionFull: '',  
      specificationsArray: [],  
      variations: []           
    }
  });


  // Manejador para cambiar el estado de inStock
  const handleInStockChange = (e) => {
    setProductData({
      ...productData,
      status: e.target.checked
    });
  };

  



  // Manejador para agregar al array de especificaciones
  const handleAddSpecification = () => {
    setProductData({
      ...productData,
      details: {
        ...productData.details,
        specificationsArray: [...productData.details.specificationsArray, { key: '', value: '' }]
      }
    });
  };

  const handleSpecificationChange = (index, key, value) => {
    const updatedSpecifications = [...productData.details.specificationsArray];
    updatedSpecifications[index][key] = value;
    setProductData({
      ...productData,
      details: {
        ...productData.details,
        specificationsArray: updatedSpecifications
      }
    });
  };

  const handleRemoveSpecification = (index) => {
    const updatedSpecifications = [...productData.details.specificationsArray];
    updatedSpecifications.splice(index, 1);
    setProductData({
      ...productData,
      details: {
        ...productData.details,
        specificationsArray: updatedSpecifications
      }
    });
  };

  // Manejador para agregar al array de variaciones
  const handleAddVariation = () => {
    setProductData({
      ...productData,
      details: {
        ...productData.details,
        variations: [...productData.details.variations, '']
      }
    });
  };

  const handleVariationChange = (index, value) => {
    const updatedVariations = [...productData.details.variations];
    updatedVariations[index] = value;
    setProductData({
      ...productData,
      details: {
        ...productData.details,
        variations: updatedVariations
      }
    });
  };

  const handleRemoveVariation = (index) => {
    const updatedVariations = [...productData.details.variations];
    updatedVariations.splice(index, 1);
    setProductData({
      ...productData,
      details: {
        ...productData.details,
        variations: updatedVariations
      }
    });
  };

  // Manejador para imágenes adicionales
  const handleAddImage = () => {
    setProductData({
      ...productData,
      details: {
        ...productData.details,
        images: [...productData.details.images, ''] 
      }
    });
  };

  const handleImageChange = (index, value) => {
    const updatedImages = [...productData.details.images];
    updatedImages[index] = value;
    setProductData({
      ...productData,
      details: {
        ...productData.details,
        images: updatedImages
      }
    });
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...productData.details.images];
    updatedImages.splice(index, 1);
    setProductData({
      ...productData,
      details: {
        ...productData.details,
        images: updatedImages
      }
    });
  };

  const handleSubmit = () => {
    onProductCreate(productData);
  };

  const handleCategoryChange = (category) => {
    setProductData({
      ...productData,
      category,
    });
  };

 // Maneja los cambios en los campos básicos
 const handleInputChange = (e) => {
  const { name, value } = e.target;
  // Si cambia el precio o el descuento, recalculamos el precio
  if (name === 'price') {
    const priceValue = parseFloat(value) || 0;
    setProductData({
      ...productData,
      price: priceValue,
      originalPrice: priceValue, 
    });
  }else {
    setProductData({
      ...productData,
      [name]: value,
    });
  }
};

// Maneja los cambios en los detalles (incluyendo el descuento)
const handleDetailsChange = (e) => {
    const { name, value } = e.target;
    const discountValue = parseFloat(value) || 0;

    // Si aplicamos un descuento, recalculamos el precio basado en el originalPrice
    if (name === 'discount') {
      const newDiscountedPrice = productData.originalPrice * (1 - discountValue / 100);

      setProductData({
        ...productData,
        price: newDiscountedPrice, 
        details: {
          ...productData.details,
          [name]: discountValue, 
        },
      });
    } else {
      setProductData({
        ...productData,
        details: {
          ...productData.details,
          [name]: value,
        },
      });
    }
  };



  return (
    <Box>
      <Stepper size="lg" index={step} orientation={stepperOrientation}>
        {steps.map((stepInfo, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus complete={<Box color="green.500" />} />
            </StepIndicator>
            <Box>
              <StepTitle>{stepInfo.title}</StepTitle>
              <StepDescription>{stepInfo.description}</StepDescription>
            </Box>
            <StepSeparator />
          </Step>
        ))}
      </Stepper>

      <VStack spacing={4} mt={8}>
        {step === 0 && (
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="full">
            <FormControl>
              <FormLabel>Nombre del Producto</FormLabel>
              <Input name="name" value={productData.name} onChange={handleInputChange} placeholder="Nombre del Producto" />
            </FormControl>
            <FormControl>
              <FormLabel>Categoría</FormLabel>
                <Menu>
                <MenuButton as={Button} colorScheme="blue">
                  {productData.category || "Selecciona la Categoría"}
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => handleCategoryChange('Salud y Bienestar')}>
                    <HStack>
                      <Icon as={FaHeart} />
                      <span>Salud y Bienestar</span>
                    </HStack>
                  </MenuItem>
                  <MenuItem onClick={() => handleCategoryChange('Alimentos y Suplementos')}>
                    <HStack>
                      <Icon as={FaBone} />
                      <span>Alimentos y Suplementos</span>
                    </HStack>
                  </MenuItem>
                  <MenuItem onClick={() => handleCategoryChange('Juguetes')}>
                    <HStack>
                      <Icon as={FaPaw} />
                      <span>Juguetes</span>
                    </HStack>
                  </MenuItem>
                  <MenuItem onClick={() => handleCategoryChange('Higiene y Cuidado')}>
                    <HStack>
                      <Icon as={FaShower} />
                      <span>Higiene y Cuidado</span>
                    </HStack>
                  </MenuItem>
                  <MenuItem onClick={() => handleCategoryChange('Cama y Refugio')}>
                    <HStack>
                      <Icon as={FaBed} />
                      <span>Cama y Refugio</span>
                    </HStack>
                  </MenuItem>
                  <MenuItem onClick={() => handleCategoryChange('Transporte')}>
                    <HStack>
                      <Icon as={FaCar} />
                      <span>Transporte</span>
                    </HStack>
                  </MenuItem>
                  <MenuItem onClick={() => handleCategoryChange('Decoración y Muebles')}>
                    <HStack>
                      <Icon as={FaCouch} />
                      <span>Decoración y Muebles</span>
                    </HStack>
                  </MenuItem>
                  <MenuItem onClick={() => handleCategoryChange('Ropa y Accesorios')}>
                    <HStack>
                      <Icon as={FaTshirt} />
                      <span>Ropa y Accesorios</span>
                    </HStack>
                  </MenuItem>
                </MenuList>
              </Menu>
            </FormControl>
          </SimpleGrid>
        )}

          {step === 1 && (
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="full">
            <HStack  spacing={1}>
              {/* Input de Precio */}
              <FormControl>
                <FormLabel>Precio</FormLabel>
                <Input
                  name="price"
                  value={productData.price}
                  onChange={handleInputChange}
                  placeholder="Precio"
                  type="number"
                />
              </FormControl>

              {/* Mostrar el precio original y el precio con descuento (si aplica) */}
              {productData.details.discount > 0 && (
                <FormControl mt={7} ml={5}>
                  {/* Precio original tachado */}
                  <Text as="s" color="gray.500" w="full">
                    Precio original: ${productData.originalPrice}
                  </Text>
                  {/* Precio con descuento */}
                  <Text color="green.500" fontWeight="bold" w="full">
                    Precio con descuento: ${productData.price}
                  </Text>
                </FormControl>
              )}

              {/* Input de Descuento */}
              <FormControl>
                <FormLabel>Descuento</FormLabel>
                <InputGroup>
                <Input
                  name="discount"
                  value={productData.details.discount}
                  onChange={handleDetailsChange}
                  placeholder="Descuento (%)"
                  type="number"
                  w="40%"
                />
                <InputRightAddon>%</InputRightAddon>
                </InputGroup>
              </FormControl>
            </HStack>

            <FormControl >
              <FormLabel >Descripción</FormLabel>
              <Input
                name="description"
                value={productData.description}
                onChange={handleInputChange}
                placeholder="Descripción del Producto"
              />
            </FormControl>

            {/* Input de descripción completa que ocupe ambas columnas */}
            <FormControl gridColumn="1 / 3" >
              <FormLabel>Descripción Completa</FormLabel>
              <Textarea
                name="descriptionFull"
                value={productData.details.descriptionFull}
                onChange={handleDetailsChange}
                placeholder="Descripción Completa puedo usar <code> HTML"
              />
            </FormControl>
          </SimpleGrid>
        )}


        {step === 2 && (
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="full">
            <FormControl>
              <FormLabel>Stock</FormLabel>
              <Input name="stock" value={productData.details.stock} onChange={handleDetailsChange} placeholder="Cantidad en Inventario" type="number" />
            </FormControl>
            <FormControl>
              <FormLabel>SKU</FormLabel>
              <Input name="sku" value={productData.details.sku} onChange={handleDetailsChange} placeholder="SKU del Producto" />
            </FormControl>
            <FormControl display="flex" alignItems="center">
              <FormLabel>Estado</FormLabel>
              <Switch isChecked={productData.status} onChange={handleInStockChange} />
            </FormControl>
        
          </SimpleGrid>
        )}

        {step === 3 && (
          <>
            {/* Variaciones Dinámicas */}
            <VStack w="full" align="start">
              <FormLabel>Variaciones</FormLabel>
              {productData.details.variations.map((variation, index) => (
                <HStack key={index} w="full">
                  <Input
                    value={variation}
                    onChange={(e) => handleVariationChange(index, e.target.value)}
                    placeholder="Variación"
                  />
                  <IconButton
                    icon={<DeleteIcon />}
                    colorScheme="red"
                    onClick={() => handleRemoveVariation(index)}
                  />
                </HStack>
              ))}
              <Button onClick={handleAddVariation} leftIcon={<AddIcon />}>Agregar Variación</Button>
            </VStack>

            {/* Especificaciones Dinámicas */}
                <VStack w="full" align="start" spacing={4}>
          <FormLabel>Especificaciones</FormLabel>
          {productData.details.specificationsArray.map((specification, index) => (
            <HStack key={index} w="full" spacing={4}>
              <FormControl>
                <Input
                  placeholder="Característica"
                  value={specification.key}
                  onChange={(e) => handleSpecificationChange(index, 'key', e.target.value)}
                />
              </FormControl>
              <FormControl>
                <Input
                  placeholder="Detalle"
                  value={specification.value}
                  onChange={(e) => handleSpecificationChange(index, 'value', e.target.value)}
                />
              </FormControl>
              <IconButton
                icon={<DeleteIcon />}
                colorScheme="red"
                onClick={() => handleRemoveSpecification(index)}
              />
            </HStack>
          ))}
          <Button leftIcon={<AddIcon />} onClick={handleAddSpecification}>
            Agregar Especificación
          </Button>
        </VStack>

            {/* Imágenes Dinámicas */}
            <VStack w="full" align="start" mt={4}>
              {/* Imagen principal */}
              <FormControl>
                <FormLabel>Imagen Principal (URL)</FormLabel>
                <Input name="imageURL" value={productData.imageURL} onChange={handleInputChange} placeholder="URL de la Imagen Principal" />
                {productData.imageURL && (
                  <Image src={productData.imageURL} alt="Imagen Principal" boxSize="150px" mt={2} />
                )}
              </FormControl>
              <FormLabel>Imágenes Adicionales</FormLabel>
              {productData.details.images.map((image, index) => (
                <HStack key={index} w="full">
                  <Input
                    value={image}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                    placeholder="URL de la Imagen"
                  />
                  <IconButton
                    icon={<DeleteIcon />}
                    colorScheme="red"
                    onClick={() => handleRemoveImage(index)}
                  />
                </HStack>
              ))}
              <Button onClick={handleAddImage} leftIcon={<AddIcon />}>Agregar Imagen</Button>
            </VStack>
          </>
        )}

        <HStack w="full" justify="space-between">
          <Button variant="solid" size={{ base: 'sm', md: 'md' }} colorScheme="blue" onClick={prevStep} disabled={step === 0}>
            Atrás
          </Button>
          {step < steps.length - 1 ? (
            <Button variant="solid" size={{ base: 'sm', md: 'md' }} colorScheme="blue" onClick={nextStep}>
              Siguiente
            </Button>
          ) : (
            <Button colorScheme="blue" onClick={handleSubmit} size={{ base: 'sm', md: 'md' }}>
              Guardar
            </Button>
          )}
        </HStack>
      </VStack>
    </Box>
  );
};

export default AddProductForm;
