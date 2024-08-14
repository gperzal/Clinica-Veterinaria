// src/pages/auth/ResetPasswordPage.jsx
import React from 'react';
import { Container, Flex } from '@chakra-ui/react';
import ResetPasswordForm from '../../components/auth/ResetPasswordForm';

const ResetPasswordPage = () => {
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
        <Flex flex={1} justifyContent="center" alignItems="center">
          <ResetPasswordForm />
        </Flex>
      </Flex>
    </Container>
  );
};

export default ResetPasswordPage;
