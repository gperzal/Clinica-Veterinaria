import React, { useState } from 'react';
import { Box, Button, Input, FormControl, FormLabel, Alert } from '@chakra-ui/react';
import { login } from '../../services/auth/authService';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login({ email, password });
      // Manejar la respuesta, por ejemplo guardar el token en localStorage
      console.log('Login successful:', data);
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      {error && <Alert status="error">{error}</Alert>}
      <FormControl id="email" mb="4">
        <FormLabel>Email address</FormLabel>
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </FormControl>
      <FormControl id="password" mb="4">
        <FormLabel>Password</FormLabel>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </FormControl>
      <Button type="submit" colorScheme="teal" size="md" mt="4">
        Login
      </Button>
    </Box>
  );
};

export default LoginForm;
