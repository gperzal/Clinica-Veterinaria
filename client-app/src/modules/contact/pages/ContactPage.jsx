import React from 'react';
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  VStack,
  AspectRatio,
  useColorModeValue,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import ContactForm from '../components/ContactForm';
import { PhoneIcon, MailIcon, ClockIcon, MapPinIcon } from 'lucide-react';
import { Link } from '@chakra-ui/react';


const MotionBox = motion(Box);

const ContactInfo = ({ icon, children }) => (
  <Flex align="center" mb={4}>
    <Box as={icon} size={24} color="blue.500" mr={4} />
    <Text>{children}</Text>
  </Flex>
);

export default function ContactPage() {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBgColor = useColorModeValue('white', 'gray.800');

  return (
    <Box bg={bgColor} minHeight="100vh" py={12}>
      <Container maxW="6xl">
        <Flex direction={{ base: 'column', lg: 'row' }} gap={12}>
          <MotionBox
            flex={1}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <VStack align="stretch" spacing={8}>
              <Heading as="h1" size="2xl" color="blue.600">
                Contáctanos
              </Heading>
              <Text fontSize="lg">
                ¿Tienes alguna pregunta o necesitas programar una cita para tu mascota? Estamos aquí para ayudarte. Completa el formulario y nos pondremos en contacto contigo lo antes posible. <br />
                También puedes consultar nuestras {' '}
                <Link color="blue.500" href="/faq">
                  Preguntas Frecuentes
                </Link>.
              </Text>
              <AspectRatio ratio={16 / 9} borderRadius="lg" overflow="hidden">
              <Box
                as="video"
                src="https://s1-def.ap4r.com/bs2/upload-ylab-stunt-sgp/se/ai_portal_sgp_queue_m2v_img2video_hq/b5462618-dae6-43d3-b5ed-069c53e001d7/0.mp4"
                autoPlay
                loop
                muted
                playsInline
                objectFit="cover"
              />
            </AspectRatio>
              <Box bg={cardBgColor} p={6} borderRadius="lg" boxShadow="md">
                <Heading as="h2" size="lg" mb={6} color="blue.500">
                  Información de contacto
                </Heading>
                <ContactInfo icon={PhoneIcon}>+56 2 2345 6789</ContactInfo>
                <ContactInfo icon={MailIcon}>contacto@clinicaveterinaria.cl</ContactInfo>
                <ContactInfo icon={ClockIcon}>Lun - Sáb: 9:00 - 20:00</ContactInfo>
                <ContactInfo icon={MapPinIcon}>Av. Concha y Toro 3459, Puente Alto, Chile</ContactInfo>
              </Box>
            </VStack>
          </MotionBox>
          <MotionBox
            flex={1}
            bg={cardBgColor}
            p={8}
            borderRadius="lg"
            boxShadow="xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ContactForm />
          </MotionBox>
        </Flex>
        <Box mt={12} borderRadius="lg" overflow="hidden" boxShadow="xl">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d18804.345722507802!2d-70.60035416780677!3d-33.57493267093454!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662d725b4a98067%3A0x62a60b0a60a05f60!2sHospital%20Dr.%20S%C3%B3tero%20del%20R%C3%ADo!5e0!3m2!1ses-419!2scl!4v1724546801783!5m2!1ses-419!2scl"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación de la Clínica Veterinaria"
          />
        </Box>
      </Container>
    </Box>
  );
}