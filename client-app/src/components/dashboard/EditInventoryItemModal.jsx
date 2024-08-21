import React, { useState, useEffect } from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  Button, FormControl, FormLabel, Input, Select, VStack, Textarea, Box
} from "@chakra-ui/react";

const EditInventoryItemModal = ({ item, isOpen, onClose, onSave }) => {
  const [editedItem, setEditedItem] = useState(item || {});

  useEffect(() => {
    setEditedItem(item || {});
  }, [item]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedItem({ ...editedItem, [name]: value });
  };

  const handleSave = () => {
    onSave(editedItem);
    onClose();
  };

  if (!item) {
    return null;  // No renderizar nada si no hay artículo seleccionado
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent border="1px solid #E2E8F0" borderRadius="md" p={4} boxShadow="lg">
        <ModalHeader textAlign="center">Editar Artículo</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Nombre del Artículo</FormLabel>
              <Input
                name="name"
                value={editedItem.name || ''}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Categoría</FormLabel>
              <Select
                name="category"
                value={editedItem.category || ''}
                onChange={handleInputChange}
              >
                <option value="Herramientas Médicas">Herramientas Médicas</option>
                <option value="Medicamentos">Medicamentos</option>
                <option value="Insumos">Insumos</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Descripción</FormLabel>
              <Textarea
                name="description"
                value={editedItem.description || ''}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Fecha de Expiración</FormLabel>
              <Input
                name="expirationDate"
                type="date"
                value={editedItem.expirationDate || ''}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Stock</FormLabel>
              <Input
                name="stock"
                type="number"
                value={editedItem.stock || ''}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>SKU</FormLabel>
              <Input
                name="sku"
                value={editedItem.sku || ''}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Estado</FormLabel>
              <Select
                name="status"
                value={editedItem.status || ''}
                onChange={handleInputChange}
              >
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </Select>
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

export default EditInventoryItemModal;
