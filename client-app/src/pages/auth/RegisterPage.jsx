import React from 'react';
import { Container, Flex, Image } from '@chakra-ui/react';
import RegisterForm from '../../components/auth/RegisterForm';

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
            src={'src/assets/img/ini.png'}
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
