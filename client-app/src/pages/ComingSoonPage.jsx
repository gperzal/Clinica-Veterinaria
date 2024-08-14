import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
  SimpleGrid,
  Card,
  CardBody,
  CardHeader,
} from '@chakra-ui/react';

const ComingSoonPage = () => {
  const calculateTimeLeft = () => {
    const difference = +new Date('2024-09-15') - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <Container maxW={'7xl'} minH={'100vh'} centerContent>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        alignItems={'center'}
        justifyContent={'space-between'}
        w={'full'}
        p={8}
        gap={8}
        mt={{ base: -8, md: 150 }} 
      >
        <Box textAlign="center" w={{ base: 'full', md: '50%' }}>
          <Heading
            fontSize={{ base: '3xl', md: '5xl' }}
            color={useColorModeValue('orange.400', 'orange.300')}
            mb={4}
          >
            Sitio web en construcción
          </Heading>
          <Text fontSize={{ base: 'md', md: 'lg' }} mb={6}>
            Estamos preparando algo increíble y emocionante para ti. 
            <br />
            ¡Gracias por tu tiempo y apoyo!
          </Text>
          <Box>
            <Text fontSize="lg" mb={4} color={useColorModeValue('gray.700', 'gray.300')}>
              ¡Lanzamos en:
            </Text>
            <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4} justifyContent="center" alignItems="center">
              <Card minW={{ base: '100px', md: '140px' }} maxW="200px">
                <CardHeader>
                  <Text fontSize={{ base: 'xl', md: '2xl' }}>{timeLeft.days || '0'}</Text>
                </CardHeader>
                <CardBody>
                  <Text>Días</Text>
                </CardBody>
              </Card>
              <Card minW={{ base: '100px', md: '140px' }} maxW="200px">
                <CardHeader>
                  <Text fontSize={{ base: 'xl', md: '2xl' }}>{timeLeft.hours || '0'}</Text>
                </CardHeader>
                <CardBody>
                  <Text>Horas</Text>
                </CardBody>
              </Card>
              <Card minW={{ base: '100px', md: '140px' }} maxW="200px">
                <CardHeader>
                  <Text fontSize={{ base: 'xl', md: '2xl' }}>{timeLeft.minutes || '0'}</Text>
                </CardHeader>
                <CardBody>
                  <Text>Minutos</Text>
                </CardBody>
              </Card>
              <Card minW={{ base: '100px', md: '140px' }} maxW="200px">
                <CardHeader>
                  <Text fontSize={{ base: 'xl', md: '2xl' }}>{timeLeft.seconds || '0'}</Text>
                </CardHeader>
                <CardBody>
                  <Text>Segundos</Text>
                </CardBody>
              </Card>
            </SimpleGrid>
          </Box>
        </Box>
        <Box w={{ base: 'full', md: '50%' }}>
          <Image
            src="https://bancoestudiantil.com/wp-content/uploads/2017/07/img-under-construction-02.png"
            alt="Under Construction"
            objectFit="cover"
            maxH="300px"
            mx="auto"
          />
        </Box>
      </Flex>
    </Container>
  );
};

export default ComingSoonPage;
