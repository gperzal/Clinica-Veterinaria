import React, { useState, useEffect } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  VStack,
  useToast,
  FormErrorMessage,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { PhoneIcon, MailIcon, CalendarIcon, UserIcon } from 'lucide-react';
import { requestContact } from '../services/contactService';

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

  useEffect(() => {
    // Establecer la fecha preferida por defecto a la fecha actual
    const today = new Date().toISOString().split('T')[0];
    setFormData((prev) => ({
      ...prev,
      preferredDate: today,
    }));
  }, []);

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
      try {
        await requestContact(formData);
        toast({
          title: 'Formulario enviado',
          description: 'Gracias por contactarnos. Nos pondremos en contacto contigo pronto.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          reason: '',
          message: '',
          preferredDate: new Date().toISOString().split('T')[0], // Reiniciar la fecha a la fecha actual
        });
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Hubo un problema al enviar tu mensaje. Por favor intenta de nuevo.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
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
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Describe tu consulta aquí"
          resize="vertical"
          minHeight="120px"
        />
        <FormErrorMessage>{errors.message}</FormErrorMessage>
      </FormControl>

      <FormControl isRequired>
        <FormLabel htmlFor="preferredDate">Fecha</FormLabel>
        <InputGroup>
         <InputLeftElement pointerEvents="none" children={<CalendarIcon size={18} color="gray" />} />
          <Input
            id="preferredDate"
            name="preferredDate"
            type="date"
            value={formData.preferredDate}
            readOnly 
            disabled
          />
        </InputGroup>
      </FormControl>

      <Button
        type="submit"
        colorScheme="blue"
        size="lg"
        isLoading={isSubmitting}
        loadingText="Enviando"
        w="100%"
      >
        Enviar mensaje
      </Button>
    </VStack>
  );
};

export default ContactForm;
