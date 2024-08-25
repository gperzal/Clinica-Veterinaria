import React from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  Container,
  useColorModeValue,
  Icon,
  Flex,
  SimpleGrid,
  
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiMessageSquare, FiThumbsUp, FiTrendingUp } from 'react-icons/fi';
import FeedbackForm from '../../components/contact/FeedbackForm';

const MotionBox = motion(Box);

const FeatureCard = ({ icon, title, description }) => (
  <MotionBox
    borderWidth="1px"
    borderRadius="lg"
    p={5}
    shadow="md"
    bg={useColorModeValue('white', 'gray.700')}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Flex direction="column" align="center" textAlign="center">
      <Icon as={icon} boxSize={10} color="blue.500" mb={4} />
      <Heading size="md" mb={2}>
        {title}
      </Heading>
      <Text color={useColorModeValue('gray.600', 'gray.300')}>{description}</Text>
    </Flex>
  </MotionBox>
);

export default function FeedbackPage() {
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.200');

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
            Ayúdanos a mejorar
          </Heading>
          <Text fontSize="xl" color={textColor}>
            Tu opinión es valiosa para nosotros. Juntos podemos hacer nuestra aplicación aún mejor.
          </Text>
        </MotionBox>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
          <FeatureCard
            icon={FiMessageSquare}
            title="Comparte tu experiencia"
            description="Cuéntanos sobre tu experiencia con nuestra aplicación"
          />
          <FeatureCard
            icon={FiThumbsUp}
            title="Mejora continua"
            description="Utilizamos tu feedback para mejorar constantemente"
          />
          <FeatureCard
            icon={FiTrendingUp}
            title="Innovación"
            description="Tus ideas nos ayudan a innovar y crecer"
          />
        </SimpleGrid>

        <Box bg={bgColor} p={8} borderRadius="lg" boxShadow="xl">
          <Heading as="h2" size="lg" mb={4} textAlign="center">
            Envía tu feedback
          </Heading>
          <Flex justify="center">
            <FeedbackForm />
          </Flex>
        </Box>
      </VStack>
    </Container>
  );
}