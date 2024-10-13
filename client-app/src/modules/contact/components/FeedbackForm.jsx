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
  IconButton,
  Link
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiStar, FiSmile, FiSmartphone, FiImage, FiPlus, FiTrash } from 'react-icons/fi';
import { GrBug } from "react-icons/gr";
import { requestFeedback } from '../services/feedbackService'; 
const MotionBox = motion(Box);

export default function FeedbackForm() {
  const [formData, setFormData] = useState({
    email: '',
    type: '',
    description: '',
    deviceInfo: '',
    mediaUrls: [''],
  
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

  const handleMediaUrlChange = (index, value) => {
    const newMediaUrls = [...formData.mediaUrls];
    newMediaUrls[index] = value;
    setFormData((prevData) => ({
      ...prevData,
      mediaUrls: newMediaUrls,
    }));
  };

  const handleAddMediaUrl = () => {
    setFormData((prevData) => ({
      ...prevData,
      mediaUrls: [...prevData.mediaUrls, ''],
    }));
  };

  const handleRemoveMediaUrl = (index) => {
    const newMediaUrls = [...formData.mediaUrls];
    newMediaUrls.splice(index, 1);
    setFormData((prevData) => ({
      ...prevData,
      mediaUrls: newMediaUrls,
    }));
  };


 const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await requestFeedback(formData);
      toast({
        title: 'Feedback enviado',
        description: 'Gracias por ayudarnos a mejorar nuestra aplicación.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      setFormData({
        email: '',
        type: '',
        description: '',
        deviceInfo: '',
        mediaUrls: [''],
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Algo salió mal. Intenta nuevamente.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
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
        <FormControl>
          <FormLabel>Correo electrónico (opcional)</FormLabel>
          <Input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="tu-correo@ejemplo.com"
          />
        </FormControl>
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
        {formData.mediaUrls.map((url, index) => (
          <FormControl key={index}>
            <FormLabel>
              <Flex align="center">
                <Icon as={FiImage} mr={2} />
                URL de imagen o video (opcional)
              </Flex>
            </FormLabel>
            <InputGroup>
              <InputLeftAddon children="https://" />
              <Input
                name={`mediaUrl-${index}`}
                value={url}
                onChange={(e) => handleMediaUrlChange(index, e.target.value)}
                placeholder="https://postimg.cc/Z0v63W0r"
              />
              {formData.mediaUrls.length > 1 && (
                <IconButton
                  aria-label="Remove URL"
                  icon={<FiTrash />}
                  onClick={() => handleRemoveMediaUrl(index)}
                  ml={2}
                  colorScheme="red"
                />
              )}
            </InputGroup>
            <Text fontSize="sm" mt={1} color="gray.500">
              Sube tu imagen/video a un servicio de alojamiento ejemplo {' '}
              <Link href="https://imgbb.com" color="blue.500" isExternal >
                https://imgbb.com
              </Link>{' '}
              o{' '}
              <Link href="https://postimages.org" color="blue.500" isExternal >
                https://postimages.org
              </Link>
              {' '}y pega el enlace
            </Text>
          </FormControl>
        ))}
        <Button
          onClick={handleAddMediaUrl}
          colorScheme="blue"
          leftIcon={<FiPlus />}
          size="sm"
        >
          Agregar otra URL
        </Button>
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
