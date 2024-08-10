import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Stack, Text, Divider, Heading, Center, useColorModeValue, Alert, AlertIcon } from '@chakra-ui/react';
import { FaGoogle, FaFacebook, FaTwitter } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { register } from '../../services/auth/authService';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await register({ name, email, password });
      if (response || response.data || response.data.message === 'Registration successful!') {
        setSuccessMessage('¡Cuenta registrada con éxito! Redirigiendo a la página de inicio de sesión...');
        setErrorMessage('');
        setTimeout(() => {
          navigate('/login');
        }, 3000); // Redirige después de 3 segundos
      } else {
        setErrorMessage('Error al registrar. Por favor, compruebe sus datos.');
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('Error al registrar. Por favor, compruebe sus datos.');
      setSuccessMessage('');
    }
  };

  return (
    <Box
      rounded={'lg'}
      boxShadow={'lg'}
      p={8}
      bg={useColorModeValue('white', 'gray.700')}
    >
      <Stack spacing={4}>
        <Heading fontSize={'2xl'} textAlign={'center'}>
          Crea una cuenta
        </Heading>
        <Text textAlign={'center'} color={'gray.500'}>
          ¿Ya tienes una cuenta? <a href="/login">Inicia sesión</a>
        </Text>

        {errorMessage && (
          <Alert status="error">
            <AlertIcon />
            {errorMessage}
          </Alert>
        )}

        {successMessage && (
          <Alert status="success">
            <AlertIcon />
            {successMessage}
          </Alert>
        )}

        <FormControl id="name">
          <FormLabel>Nombre</FormLabel>
          <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </FormControl>

        <FormControl id="email">
          <FormLabel>Correo electrónico</FormLabel>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormControl>

        <FormControl id="password">
          <FormLabel>Contraseña</FormLabel>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Text fontSize={'sm'} color={'gray.500'}>
            Mínimo 8 caracteres
          </Text>
        </FormControl>

        <Stack spacing={10} pt={2}>
          <Button
            loadingText="Creando"
            size="lg"
            bg={'blue.400'}
            color={'white'}
            _hover={{
              bg: 'blue.500',
            }}
            onClick={handleRegister}
          >
            Crear Cuenta
          </Button>
        </Stack>

        <Divider />

        <Text textAlign={'center'} color={'gray.500'}>
          o regístrate con
        </Text>

        <Stack direction="column" spacing={4} justify="center">
          <Button
            w={'full'}
            maxW={'md'}
            variant={'outline'}
            leftIcon={<FaGoogle color="red" />}>
            <Center>
              <Text>Regístrate con Google</Text>
            </Center>
          </Button>
          <Button
            w={'full'}
            maxW={'md'}
            variant={'outline'}
            leftIcon={<FaFacebook color="blue" />}>
            <Center>
              <Text>Regístrate con Facebook</Text>
            </Center>
          </Button>
          <Button
            w={'full'}
            maxW={'md'}
            variant={'outline'}
            leftIcon={<FaTwitter color="blue" />}>
            <Center>
              <Text>Regístrate con Twitter</Text>
            </Center>
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default RegisterForm;
