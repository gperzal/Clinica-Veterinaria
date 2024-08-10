// src/pages/auth/LoginPage.jsx

import React from 'react';
import { Container, Flex, Image } from '@chakra-ui/react';
import LoginForm from '../../components/auth/LoginForm';

const LoginPage = () => {
  return (
    <Container maxW={'10xl'} minH={'100vh'}  alignItems={'center'} justifyContent={'center'}>
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
            src={
              'src/assets/img/log.png'
            }
          />
        </Flex>
      </Flex>
    </Container>
    
  );
};

export default LoginPage;
