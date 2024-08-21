import React, { useState, useEffect } from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  Button, FormControl, FormLabel, Input, Select, VStack, HStack, Icon, Textarea, Image, Box
} from "@chakra-ui/react";
import { FaPaw } from 'react-icons/fa';

const EditProductModal = ({ product, isOpen, onClose, onSave }) => {
  const [editedProduct, setEditedProduct] = useState(product || {});

  useEffect(() => {
    setEditedProduct(product || {});
  }, [product]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedProduct({ ...editedProduct, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onSave(editedProduct);
    onClose();
  };

  if (!product) {
    return null;  // No renderizar nada si no hay producto seleccionado
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} >
      <ModalOverlay />
      <ModalContent border="1px solid #E2E8F0" borderRadius="md" p={4} boxShadow="lg">
        <ModalHeader>Editar Producto</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Nombre del Producto</FormLabel>
              <Input
                name="name"
                value={editedProduct.name || ''}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Categoría</FormLabel>
              <Select
                name="category"
                value={editedProduct.category || ''}
                onChange={handleInputChange}
              >
                <option value="cat1">Categoría 1</option>
                <option value="cat2">Categoría 2</option>
                <option value="cat3">Categoría 3</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Precio</FormLabel>
              <Input
                name="price"
                type="number"
                value={editedProduct.price || ''}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Descripción</FormLabel>
              <Textarea
                name="description"
                value={editedProduct.description || ''}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Rating</FormLabel>
              <HStack>
                {[1, 2, 3, 4, 5].map((num) => (
                  <Icon
                    key={num}
                    as={FaPaw}
                    color={num <= editedProduct.rating ? "blue.500" : "gray.300"}
                    boxSize={6}
                    onClick={() => setEditedProduct({ ...editedProduct, rating: num })}
                    cursor="pointer"
                  />
                ))}
              </HStack>
            </FormControl>
            <FormControl>
              <FormLabel>Estado</FormLabel>
              <Select
                name="status"
                value={editedProduct.status || ''}
                onChange={handleInputChange}
              >
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Stock</FormLabel>
              <Input
                name="stock"
                type="number"
                value={editedProduct.stock || ''}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>SKU</FormLabel>
              <Input
                name="sku"
                value={editedProduct.sku || ''}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Imagen</FormLabel>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {editedProduct.image && (
                <Box mt={4}>
                  <Image src={editedProduct.image} alt="Product Image" boxSize="150px" objectFit="cover" />
                </Box>
              )}
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSave}>
            Guardar
          </Button>
          <Button variant="ghost" onClick={onClose}>Cancelar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditProductModal;
