import React, { useState, useEffect } from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  Button, FormControl, FormLabel, Input, Select, VStack, HStack, Textarea, Image, Box,
  useColorModeValue, IconButton, Text, NumberInput, NumberInputField, NumberInputStepper,
  NumberIncrementStepper, NumberDecrementStepper, Tabs, TabList, TabPanels, Tab, TabPanel,
   SimpleGrid, Switch, AspectRatio,  useBreakpointValue
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import useToastNotification from '../../../../hooks/useToastNotification';

const EditProductModal = ({ product, isOpen, onClose, onSave }) => {
  const [editedProduct, setEditedProduct] = useState(product || {});
  const [activeTab, setActiveTab] = useState(0);
  const toast = useToastNotification();

  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const hoverBgColor = useColorModeValue("gray.50", "gray.700");

  const isMobile = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    if (product && product._id) {
      setEditedProduct(product);
    }
  }, [product]);

  // Manejo de cambios en los campos básicos
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  // Manejo de cambios en los detalles
  const handleDetailsChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({
      ...editedProduct,
      details: {
        ...editedProduct.details,
        [name]: value,
      },
    });
  };

  // Manejo del cambio de precio
  const handlePriceChange = (value) => {
    const parsedValue = parseFloat(value);
    if (!isNaN(parsedValue)) {
      setEditedProduct({
        ...editedProduct,
        price: parsedValue,
      });
    }
  };

  // Manejo del cambio de descuento
  const handleDiscountChange = (value) => {
    const discountValue = parseFloat(value) || 0;

    if (discountValue < 0 || discountValue > 100) {
      toast({
        title: 'Aviso',
        description: 'El descuento debe estar entre 0 y 100',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setEditedProduct({
      ...editedProduct,
      details: {
        ...editedProduct.details,
        discount: discountValue,
      },
    });
  };

  // Manejo de especificaciones
  const handleAddSpecification = () => {
    setEditedProduct({
      ...editedProduct,
      details: {
        ...editedProduct.details,
        specificationsArray: [...(editedProduct.details?.specificationsArray || []), { key: '', value: '' }]
      }
    });
  };

  const handleSpecificationChange = (index, key, value) => {
    const updatedSpecifications = [...(editedProduct.details?.specificationsArray || [])];
    updatedSpecifications[index][key] = value;
    setEditedProduct({
      ...editedProduct,
      details: { ...editedProduct.details, specificationsArray: updatedSpecifications }
    });
  };

  const handleRemoveSpecification = (index) => {
    const updatedSpecifications = [...(editedProduct.details?.specificationsArray || [])];
    updatedSpecifications.splice(index, 1);
    setEditedProduct({
      ...editedProduct,
      details: { ...editedProduct.details, specificationsArray: updatedSpecifications }
    });
  };

  // Manejo de variaciones
  const handleAddVariation = () => {
    setEditedProduct({
      ...editedProduct,
      details: {
        ...editedProduct.details,
        variations: [...(editedProduct.details?.variations || []), {
          name: '',
          sku: '',
          price: 0,
          discount: 0,
          stock: 0,
          imageURL: '',
        }]
      }
    });
  };

  const handleVariationChange = (index, key, value) => {
    const updatedVariations = [...(editedProduct.details?.variations || [])];
    updatedVariations[index][key] = value;
    setEditedProduct({
      ...editedProduct,
      details: { ...editedProduct.details, variations: updatedVariations }
    });
  };

  const handleRemoveVariation = (index) => {
    const updatedVariations = [...(editedProduct.details?.variations || [])];
    updatedVariations.splice(index, 1);
    setEditedProduct({
      ...editedProduct,
      details: { ...editedProduct.details, variations: updatedVariations }
    });
  };

  const handleSave = () => {
    if (!editedProduct._id) {
      toast({
        title: 'Error',
        description: 'No se puede actualizar un producto sin un ID válido.',
        status: 'error',
      });
      return;
    }
    onSave(editedProduct);
    onClose();
  };

  const tabStyles = {
    borderBottom: "2px solid",
    borderColor: "transparent",
    _selected: {
      color: "blue.500",
      borderColor: "blue.500",
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={isMobile ? "full" : "4xl"}>
      <ModalOverlay />
      <ModalContent bg={bgColor} color={textColor}>
        <ModalHeader borderBottomWidth="1px" borderColor={borderColor}>
          Editar Producto: {editedProduct.name}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Tabs index={activeTab} onChange={setActiveTab} variant="unstyled">
            <TabList overflowX="auto" overflowY="hidden" whiteSpace="nowrap" pb={2}>
              <Tab {...tabStyles}>Información Básica</Tab>
              <Tab {...tabStyles}>Detalles</Tab>
              <Tab {...tabStyles}>Inventario</Tab>
              <Tab {...tabStyles}>Especificaciones y Variaciones</Tab>
            </TabList>
            <TabPanels>
              {/* Información Básica */}
              <TabPanel>
                <VStack spacing={4} align="stretch">
                  <FormControl>
                    <FormLabel>Nombre del Producto</FormLabel>
                    <Input name="name" value={editedProduct.name || ''} onChange={handleInputChange} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Categoría</FormLabel>
                    <Select name="category" value={editedProduct.category || ''} onChange={handleInputChange}>
                      <option value="Salud y Bienestar">Salud y Bienestar</option>
                      <option value="Alimentos y Suplementos">Alimentos y Suplementos</option>
                      <option value="Juguetes">Juguetes</option>
                      <option value="Higiene y Cuidado">Higiene y Cuidado</option>
                      <option value="Cama y Refugio">Cama y Refugio</option>
                      <option value="Transporte">Transporte</option>
                      <option value="Decoración y Muebles">Decoración y Muebles</option>
                      <option value="Ropa y Accesorios">Ropa y Accesorios</option>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Descripción Corta</FormLabel>
                    <Input name="description" value={editedProduct.description || ''} onChange={handleInputChange} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Imagen Principal</FormLabel>
                    <Input name="imageURL" value={editedProduct.imageURL || ''} onChange={handleInputChange} />
                    {editedProduct.imageURL && (
                      <AspectRatio ratio={16 / 9} maxW="300px" mt={2}>
                        <Image src={editedProduct.imageURL} alt="Imagen Principal" objectFit="cover" borderRadius="md" />
                      </AspectRatio>
                    )}
                  </FormControl>
                </VStack>
              </TabPanel>
              {/* Detalles */}
              <TabPanel>
                <VStack spacing={4} align="stretch">
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                    <FormControl>
                      <FormLabel>Precio</FormLabel>
                      <NumberInput
                        value={editedProduct.price || 0}
                        onChange={handlePriceChange}
                        min={0}
                        precision={2}
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </FormControl>
                    <FormControl>
                      <FormLabel>Descuento (%)</FormLabel>
                      <NumberInput
                        value={editedProduct.details?.discount || 0}
                        onChange={handleDiscountChange}
                        min={0}
                        max={100}
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </FormControl>
                  </SimpleGrid>
                  {editedProduct.details?.discount > 0 && (
                    <Box p={2} bg={hoverBgColor} borderRadius="md">
                      <Text as="s" color="gray.500">Precio original: ${editedProduct.price}</Text>
                      <Text color="green.500" fontWeight="bold">
                        Precio con descuento: ${editedProduct.price * (1 - editedProduct.details.discount / 100)}
                      </Text>
                    </Box>
                  )}
                  <FormControl>
                    <FormLabel>Descripción Completa</FormLabel>
                    <Textarea
                      name="descriptionFull"
                      value={editedProduct.details?.descriptionFull || ''}
                      onChange={handleDetailsChange}
                      rows={6}
                    />
                  </FormControl>
                </VStack>
              </TabPanel>
    
              {/* Inventario */}
              <TabPanel>
                <VStack spacing={4} align="stretch">
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                    <FormControl>
                      <FormLabel>Stock</FormLabel>
                      <NumberInput
                        value={editedProduct.details?.stock || 0}
                        onChange={(valueString, valueNumber) => handleDetailsChange({ target: { name: 'stock', value: valueNumber } })}
                        min={0}
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </FormControl>
                    <FormControl>
                      <FormLabel>SKU</FormLabel>
                      <Input name="sku" value={editedProduct.details?.sku || ''} onChange={handleDetailsChange} />
                    </FormControl>
                  </SimpleGrid>
                  <FormControl>
                    <FormLabel>Estado</FormLabel>
                    <Switch
                      isChecked={editedProduct.status}
                      onChange={(e) => setEditedProduct({ ...editedProduct, status: e.target.checked })}
                      size="lg"
                    />
                    <Text mt={2} fontSize="sm" color={editedProduct.status ? "green.500" : "red.500"}>
                      {editedProduct.status ? "Activo" : "Inactivo"}
                    </Text>
                  </FormControl>
                </VStack>
              </TabPanel>
              {/* Especificaciones y Variaciones */}
              <TabPanel>
                <VStack spacing={4} align="stretch">
                  {/* Especificaciones */}
                  <FormControl>
                    <FormLabel>Especificaciones</FormLabel>
                    <VStack spacing={2} align="stretch">
                      {editedProduct.details?.specificationsArray?.map((specification, index) => (
                        <HStack key={index}>
                          <Input
                            placeholder="Característica"
                            value={specification.key}
                            onChange={(e) => handleSpecificationChange(index, 'key', e.target.value)}
                          />
                          <Input
                            placeholder="Detalle"
                            value={specification.value}
                            onChange={(e) => handleSpecificationChange(index, 'value', e.target.value)}
                          />
                          <IconButton
                            icon={<DeleteIcon />}
                            colorScheme="red"
                            onClick={() => handleRemoveSpecification(index)}
                          />
                        </HStack>
                      ))}
                      <Button onClick={handleAddSpecification} leftIcon={<AddIcon />} size="sm">
                        Agregar Especificación
                      </Button>
                    </VStack>
                  </FormControl>
                  {/* Variaciones */}
                  <FormControl>
                    <FormLabel>Variaciones</FormLabel>
                    <VStack spacing={4} align="stretch">
                      {editedProduct.details?.variations?.map((variation, index) => (
                        <Box key={index} p={4} borderWidth={1} borderRadius="md" w="full">
                          <HStack w="full">
                            <FormControl>
                              <FormLabel>Nombre</FormLabel>
                              <Input
                                value={variation.name}
                                onChange={(e) => handleVariationChange(index, 'name', e.target.value)}
                                placeholder="Nombre de la Variación"
                              />
                            </FormControl>
                            <FormControl>
                              <FormLabel>SKU</FormLabel>
                              <Input
                                value={variation.sku}
                                onChange={(e) => handleVariationChange(index, 'sku', e.target.value)}
                                placeholder="SKU de la Variación"
                              />
                            </FormControl>
                          </HStack>
                          <HStack w="full" mt={4}>
                            <FormControl>
                              <FormLabel>Precio</FormLabel>
                              <Input
                                type="number"
                                value={variation.price}
                                onChange={(e) => handleVariationChange(index, 'price', e.target.value)}
                                placeholder="Precio de la Variación"
                              />
                            </FormControl>
                            <FormControl>
                              <FormLabel>Descuento (%)</FormLabel>
                              <Input
                                type="number"
                                value={variation.discount}
                                onChange={(e) => handleVariationChange(index, 'discount', e.target.value)}
                                placeholder="Descuento de la Variación"
                              />
                            </FormControl>
                          </HStack>
                          <HStack w="full" mt={4}>
                            <FormControl>
                              <FormLabel>Stock</FormLabel>
                              <Input
                                type="number"
                                value={variation.stock}
                                onChange={(e) => handleVariationChange(index, 'stock', e.target.value)}
                                placeholder="Stock de la Variación"
                              />
                            </FormControl>
                            <FormControl>
                              <FormLabel>Imagen URL</FormLabel>
                              <Input
                                value={variation.imageURL}
                                onChange={(e) => handleVariationChange(index, 'imageURL', e.target.value)}
                                placeholder="URL de la Imagen de la Variación"
                              />
                            </FormControl>
                          </HStack>
                          <IconButton
                            mt={4}
                            icon={<DeleteIcon />}
                            colorScheme="red"
                            onClick={() => handleRemoveVariation(index)}
                            aria-label="Eliminar Variación"
                          />
                        </Box>
                      ))}
                      <Button onClick={handleAddVariation} leftIcon={<AddIcon />} size="sm">
                        Agregar Variación
                      </Button>
                    </VStack>
                  </FormControl>
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
        <ModalFooter borderTopWidth="1px" borderColor={borderColor}>
          <Button colorScheme="blue" mr={3} onClick={handleSave}>
            Guardar Cambios
          </Button>
          <Button variant="ghost" onClick={onClose}>Cancelar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditProductModal;
