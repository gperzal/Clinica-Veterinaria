import React from 'react';
import { Box } from '@chakra-ui/react';
import RegisterForm from '../../components/auth/RegisterForm';

const RegisterPage = () => {
  return (
    <Box maxW="sm" mx="auto" mt="10">
      <RegisterForm />
    </Box>
  );
};

export default RegisterPage;
