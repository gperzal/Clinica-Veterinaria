// src/components/auth/LoginForm.jsx
import React, { useState, useContext } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Stack, Text, Alert, AlertIcon } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { login } from '../../services/auth/authService';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { login: loginContext } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async () => {
      try {
          const response = await login({ email, password });
          console.log("Response:", response);
  
          // Dado que el 'token' y 'name' están en `response.data`
          if (response.data.token && response.data.name) {
              const userData = { token: response.data.token, name: response.data.name };
              loginContext(userData); // Guarda los datos del usuario en el contexto
              navigate('/'); // Redirigir a la página principal
          } else {
              setErrorMessage('Credenciales incorrectas.');
          }
      } catch (error) {
          console.error("Error in handleLogin:", error);
          setErrorMessage('Credenciales incorrectas.');
      }
  };
  

    return (
        <Box maxW="sm" mx="auto" mt="10">
            <Stack spacing={4}>
                {errorMessage && (
                    <Alert status="error">
                        <AlertIcon />
                        {errorMessage}
                    </Alert>
                )}
                <FormControl id="email">
                    <FormLabel>Correo electrónico</FormLabel>
                    <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </FormControl>
                <FormControl id="password">
                    <FormLabel>Contraseña</FormLabel>
                    <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </FormControl>
                <Button
                    onClick={handleLogin}
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{ bg: 'blue.500' }}
                >
                    Iniciar Sesión
                </Button>
            </Stack>
        </Box>
    );
};

export default LoginForm;
