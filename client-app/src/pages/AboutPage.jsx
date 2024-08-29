import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  Image,
  useColorModeValue,
  Flex,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const AboutUs = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const textColor = useColorModeValue('gray.600', 'gray.200');
  const headingColor = useColorModeValue('blue.600', 'blue.300');

  const teamImages = [
    "https://enlinea.santotomas.cl/web/wp-content/uploads/sites/2/2016/08/vet-744x465.jpg",
    "https://metodoeisi.com/wp-content/uploads/2020/10/medicina-veterinaria.png",
    "https://irp.cdn-website.com/8812c427/dms3rep/multi/DSC_0067-2a1ad164.JPG",
    "https://www.veterinaria-atual.pt/wp-content/uploads/sites/4/2018/02/m%C3%A9dico-veterin%C3%A1rio-Veterin%C3%A1ria-Atual--810x437.jpg",
    "https://www.zooplus.es/magazine/wp-content/uploads/2023/09/Peluqueria-canina.jpg",
    "https://www.cimformacion.com/blog/wp-content/uploads/2020/09/peluquera-seca-perro.jpg"
  ];

  return (
    <Box bg={bgColor} py={20}>
      <Container maxW="container.xl">
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <VStack align="start" spacing={10}>
            <Heading as="h1" size="2xl" color={headingColor}>
              Nuestro Equipo
            </Heading>
            <Text fontSize="xl" color={textColor}>
              Conoce a los expertos que cuidan de tus mascotas
            </Text>
            <Text color={textColor}>
              En nuestra clínica veterinaria y peluquería, contamos con un equipo de profesionales apasionados por el bienestar animal. Cada miembro está dedicado a proporcionar el mejor cuidado y atención a tus queridas mascotas.
            </Text>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} w="full">
              <MotionBox
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <VStack align="start" spacing={5}>
                  <Heading as="h3" size="lg" color={headingColor}>
                    Cultura
                  </Heading>
                  <Text color={textColor}>
                    Fomentamos un ambiente de respeto y amor por los animales, donde cada mascota es tratada como parte de nuestra familia. Nuestro equipo trabaja en armonía para asegurar que cada visita sea una experiencia positiva tanto para las mascotas como para sus dueños.
                  </Text>
                </VStack>
              </MotionBox>

              <MotionBox
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <VStack align="start" spacing={5}>
                  <Heading as="h3" size="lg" color={headingColor}>
                    Instalaciones
                  </Heading>
                  <Text color={textColor}>
                    Contamos con equipos modernos y espacios diseñados para el confort de las mascotas durante su visita. Nuestras instalaciones están pensadas para proporcionar un ambiente tranquilo y seguro, facilitando tratamientos efectivos y una estancia agradable para nuestros pacientes peludos.
                  </Text>
                </VStack>
              </MotionBox>
            </SimpleGrid>

            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              w="full"
            >
              <Heading as="h2" size="xl" mb={6} color={headingColor}>
                Galería de Nuestro Equipo
              </Heading>
              <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4}>
                {teamImages.map((src, index) => (
                  <Flex key={index} justifyContent="center" alignItems="center">
                    <Image
                      src={src}
                      alt={`Miembro del equipo ${index + 1}`}
                      borderRadius="lg"
                      objectFit="cover"
                      w="full"
                      h={{ base: "200px", md: "250px" }}
                      transition="transform 0.3s ease-in-out"
                      _hover={{ transform: 'scale(1.05)' }}
                    />
                  </Flex>
                ))}
              </SimpleGrid>
            </MotionBox>
          </VStack>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default AboutUs;