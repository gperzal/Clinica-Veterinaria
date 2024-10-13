import React from 'react';
import { 
  Modal, 
  ModalOverlay, 
  ModalContent, 
  ModalHeader, 
  ModalCloseButton, 
  ModalBody, 
  ModalFooter, 
  Button, 
  Text, 
  Box, 
  useColorModeValue 
} from '@chakra-ui/react';

const ConfirmationModal = ({ isOpen, onClose, selectedDoctor, selectedDate, selectedTime, onConfirm }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent 
        bg={useColorModeValue('white', 'gray.800')} 
        borderRadius="lg" 
        boxShadow="xl"
        border="1px solid #E2E8F0"
      >
        <ModalHeader textAlign="center" fontSize="2xl" fontWeight="bold">
          Confirmar Cita
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody textAlign="center" p={6}>
          <Box mb={4}>
            <Text fontSize="lg">Estás a punto de confirmar una cita con:</Text>
            <Text fontSize="xl" fontWeight="bold" mt={2} mb={4}>{selectedDoctor}</Text>
          </Box>
          <Box>
            <Text fontSize="md"><strong>Fecha:</strong> {selectedDate}</Text>
            <Text fontSize="md" mt={2}><strong>Hora:</strong> {selectedTime}</Text>
          </Box>
        </ModalBody>
        <ModalFooter justifyContent="center">
          <Button 
            colorScheme="blue" 
            mr={3} 
            onClick={onConfirm}
            borderRadius="full"
            px={8}
            boxShadow="md"
          >
            Confirmar
          </Button>
          <Button 
            variant="ghost" 
            onClick={onClose}
            borderRadius="full"
            px={8}
            boxShadow="md"
          >
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmationModal;
