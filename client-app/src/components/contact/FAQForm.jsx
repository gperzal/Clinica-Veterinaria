import React, { useState } from 'react';
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
  Text,
  List,
  ListItem,
  useColorModeValue,
  Heading,
  Flex,
} from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const faqData = [
  {
    category: 'General',
    questions: [
      { q: '¿Cómo creo una cuenta?', a: 'Puedes crear una cuenta haciendo clic en "Registrarse" en la esquina superior derecha de la página de inicio.' },
      { q: '¿Cómo cambio mi contraseña?', a: 'Ve a tu perfil en el panel de control y selecciona la opción "Cambiar contraseña".' },
    ]
  },
  {
    category: 'Catálogo',
    questions: [
      { q: '¿Cómo puedo filtrar productos?', a: 'En la página de catálogo, utiliza las opciones de filtro en el lado izquierdo para refinar tu búsqueda por tipo de producto, marca, etc.' },
      { q: '¿Ofrecen envío gratuito?', a: 'Ofrecemos envío gratuito en pedidos superiores a $50.' },
    ]
  },
  {
    category: 'Citas',
    questions: [
      { q: '¿Cómo agendo una cita veterinaria?', a: 'Ve a la sección "Citas", selecciona "Veterinaria", elige la fecha y hora disponible, y confirma tu reserva.' },
      { q: '¿Puedo cancelar o reprogramar una cita?', a: 'Sí, puedes hacerlo hasta 24 horas antes de tu cita programada a través de tu panel de control.' },
    ]
  },
  {
    category: 'Blog',
    questions: [
      { q: '¿Con qué frecuencia se actualiza el blog?', a: 'Publicamos nuevo contenido educativo al menos dos veces por semana.' },
      { q: '¿Puedo sugerir temas para el blog?', a: 'Sí, nos encantaría escuchar tus sugerencias. Puedes enviarlas a través del formulario de contacto en la página "Contacto".' },
    ]
  },
  {
    category: 'Panel de Control',
    questions: [
      { q: '¿Cómo agrego una nueva mascota a mi perfil?', a: 'En tu panel de control, ve a "Perfil" y luego a "Mis Mascotas". Haz clic en "Agregar Nueva Mascota" y completa la información requerida.' },
      { q: '¿Dónde puedo ver mi historial de compras?', a: 'En tu panel de control, selecciona la opción "Historial de Compras" para ver todas tus transacciones anteriores.' },
    ]
  },
];

export default function FAQForm() {
  const [searchTerm, setSearchTerm] = useState('');
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const filteredFAQs = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => q.q.toLowerCase().includes(searchTerm.toLowerCase()) || 
           q.a.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <MotionBox
      width="100%"
      maxWidth="800px"
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
      <VStack spacing={6} align="stretch">
        <Heading size="md" textAlign="center" mb={2}>
          Busca en nuestras Preguntas Frecuentes
        </Heading>
        <InputGroup>
          <InputLeftElement pointerEvents="none" children={<FiSearch color="gray.300" />} />
          <Input
            type="text"
            placeholder="Busca tu pregunta aquí..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
        {filteredFAQs.map((category, index) => (
          <MotionBox
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Heading size="sm" mb={2}>
              {category.category}
            </Heading>
            <List spacing={3}>
              {category.questions.map((item, qIndex) => (
                <ListItem key={qIndex}>
                  <Text fontWeight="bold">{item.q}</Text>
                  <Text>{item.a}</Text>
                </ListItem>
              ))}
            </List>
          </MotionBox>
        ))}
        {filteredFAQs.length === 0 && (
          <Text textAlign="center" color="gray.500">
            No se encontraron resultados para tu búsqueda. Por favor, intenta con otros términos.
          </Text>
        )}
      </VStack>
    </MotionBox>
  );
}