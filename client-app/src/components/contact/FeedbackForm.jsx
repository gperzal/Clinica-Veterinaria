import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  useToast,
  Select,
  Text,
  InputGroup,
  InputLeftAddon,
  useColorModeValue,
  Heading,
  Icon,
  Flex,
  
  ScaleFade,
  Tooltip,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiStar, FiSmile, FiSmartphone, FiImage } from 'react-icons/fi';
import { GrBug } from "react-icons/gr";
const MotionBox = motion(Box);

export default function FeedbackForm() {
  const [formData, setFormData] = useState({
    type: '',
    description: '',
    deviceInfo: '',
    mediaUrl: '',
  });
  const toast = useToast();
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const iconColor = useColorModeValue('blue.500', 'blue.300');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Feedback submitted:', formData);
    toast({
      title: 'Feedback enviado',
      description: 'Gracias por ayudarnos a mejorar nuestra aplicación.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
    setFormData({
      type: '',
      description: '',
      deviceInfo: '',
      mediaUrl: '',
    });
  };

  const getIcon = (type) => {
    switch (type) {
      case 'error':
        return GrBug;
      case 'suggestion':
        return FiStar;
      default:
        return FiSmile;
    }
  };

  return (
    <ScaleFade initialScale={0.9} in={true}>
      <MotionBox
        as="form"
        onSubmit={handleSubmit}
        width="100%"
        maxWidth="500px"
        bg={bgColor}
        p={6}
        borderRadius="lg"
        boxShadow="xl"
        border="1px"
        borderColor={borderColor}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <VStack spacing={6}>
          <Heading size="md" textAlign="center" mb={2}>
            Comparte tu experiencia
          </Heading>
          <FormControl isRequired>
            <FormLabel>Tipo de feedback</FormLabel>
            <Select
              name="type"
              value={formData.type}
              onChange={handleChange}
              placeholder="Selecciona el tipo de feedback"
              icon={<Icon as={getIcon(formData.type)} color={iconColor} />}
            >
              <option value="error">Reporte de error</option>
              <option value="suggestion">Sugerencia de mejora</option>
              <option value="other">Otro</option>
            </Select>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Descripción</FormLabel>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe el error o tu sugerencia en detalle"
              rows={5}
              resize="vertical"
            />
          </FormControl>
          <FormControl>
            <FormLabel>
              <Flex align="center">
                <Icon as={FiSmartphone} mr={2} />
                Información del dispositivo
              </Flex>
            </FormLabel>
            <Input
              name="deviceInfo"
              value={formData.deviceInfo}
              onChange={handleChange}
              placeholder="Ej: iPhone 12, Chrome en Windows 10"
            />
          </FormControl>
          <FormControl>
            <FormLabel>
              <Flex align="center">
                <Icon as={FiImage} mr={2} />
                URL de imagen o video (opcional)
              </Flex>
            </FormLabel>
            <InputGroup>
              <InputLeftAddon children="https://" />
              <Input
                name="mediaUrl"
                value={formData.mediaUrl}
                onChange={handleChange}
                placeholder="ejemplo.com/imagen.jpg"
              />
            </InputGroup>
            <Text fontSize="sm" mt={1} color="gray.500">
              Sube tu imagen/video a un servicio de alojamiento y pega el enlace aquí
            </Text>
          </FormControl>
          <Tooltip label="Enviar tu feedback" placement="top">
            <Button
              type="submit"
              colorScheme="blue"
              width="100%"
              size="lg"
              leftIcon={<Icon as={FiStar} />}
            >
              Enviar feedback
            </Button>
          </Tooltip>
        </VStack>
      </MotionBox>
    </ScaleFade>
  );
}