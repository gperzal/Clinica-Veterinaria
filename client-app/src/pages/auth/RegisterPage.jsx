import React from 'react';
import { Container, Flex, Image } from '@chakra-ui/react';
import RegisterForm from '../../components/auth/RegisterForm';
import LogoRegister from '../../assets/img/ini.png'; // Importa la imagen


const RegisterPage = () => {
  return (
    <Container maxW={'10xl'}  alignItems={'center'} justifyContent={'center'}>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        alignItems={'center'}
        justifyContent={'center'}
        w={'full'}
        h={'100%'}
        gap={4}
      >
        <Flex flex={1} justifyContent="flex-end" alignItems="center" order={{ base: 2, md: 1 }}>
          <Image
            alt={'Register Image'}
            objectFit={'cover'}
            borderRadius={'lg'}
            w={{ base: 'full', md: 'xl' }}
            src={LogoRegister}
          />
        </Flex>
        <Flex flex={1} justifyContent="flex-start" alignItems="center" order={{ base: 1, md: 2 }}>
          <RegisterForm />
        </Flex>
      </Flex>
    </Container>
  );
};

export default RegisterPage;
