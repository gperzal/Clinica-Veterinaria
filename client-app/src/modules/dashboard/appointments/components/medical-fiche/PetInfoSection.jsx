
import React , { useState, useEffect  } from 'react';
import { SimpleGrid, FormControl, FormLabel, Input, Select, Stack, Switch, Heading, useColorModeValue, Box } from '@chakra-ui/react';

const PetInfoSection = ({ petData, onPetDataChange }) => {
  const labelColor = useColorModeValue("teal.600", "teal.300"); 

  const [healthStatus, setHealthStatus] = useState(petData?.healthStatus || '');
  const [status, setStatus] = useState(petData?.status === 'Activo');
  

  useEffect(() => {
    onPetDataChange({
      healthStatus,
      status: status ? 'Activo' : 'Inactivo',
    });
  }, [healthStatus, status, onPetDataChange]);


  return (
    <Box as="section" w="full" p={4} borderWidth="1px" borderRadius="lg" bg={useColorModeValue("gray.50", "gray.800")}>
      <Heading size="md" color="teal.500" mb={4}>Información Mascota</Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4} mt={4}>
        <FormControl>
          <FormLabel color={labelColor}>Nombre Mascota</FormLabel>
          <Input value={petData?.name || ''} isDisabled />
        </FormControl>
        <FormControl>
          <FormLabel color={labelColor}>Edad</FormLabel>
          <Input value={petData?.age || ''} isDisabled />
        </FormControl>
        <FormControl>
          <FormLabel color={labelColor}>Raza</FormLabel>
          <Input value={petData?.breed || ''} isDisabled />
        </FormControl>
        <FormControl>
          <FormLabel color={labelColor}>Color</FormLabel>
          <Input value={petData?.color || ''} isDisabled />
        </FormControl>
        <FormControl>
          <FormLabel color={labelColor}>Sexo</FormLabel>
          <Input value={petData?.sex || ''} isDisabled />
        </FormControl>
        <FormControl>
          <FormLabel color={labelColor}>Número de Chip</FormLabel>
          <Input value={petData?.chipNumber || 'N/A'} isDisabled />
        </FormControl>
        <FormControl>
          <FormLabel color={labelColor}>Estado de Salud General</FormLabel>
          <Select
            value={healthStatus}
            onChange={(e) => setHealthStatus(e.target.value)}
            placeholder="Selecciona una opción"
          >
            <option value="Sano">Sano</option>
            <option value="En tratamiento">En tratamiento</option>
            <option value="Enfermo">Enfermo</option>
            <option value="En peligro">En peligro</option>
            <option value="En observación">En observación</option>
          </Select>
        </FormControl>
        <FormControl>
        <FormLabel color={labelColor}>Estado</FormLabel>
        <Stack direction="row">
          <Switch 
            colorScheme="teal" 
            size="lg" 
            isChecked={status}
            onChange={(e) => setStatus(e.target.checked)}
          />
        </Stack>
      </FormControl>

      </SimpleGrid>
    </Box>
  );
};

export default PetInfoSection;
