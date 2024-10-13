// src/pages/auth/LoginPage.jsx

import React from 'react';
import { Container, Flex, Image } from '@chakra-ui/react';
import LoginForm from '../../auth/components/LoginForm';
import LogoLogin from '../../../assets/img/log.png'; 

const LoginPage = () => {
  return (
    <Container maxW={'10xl'}  alignItems={'center'} justifyContent={'center'}>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        alignItems={'center'}
        justifyContent={'center'}
        w={'full'}
        h={'100%'} 
        gap={10}
      >
          <Flex flex={1} justifyContent="flex-end" alignItems="center">
          <LoginForm />
        </Flex>
         <Flex flex={1} justifyContent="flex-start" alignItems="center">
          <Image
            alt={'Login Image'}
            objectFit={'cover'}
            borderRadius={'lg'}
            w={{ base: 'full', md: 'xl' }}
            src={LogoLogin}
          />
        </Flex>
      </Flex>
    </Container>
    
  );
};

export default LoginPage;
