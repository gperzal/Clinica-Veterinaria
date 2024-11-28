import React from 'react';
import {
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  Heading,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Select,
  useColorModeValue,
  Box,
} from '@chakra-ui/react';
import {
  FaWeight,
  FaThermometerHalf,
  FaHeartbeat,
  FaLungs,
  FaTint,
  FaTachometerAlt,
  FaStethoscope,
  FaEye,
  FaRunning,
  FaUtensils,
  FaNotesMedical 
} from 'react-icons/fa';
import { SiComicfury } from "react-icons/si";
import { MdOutlinePets } from "react-icons/md";
const MedicalInfoSection = ({ medicalInfo, setMedicalInfo }) => {
  const labelColor = useColorModeValue('teal.600', 'teal.300'); // Define el color dinámico para el label

  const handleChange = (field, value) => {
    setMedicalInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Box
      as="section"
      w="full"
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Heading size="md" color="teal.500" mb={4}>
        Información Médica
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
        {/* Peso */}
        <FormControl>
          <FormLabel color={labelColor}>Peso</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <FaWeight color="gray.300" />
            </InputLeftElement>
            <Input
              placeholder="Peso"
              type="number"
              value={medicalInfo.weight || ''}
              onChange={(e) => handleChange('weight', e.target.value)}
            />
            <InputRightElement pointerEvents="none">
              kg
            </InputRightElement>
          </InputGroup>
        </FormControl>

        {/* Temperatura */}
        <FormControl>
          <FormLabel color={labelColor}>Temperatura</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <FaThermometerHalf color="gray.300" />
            </InputLeftElement>
            <Input
              placeholder="Temperatura"
              type="number"
              value={medicalInfo.temperature || ''}
              onChange={(e) => handleChange('temperature', e.target.value)}
            />
            <InputRightElement pointerEvents="none">
              °C
            </InputRightElement>
          </InputGroup>
        </FormControl>

        {/* Frecuencia Cardíaca */}
        <FormControl>
          <FormLabel color={labelColor}>Frecuencia Cardíaca</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <FaHeartbeat color="gray.300" />
            </InputLeftElement>
            <Input
              placeholder="Frecuencia Cardíaca"
              type="number"
              value={medicalInfo.heartRate || ''}
              onChange={(e) => handleChange('heartRate', e.target.value)}
            />
            <InputRightElement pointerEvents="none" mr={2}>
              bpm
            </InputRightElement>
          </InputGroup>
        </FormControl>

        {/* Frecuencia Respiratoria */}
        <FormControl>
          <FormLabel color={labelColor}>Frecuencia Respiratoria</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <FaLungs color="gray.300" />
            </InputLeftElement>
            <Input
              placeholder="Frecuencia Respiratoria"
              type="number"
              value={medicalInfo.respiratoryRate || ''}
              onChange={(e) => handleChange('respiratoryRate', e.target.value)}
            />
            <InputRightElement pointerEvents="none" mr={1}>
              rpm
            </InputRightElement>
          </InputGroup>
        </FormControl>

        {/* Índice de Condición Corporal */}
        <FormControl>
          <FormLabel color={labelColor}>Índice de Condición Corporal</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <FaTachometerAlt color="gray.300" />
            </InputLeftElement>
            <Input
              placeholder="1-9"
              type="number"
              min={1}
              max={9}
              value={medicalInfo.bodyCondition || ''}
              onChange={(e) => handleChange('bodyCondition', e.target.value)}
            />
          </InputGroup>
        </FormControl>

        {/* Nivel de Hidratación */}
        <FormControl>
          <FormLabel color={labelColor}>Nivel de Hidratación</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <FaTint color="gray.300" />
            </InputLeftElement>
            <Input
              placeholder="Hidratación"
              type="number"
              min={1}
              max={100}
              value={medicalInfo.hydrationLevel || ''}
              onChange={(e) => handleChange('hydrationLevel', e.target.value)}
            />
            <InputRightElement pointerEvents="none">
              %
            </InputRightElement>
          </InputGroup>
        </FormControl>

        {/* Presión Sistólica */}
        <FormControl>
          <FormLabel color={labelColor}>Presión Sistólica</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <FaStethoscope color="gray.300" />
            </InputLeftElement>
            <Input
              placeholder="Presión Sistólica"
              type="number"
              min={0}
              max={200}
              value={medicalInfo.systolicPressure || ''}
              onChange={(e) => handleChange('systolicPressure', e.target.value)}
            />
            <InputRightElement pointerEvents="none" mr={4}>
              mmHg
            </InputRightElement>
          </InputGroup>
        </FormControl>

        {/* Presión Diastólica */}
        <FormControl>
          <FormLabel color={labelColor}>Presión Diastólica</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <FaStethoscope color="gray.300" />
            </InputLeftElement>
            <Input
              placeholder="Presión Diastólica"
              type="number"
              min={0}
              max={200}
              value={medicalInfo.diastolicPressure || ''}
              onChange={(e) => handleChange('diastolicPressure', e.target.value)}
            />
            <InputRightElement pointerEvents="none" mr={4}>
              mmHg
            </InputRightElement>
          </InputGroup>
        </FormControl>

        {/* Color de las Mucosas */}
        <FormControl>
          <FormLabel color={labelColor}>Color de las Mucosas</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <FaEye color="gray.300" />
            </InputLeftElement>
            <Input
              placeholder="Color de las Mucosas"
              type="text"
              value={medicalInfo.mucosaColor || ''}
              onChange={(e) => handleChange('mucosaColor', e.target.value)}
            />
          </InputGroup>
        </FormControl>

        {/* Observaciones de Mucosas */}
        <FormControl>
          <FormLabel color={labelColor}>Observaciones de Mucosas</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <FaNotesMedical color="gray.300" />
            </InputLeftElement>
          <Input
            placeholder="Observaciones adicionales"
            type="text"
            value={medicalInfo.mucosaObservations || ''}
            onChange={(e) => handleChange('mucosaObservations', e.target.value)}
          />
        </InputGroup>
        </FormControl>

        {/* Nivel de Actividad */}
        <FormControl>
          <FormLabel color={labelColor}>Nivel de Actividad</FormLabel>
          <InputGroup >
            <InputLeftElement pointerEvents="none" >
              <FaRunning color="gray.300" />
            </InputLeftElement>
            <Select
              placeholder="Seleccionar nivel"
              value={medicalInfo.activityLevel || ''}
              onChange={(e) => handleChange('activityLevel', e.target.value)}
              sx={{ paddingLeft: '40px' }}
            >
              <option value="Sedentario">Sedentario</option>
              <option value="Activo">Activo</option>
              <option value="Muy Activo">Muy Activo</option>
            </Select>
          </InputGroup>
        </FormControl>

        {/* Temperamento */}
        <FormControl>
          <FormLabel color={labelColor}>Temperamento</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
                <SiComicfury color="gray.300" />
            </InputLeftElement>
            <Input
                placeholder="Describir temperamento"
                type="text"
                value={medicalInfo.temperament || ''}
                onChange={(e) => handleChange('temperament', e.target.value)}
            />
            </InputGroup>
        </FormControl>

        {/* Dieta */}
        <FormControl>
          <FormLabel color={labelColor}>Dieta</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <FaUtensils color="gray.300" />
            </InputLeftElement>
            <Input
              placeholder="Ej. alimento seco, húmedo"
              type="text"
              value={medicalInfo.diet || ''}
              onChange={(e) => handleChange('diet', e.target.value)}
            />
          </InputGroup>
        </FormControl>

        {/* Apetito / Digestión */}
        <FormControl>
          <FormLabel color={labelColor}>Apetito / Digestión</FormLabel>
          <InputGroup>  
          <InputLeftElement pointerEvents="none">
          <MdOutlinePets color="gray.300" />
          </InputLeftElement>
        
          <Input
            placeholder="Cambios en apetito o digestión"
            type="text"
            value={medicalInfo.digestion || ''}
            onChange={(e) => handleChange('digestion', e.target.value)}
          />
            </InputGroup>
        </FormControl>
      </SimpleGrid>
    </Box>
  );
};

export default MedicalInfoSection;
