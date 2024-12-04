import React from 'react';
import { 
  Box, Textarea, VStack, Heading, useColorModeValue, FormControl, FormLabel, Switch 
} from '@chakra-ui/react';
import { NotesProps } from '../../utils/validateProps';


const NotesSection = ({ 
  isClinicalRest, 
  onToggleClinicalRest, 
  notes, 
  setNotes 
}) => {
  const bg = useColorModeValue("gray.50", "gray.800");

  // Manejar cambios en el textarea
  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  return (
    <Box as="section" w="full" p={4} borderWidth="1px" borderRadius="lg" bg={bg}>
      <Heading size="md" color="teal.500" mb={4}>
        Notas y Observaciones del Veterinario
      </Heading>
      <VStack align="start" spacing={4}>
        {/* Switch para activar/desactivar Reposo Clínico */}
        <FormControl display="flex" alignItems="center">
          <FormLabel mb="0" color="teal.500" fontWeight="bold">
            Reposo Clínico (¿Requiere quedarse en la clínica?)
          </FormLabel>
          <Switch 
            size="lg" 
            colorScheme="teal" 
            isChecked={isClinicalRest} 
            onChange={onToggleClinicalRest} 
          />
        </FormControl>
        
        {/* Textarea controlado para las notas */}
        <Textarea 
          placeholder="Escriba las notas de la cita aquí..." 
          value={notes}
          onChange={handleNotesChange}
          rows={6}
        />
      </VStack>
    </Box>
  );
};

NotesSection.propTypes = NotesProps;

export default NotesSection;
