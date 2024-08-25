import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  VStack,
  Text,
  useToast,
  InputGroup,
  InputLeftElement,
  FormErrorMessage,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { PhoneIcon, MailIcon, CalendarIcon, UserIcon, MessageSquareIcon } from 'lucide-react';

const MotionBox = motion(Box);

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    reason: '',
    message: '',
    preferredDate: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'El nombre es requerido';
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    if (formData.phone && !/^\+?[0-9]{9,}$/.test(formData.phone)) {
      newErrors.phone = 'Número de teléfono inválido';
    }
    if (!formData.reason) newErrors.reason = 'Por favor selecciona un motivo';
    if (!formData.message.trim()) newErrors.message = 'El mensaje es requerido';
    if (!formData.preferredDate) newErrors.preferredDate = 'Por favor selecciona una fecha';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      // Simular envío de formulario
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast({
        title: 'Formulario enviado',
        description: 'Gracias por contactarnos. Nos pondremos en contacto contigo pronto.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setIsSubmitting(false);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        reason: '',
        message: '',
        preferredDate: '',
      });
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <VStack as="form" spacing={6} align="stretch" onSubmit={handleSubmit}>
        <FormControl isRequired isInvalid={!!errors.fullName}>
          <FormLabel htmlFor="fullName">Nombre completo</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none" children={<UserIcon size={18} color="gray" />} />
            <Input
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Tu nombre completo"
              focusBorderColor="blue.400"
            />
          </InputGroup>
          <FormErrorMessage>{errors.fullName}</FormErrorMessage>
        </FormControl>

        <FormControl isRequired isInvalid={!!errors.email}>
          <FormLabel htmlFor="email">Correo electrónico</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none" children={<MailIcon size={18} color="gray" />} />
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              focusBorderColor="blue.400"
            />
          </InputGroup>
          <FormErrorMessage>{errors.email}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.phone}>
          <FormLabel htmlFor="phone">Teléfono (opcional)</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none" children={<PhoneIcon size={18} color="gray" />} />
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Tu número de teléfono"
              focusBorderColor="blue.400"
            />
          </InputGroup>
          <FormErrorMessage>{errors.phone}</FormErrorMessage>
        </FormControl>

        <FormControl isRequired isInvalid={!!errors.reason}>
          <FormLabel htmlFor="reason">Motivo de la consulta</FormLabel>
          <Select
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            placeholder="Selecciona un motivo"
            focusBorderColor="blue.400"
          >
            <option value="Consulta General">Consulta General</option>
            <option value="Emergencia">Emergencia</option>
            <option value="Vacunación">Vacunación</option>
            <option value="Cirugía">Cirugía</option>
          </Select>
          <FormErrorMessage>{errors.reason}</FormErrorMessage>
        </FormControl>

        <FormControl isRequired isInvalid={!!errors.message}>
          <FormLabel htmlFor="message">Mensaje</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none" children={<MessageSquareIcon size={18} color="gray" />} />
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Describe tu consulta aquí"
              focusBorderColor="blue.400"
              resize="vertical"
              pl="2.5rem"
              minHeight="120px"
            />
          </InputGroup>
          <FormErrorMessage>{errors.message}</FormErrorMessage>
        </FormControl>

        <FormControl isRequired isInvalid={!!errors.preferredDate}>
          <FormLabel htmlFor="preferredDate">Fecha preferida</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none" children={<CalendarIcon size={18} color="gray" />} />
            <Input
              id="preferredDate"
              name="preferredDate"
              type="date"
              value={formData.preferredDate}
              onChange={handleChange}
              focusBorderColor="blue.400"
              min={new Date().toISOString().split('T')[0]}
            />
          </InputGroup>
          <FormErrorMessage>{errors.preferredDate}</FormErrorMessage>
        </FormControl>

        <Button
          type="submit"
          colorScheme="blue"
          size="lg"
          fontSize="md"
          isLoading={isSubmitting}
          loadingText="Enviando"
          w="100%"
        >
          Enviar mensaje
        </Button>
      </VStack>
    </MotionBox>
  );
};

export default ContactForm;