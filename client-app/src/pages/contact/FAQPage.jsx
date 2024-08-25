import React, { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  Container,
  useColorModeValue,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  SimpleGrid,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiHelpCircle, FiShoppingCart, FiCalendar, FiBook, FiUser, FiSearch } from 'react-icons/fi';

const MotionBox = motion(Box);

const CategoryCard = ({ icon, title, description }) => (
  <MotionBox
    borderWidth="1px"
    borderRadius="lg"
    p={5}
    shadow="md"
    bg={useColorModeValue('white', 'gray.700')}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    _hover={{ transform: 'translateY(-5px)', transition: 'all 0.2s' }}
  >
    <VStack spacing={3} align="center" textAlign="center">
      <Icon as={icon} boxSize={10} color="blue.500" />
      <Heading size="md">{title}</Heading>
      <Text color={useColorModeValue('gray.600', 'gray.300')}>{description}</Text>
    </VStack>
  </MotionBox>
);

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
  }
  
  // ... (resto de las categorías y preguntas)
];

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.200');

  const filteredFAQs = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => q.q.toLowerCase().includes(searchTerm.toLowerCase()) || 
           q.a.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={10} align="stretch">
        <MotionBox
          textAlign="center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Heading as="h1" size="2xl" mb={4}>
            Preguntas Frecuentes
          </Heading>
          <Text fontSize="xl" color={textColor}>
            Encuentra respuestas a las preguntas más comunes sobre nuestros servicios y productos.
          </Text>
        </MotionBox>

        <SimpleGrid columns={{ base: 1, md: 3, lg: 5 }} spacing={10}>
          <CategoryCard
            icon={FiHelpCircle}
            title="General"
            description="Información general sobre nuestra plataforma"
          />
          <CategoryCard
            icon={FiShoppingCart}
            title="Catálogo"
            description="Preguntas sobre nuestros productos y compras"
          />
          <CategoryCard
            icon={FiCalendar}
            title="Citas"
            description="Información sobre citas veterinarias y de peluquería"
          />
          <CategoryCard
            icon={FiBook}
            title="Blog"
            description="Preguntas sobre nuestro contenido educativo"
          />
          <CategoryCard
            icon={FiUser}
            title="Panel de Control"
            description="Ayuda con tu cuenta y perfil"
          />
        </SimpleGrid>

        <Box bg={bgColor} p={8} borderRadius="lg" boxShadow="xl">
          <Heading as="h2" size="lg" mb={6} textAlign="center">
            Busca en nuestras FAQs
          </Heading>
          <InputGroup mb={8}>
            <InputLeftElement pointerEvents="none" children={<FiSearch color="gray.300" />} />
            <Input
              type="text"
              placeholder="Busca tu pregunta aquí..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>

          <Accordion allowMultiple>
            {filteredFAQs.map((category, index) => (
              <AccordionItem key={index}>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      <Heading size="md">{category.category}</Heading>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <VStack align="stretch" spacing={4}>
                    {category.questions.map((item, qIndex) => (
                      <Box key={qIndex}>
                        <Text fontWeight="bold">{item.q}</Text>
                        <Text>{item.a}</Text>
                      </Box>
                    ))}
                  </VStack>
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>

          {filteredFAQs.length === 0 && (
            <Text textAlign="center" color="gray.500">
              No se encontraron resultados para tu búsqueda. Por favor, intenta con otros términos.
            </Text>
          )}
        </Box>
      </VStack>
    </Container>
  );
}