import React from 'react';
import { Container, Stack, Flex, Box, Heading, Text, Button, Image,  Icon, useColorModeValue, useBreakpointValue } from '@chakra-ui/react';


export default function HomePage() {
  const overflowXValue = useBreakpointValue({ base: 'hidden', md: 'visible' }); // Aplica overflowX="hidden" solo en móviles


  return (
    <Container 
    maxW={'7xl'} 
    overflowX={overflowXValue} // Configura overflowX basado en el tamaño de la pantalla
  >
      <Stack
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
        direction={{ base: 'column', md: 'row' }}>
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}>
            <Text
              as={'span'}
              position={'relative'}
              _after={{
                content: "''",
                width: 'full',
                height: '30%',
                position: 'absolute',
                bottom: 1,
                left: 0,
                bg: 'red.400',
                zIndex: -1,
              }}>
              Bienvenidos a Clinica de Mascotas,
            </Text>
            <br />
            <Text as={'span'} color={'red.400'}>
              cuidado y amor para tus mascotas!
            </Text>
          </Heading>
          <Text color={'gray.500'}>
            En nuestra clínica veterinaria, ofrecemos una amplia gama de servicios para asegurar el bienestar de tus mascotas. Desde consultas veterinarias hasta servicios de peluquería, nos aseguramos de que reciban el mejor cuidado posible. ¡Agenda una cita o explora nuestros productos en línea!
          </Text>
          <Stack spacing={{ base: 4, sm: 6 }} direction={{ base: 'column', sm: 'row' }}>
            <Button
              rounded={'full'}
              size={'lg'}
              fontWeight={'bold'}
              px={6}
              colorScheme={'red'}
              bg={'red.400'}
              color={'white'} 
              _hover={{ bg: 'red.500' }}>
              Agenda una cita
            </Button>
            <Button
              rounded={'full'}
              size={'lg'}
              fontWeight={'bold'}
              px={6}
              bg={useColorModeValue('gray.300', 'gray.600')} 
              color={useColorModeValue('black', 'white')}  
              _hover={{ bg: 'gray.500' }}
              >
              Conoce más
            </Button>
          </Stack>
        </Stack>
        <Flex
          flex={1}
          justify={'center'}
          align={'center'}
          position={'relative'}
          w={'full'}>
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
            overflow={'hidden'}>
            <Image
              alt={'Hero Image'}
              fit={'cover'}
              align={'center'}
              w={'100%'}
              h={'100%'}
              src={
                'https://img.freepik.com/foto-gratis/perro-control-veterinario-tiro-medio_23-2149143871.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1723075200&semt=ais_hybrid'
              }
            />
          </Box>
        </Flex>
      </Stack>
    </Container>
  );
}



const Blob = (props) => {
  return (
    <Icon
      width={'100%'}
      viewBox="0 0 578 440"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M239.184 439.443c-55.13-5.419-110.241-21.365-151.074-58.767C42.307 338.722-7.478 282.729.938 221.217c8.433-61.644 78.896-91.048 126.871-130.712 34.337-28.388 70.198-51.348 112.004-66.78C282.34 8.024 325.382-3.369 370.518.904c54.019 5.115 112.774 10.886 150.881 49.482 39.916 40.427 49.421 100.753 53.385 157.402 4.13 59.015 11.255 128.44-30.444 170.44-41.383 41.683-111.6 19.106-169.213 30.663-46.68 9.364-88.56 35.21-135.943 30.551z"
        fill="currentColor"
      />
    </Icon>
  );
};
