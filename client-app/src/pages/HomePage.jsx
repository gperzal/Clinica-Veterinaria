import React from 'react';
import {
  Box,
  Container,
  Stack,
  Flex,
  Heading,
  Text,
  Image,
  Button,
  SimpleGrid,
  Icon,
  useColorModeValue
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaDog, FaSyringe, FaShoppingCart, FaBlog, FaRobot, FaQuoteLeft } from 'react-icons/fa';
import { FaScissors } from "react-icons/fa6";
import { Heart, Wallet, Laptop } from 'lucide-react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const MotionBox = motion(Box);

export default function HomePage() {
  return (
    <Container maxW={'7xl'} py={10}>
      {/* Hero Section */}
      <HeroSection />
      {/* Servicios */}
      <ServicesSection />
      {/* Beneficios */}
      <BenefitsSection />
      {/* Testimonios */}
      <TestimonialsSection />
      {/* Blogs */}
      <BlogSection />
      {/* Chatbot */}
      <ChatbotSection />
    </Container>
  );
}


function HeroSection() {
  // URLs de las imágenes para cada modo
  const darkModeImage = 'https://img.freepik.com/fotos-premium/medicina-cuidado-salud-tiro-medio-veterinario-mano-clinica-veterinaria_255667-24890.jpg';
  const lightModeImage = 'https://img.freepik.com/foto-gratis/perro-control-veterinario-tiro-medio_23-2149143871.jpg';
  
  return (
    <Stack
      direction={{ base: 'column', md: 'row' }}
      spacing={10}
      align={'center'}
      py={10}
    >
      {/* Texto del Hero */}
      <Stack flex={1} spacing={8}>
        <Heading lineHeight={1.1} fontWeight={600}>
          <Text
            as={'span'}
            position={'relative'}
            fontSize={{ base: '4xl', sm: '5xl', lg: '7xl' }}
          >
            Bienvenidos a PawMart
          </Text>
          <br />
          <Text
            as={'span'}
            color={'red.400'}
            fontSize={{ base: '2xl', sm: '3xl', lg: '5xl' }}
          >
            Clínica Veterinaria, un lugar perfecto para el cuidado y amor a tus mascotas.
          </Text>
        </Heading>
        <Text
          color={useColorModeValue('gray.600', 'gray.300')}
          fontSize={{ base: 'md', sm: 'lg', lg: 'xl' }}
        >
          Ofrecemos servicios completos para garantizar el bienestar de tus mascotas. Desde
          consultas veterinarias hasta servicios de estilista y eCommerce, tenemos todo lo que
          necesitas.
        </Text>
        <Stack direction={{ base: 'column', sm: 'row' }} spacing={4}>
          <Link to="/appointments">
            <Button colorScheme="red" size="lg">
              Agenda una cita
            </Button>
          </Link>
          <Link to="/about">
            <Button variant="outline" size="lg">
              Conoce más
            </Button>
          </Link>
        </Stack>
      </Stack>

      {/* Imagen y Blob */}
      <Flex
        flex={1}
        justify={'center'}
        align={'center'}
        position={'relative'}
        w={'full'}
      >
        <Blob
          w={'150%'}
          h={'150%'}
          position={'absolute'}
          top={'-20%'}
          left={0}
          zIndex={-1}
          color={useColorModeValue('red.50', 'red.400')}
        />
        <Box
          position={'relative'}
          height={'300px'}
          rounded={'2xl'}
          boxShadow={'2xl'}
          width={'full'}
          overflow={'hidden'}
        >
          <Image
            alt={'Hero Image'}
            fit={'cover'}
            align={'center'}
            w={'100%'}
            h={'100%'}
            src={useColorModeValue(lightModeImage, darkModeImage)}
          />
        </Box>
      </Flex>
    </Stack>
  );
}

// Componente Blob permanece igual
const Blob = (props) => {
  return (
    <Icon
      width={'100%'}
      viewBox="0 0 578 440"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M239.184 439.443c-55.13-5.419-110.241-21.365-151.074-58.767C42.307 338.722-7.478 282.729.938 221.217c8.433-61.644 78.896-91.048 126.871-130.712 34.337-28.388 70.198-51.348 112.004-66.78  C282.34 8.024 325.382-3.369 370.518.904  c54.019 5.115 112.774 10.886 150.881 49.482  39.916 40.427 49.421 100.753 53.385 157.402  4.13 59.015 11.255 128.44-30.444 170.44  -41.383 41.683-111.6 19.106-169.213 30.663  -46.68 9.364-88.56 35.21-135.943 30.551z"
        fill="currentColor"
      />
    </Icon>
  );
};


