import React from 'react';
import { HStack, Button, Text } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const Paginator = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <HStack justify="space-between" align="center" mt={4}>
      {/* Botón de página anterior */}
      <Button
        leftIcon={<ChevronLeftIcon />}
        onClick={handlePrevious}
        disabled={currentPage === 1}
        colorScheme="blue"
        variant="outline"
      >
        Anterior
      </Button>

      {/* Indicador de página actual */}
      <Text>
        Página {currentPage} de {totalPages}
      </Text>

      {/* Botón de página siguiente */}
      <Button
        rightIcon={<ChevronRightIcon />}
        onClick={handleNext}
        disabled={currentPage === totalPages}
        colorScheme="blue"
        variant="outline"
      >
        Siguiente
      </Button>
    </HStack>
  );
};

export default Paginator;
