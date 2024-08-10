import React from 'react';
import { Box } from '@chakra-ui/react';
import LoginForm from '../../components/auth/LoginForm';

const LoginPage = () => {
  return (
    <Box maxW="sm" mx="auto" mt="10">
      <LoginForm />
    </Box>
  );
};

export default LoginPage;