function ServicesSection() {
  const services = [
    { title: 'Ecommerce', icon: FaShoppingCart, description: 'Compra productos para tus mascotas.' },
    { title: 'Atenciones Generales', icon: FaDog, description: 'Consulta y cuidado veterinario.' },
    { title: 'Estilista', icon: FaScissors, description: 'Peluquería y spa para mascotas.' },
    { title: 'Vacunas', icon: FaSyringe, description: 'Vacunas para proteger a tus mascotas.' },
    { title: 'Blog Educativo', icon: FaBlog, description: 'Artículos útiles y educativos.' },
    { title: 'Chatbot', icon: FaRobot, description: 'Asistencia virtual para resolver dudas.' },
  ];

  return (
    <Box py={10}>
      <Heading textAlign="center" mb={6}>
        Nuestros Servicios
      </Heading>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={8}>
        {services.map((service, index) => (
          <MotionBox
            key={index}
            bg={useColorModeValue('white', 'gray.800')}
            p={6}
            rounded="lg"
            shadow="md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Icon as={service.icon} w={10} h={10} mb={4} color="red.400" />
            <Heading size="md" mb={2}>
              {service.title}
            </Heading>
            <Text color={'gray.500'}>{service.description}</Text>
          </MotionBox>
        ))}
      </SimpleGrid>
    </Box>
  );
}

function BenefitsSection() {
  return (
    <Box py={10} bg={useColorModeValue('gray.50', 'gray.800')} rounded="lg">
      <Heading
        textAlign="center"
        mb={6}
        fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
        color={useColorModeValue('gray.800', 'white')}
      >
        ¿Por qué elegirnos?
      </Heading>
      <Text 
        textAlign="center" 
        mb={10} 
        color={useColorModeValue('gray.600', 'gray.300')} 
        fontSize={{ base: 'md', md: 'lg' }}
      >
        Nos esforzamos por brindar la mejor experiencia para ti y tu mascota. Descubre lo que nos hace únicos.
      </Text>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={8}>
        <BenefitCard
          title="Atención Personalizada"
          description="Tu mascota es única, y así es nuestro cuidado."
          Icon={Heart}
          iconColor="#FF6B6B"
        />
        <BenefitCard
          title="Precios Accesibles"
          description="Calidad y compromiso sin comprometer tu presupuesto."
          Icon={Wallet}
          iconColor="#4CAF50"
        />
        <BenefitCard
          title="Tecnología Innovadora"
          description="Equipos avanzados para una atención rápida y precisa."
          Icon={Laptop}
          iconColor="#2196F3"
        />
      </SimpleGrid>
    </Box>
  );
}

function BenefitCard({ title, description, Icon, iconColor }) {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.700')}
      p={6}
      rounded="lg"
      shadow="md"
      textAlign="center"
      transition="transform 0.3s ease"
      _hover={{
        transform: 'scale(1.05)',
        shadow: 'xl',
      }}
    >
      <Box mb={4}>
        <Icon 
          size={48} 
          color={iconColor}
          style={{ margin: 'auto' }}
        />
      </Box>
      <Heading fontSize="lg" mb={2} color={useColorModeValue('gray.800', 'white')}>
        {title}
      </Heading>
      <Text color={useColorModeValue('gray.600', 'gray.300')} fontSize="md">
        {description}
      </Text>
    </Box>
  );
}


// 4. Testimonios Section
function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Juan Pérez',
      feedback: 'La atención fue excelente y mi perro salió muy contento del spa.',
    },
    {
      name: 'María López',
      feedback: 'El chatbot me ayudó a resolver mis dudas rápidamente. ¡Increíble servicio!',
    },
    {
      name: 'Carlos Rodríguez',
      feedback: 'El servicio de estilista dejó a mi gato espectacular. 100% recomendado.',
    },
    {
      name: 'Ana Gómez',
      feedback: 'Las vacunas fueron rápidas y sin dolor para mi mascota. Gran equipo veterinario.',
    },
    {
      name: 'Lucía Fernández',
      feedback: 'La tienda online tiene todo lo que necesito para mi perro. Excelente calidad.',
    },
    {
      name: 'Fernando Ríos',
      feedback: 'El personal siempre es muy amable y atento. Mi perro ya no tiene miedo de ir al veterinario.',
    },
    {
      name: 'Gabriela Torres',
      feedback: 'El seguimiento que hacen después de las consultas es increíble. Me siento muy tranquila.',
    },
    {
      name: 'Ricardo Martínez',
      feedback: 'Mis mascotas siempre reciben el mejor cuidado. No confío en otra clínica.',
    },
    {
      name: 'Patricia Herrera',
      feedback: 'El blog educativo es súper útil. Aprendí a cuidar mejor de mi gata.',
    },
    {
      name: 'Sofía Álvarez',
      feedback: 'El servicio de eCommerce es muy rápido y confiable. Mis pedidos llegan impecables.',
    },
  ];
  

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Box py={10}>
      <Heading textAlign="center" mb={6}>
        Opiniones de Nuestros Clientes
      </Heading>
      <Text textAlign="center" color="gray.500" mb={6}>
        Esto es lo que nuestros clientes dicen sobre nosotros.
      </Text>
      <Box>
        <Slider {...sliderSettings}>
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              name={testimonial.name}
              feedback={testimonial.feedback}
            />
          ))}
        </Slider>
      </Box>
    </Box>
  );
}

