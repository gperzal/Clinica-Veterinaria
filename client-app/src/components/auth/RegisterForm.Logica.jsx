import React, { useState } from 'react';
import { Box, Button, Input, FormControl, FormLabel, Alert } from '@chakra-ui/react';
import { register } from '../../services/auth/authService';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await register({ name, email, password });
      setSuccess('¡Registro realizado con éxito! Por favor, inicie sesión.');
      setError('');
      // Puedes redirigir al usuario al login o realizar otra acción aquí
    } catch (err) {
      setError('Error de registro. Por favor, compruebe sus datos.');
      setSuccess('');
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      {error && <Alert status="error">{error}</Alert>}
      {success && <Alert status="success">{success}</Alert>}
      
      <FormControl id="name" mb="4">
        <FormLabel>Name</FormLabel>
        <Input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
      </FormControl>

      <FormControl id="email" mb="4">
        <FormLabel>Email address</FormLabel>
        <Input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
      </FormControl>

      <FormControl id="password" mb="4">
        <FormLabel>Password</FormLabel>
        <Input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
      </FormControl>

      <Button type="submit" colorScheme="teal" size="md" mt="4">
        Register
      </Button>
    </Box>
  );
};

export default RegisterForm;
