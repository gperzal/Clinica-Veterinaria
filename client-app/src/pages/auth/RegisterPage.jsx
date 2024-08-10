import React from 'react';
import { Container, Flex, Image } from '@chakra-ui/react';
import RegisterForm from '../../components/auth/RegisterForm';
import LogoRegister from '../../assets/img/ini.png'; // Importa la imagen


const RegisterPage = () => {
  return (
    <Container maxW={'10xl'} minH={'100vh'} alignItems={'center'} justifyContent={'center'}>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        alignItems={'center'}
        justifyContent={'center'}
        w={'full'}
        h={'100%'}
        gap={10}
      >
        <Flex flex={1} justifyContent="flex-end" alignItems="center">
          <Image
            alt={'Register Image'}
            objectFit={'cover'}
            borderRadius={'lg'}
            w={{ base: 'full', md: 'xl' }}
            src={LogoRegister}
          />
        </Flex>
        <Flex flex={1} justifyContent="flex-start" alignItems="center" >
          <RegisterForm />
        </Flex>
      </Flex>
    </Container>
  );
};

export default RegisterPage;