function TestimonialCard({ name, feedback }) {
  return (
    <Box
      bg={useColorModeValue(
        'linear-gradient(135deg, #fff 0%, #f7f7f7 100%)',
        'linear-gradient(135deg, #2D3748 0%, #4A5568 100%)'
      )}
      p={6}
      rounded="lg"
      shadow="md"
      mx={3}
      textAlign="center"
      position="relative"
      borderWidth={1}
      borderColor={useColorModeValue('gray.200', 'gray.600')}
      transition="transform 0.3s ease, box-shadow 0.3s ease"
      _hover={{
        transform: 'scale(1.05)',
        boxShadow: useColorModeValue('lg', '2xl'),
      }}
      my={4}
    >
      {/* Icono de cita */}
      <Icon
        as={FaQuoteLeft}
        w={8}
        h={8}
        color={useColorModeValue('red.400', 'red.300')}
        position="absolute"
        top={-3}
        left={-3}
      />
      {/* Feedback */}
      <Text
        color={useColorModeValue('gray.600', 'gray.300')}
        mb={4}
        fontSize="lg"
        fontStyle="italic"
      >
        {feedback}
      </Text>
      {/* Separador decorativo */}
      <Box
        h="1px"
        w="50%"
        mx="auto"
        bg={useColorModeValue('gray.300', 'gray.600')}
        my={2}
      ></Box>
      {/* Nombre */}
      <Text
        fontWeight="bold"
        fontSize="xl"
        color={useColorModeValue('gray.700', 'white')}
      >
        {name}
      </Text>
    </Box>
  );
}


function BlogSection() {
  const blogPosts = [
    {
      title: 'Cómo cuidar a tu perro durante el verano',
      description: 'Descubre tips esenciales para mantener a tu perro fresco e hidratado.',
      image:
        'https://img.freepik.com/foto-gratis/perro-piscina-feliz_23-2148880985.jpg?size=626&ext=jpg',
      link: '/blog/verano-perros',
    },
    {
      title: 'Vacunas esenciales para gatos',
      description: 'Asegúrate de proteger a tu gato con esta guía completa de vacunación.',
      image:
        'https://veterinariaelabrazo.cl/cdn/shop/files/Diseno_sin_titulo_3.jpg?v=1630951535&width=1200',
      link: '/blog/vacunas-gatos',
    },
  ];

  return (
    <Box py={10}>
      <Heading textAlign="center" mb={6}>
        Blog Educativo
      </Heading>
      <Text textAlign="center" color="gray.500" mb={6}>
        Aprende más sobre el cuidado y bienestar de tus mascotas con nuestros artículos.
      </Text>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
        {blogPosts.map((post, index) => (
          <Box
            key={index}
            bg={useColorModeValue('white', 'gray.800')}
            shadow="md"
            rounded="lg"
            overflow="hidden"
          >
            <Image src={post.image} alt={post.title} w="100%" h="200px" objectFit="cover" />
            <Box p={4}>
              <Heading size="md" mb={2}>
                {post.title}
              </Heading>
              <Text color="gray.500" mb={4}>
                {post.description}
              </Text>
              <Button as={Link} to={post.link} colorScheme="red" size="sm">
                Leer más
              </Button>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}


function ChatbotSection() {
  return (
    <Box py={10} bg={useColorModeValue('gray.50', 'gray.800')} rounded="lg">
      <Stack direction={{ base: 'column', md: 'row' }} spacing={10} align="center">
        <Box flex={1} textAlign={{ base: 'center', md: 'left' }}>
          <Heading mb={4}>
            Conoce Nuestro <Text as="span" color="red.400">Chatbot</Text>
          </Heading>
          <Text color="gray.500" mb={6}>
            Obtén asistencia inmediata para resolver tus dudas y recibir recomendaciones personalizadas para el cuidado de tu mascota.
          </Text>
          <Button colorScheme="red" size="lg">
            Probar Chatbot
          </Button>
        </Box>
        <Box flex={1} display="flex" justifyContent="center" alignItems="center">
          <Image
            src="https://img.freepik.com/fotos-premium/perro-esta-tendido-suelo-perro-portatil-perro-mascota-blanco-lindo-jugando-computadora-portatil_1260626-3031.jpg?w=360"
            alt="Chatbot"
            w="300px"
            h="300px"
            rounded="full"
            objectFit="cover"
            boxShadow="lg"
          />
        </Box>
      </Stack>
    </Box>
  );
}


