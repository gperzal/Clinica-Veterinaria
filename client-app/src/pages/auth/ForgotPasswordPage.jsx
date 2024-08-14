
// src/pages/auth/ForgotPasswordPage.jsx
import React from 'react';
import { Container, Flex, Image } from '@chakra-ui/react';
import ForgotPasswordForm from '../../components/auth/ForgotPasswordForm';
import LogoForgotPassword from '../../assets/img/forgot-password2.jpeg'; // Importa la imagen
const ForgotPasswordPage = () => {
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
            alt={'Forgot Password Image'}
            objectFit={'cover'}
            borderRadius={'lg'}
            w={{ base: 'full', md: 'xl' }}
            src={LogoForgotPassword}
          />
        </Flex>
        <Flex flex={1} justifyContent="flex-start" alignItems="center">
          <ForgotPasswordForm />
        </Flex>
      </Flex>
    </Container>
  );
};

export default ForgotPasswordPage;
