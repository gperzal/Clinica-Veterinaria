// src/components/auth/ResetPasswordForm.jsx
import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue
  } from '@chakra-ui/react';
  import { useState } from 'react';
  import { useNavigate, useParams } from 'react-router-dom'; // Asegúrate de tener react-router-dom instalado
  import axios from 'axios';
  import useToastNotification from '../../../hooks/useToastNotification';

  export default function ResetPasswordForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToastNotification();
    const navigate = useNavigate();
    const { resetToken } = useParams();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
  
      try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_API}/api/auth/reset-password`, {
          email,
          password,
          resetToken,
        });
  
        if (response.status === 200) {
          toast({
            title: 'Contraseña Restablecida',
            description: 'Tu contraseña ha sido actualizada exitosamente.',
            status: 'success',
          });
          navigate('/login'); // Redirigir a la página de inicio de sesión después de restablecer la contraseña
        }
      } catch (error) {
        toast({
          title: 'Error',
          description: error.response?.data?.message || 'Algo salió mal. Intenta nuevamente.',
          status: 'error',
        });
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack
          spacing={4}
          w={'full'}
          maxW={'md'}
          border="1px solid #E2E8F0"
          borderRadius="md"
          p={8}
          boxShadow="lg"
          bg={useColorModeValue('white', 'gray.700')}
          my={12}>
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
            Restablecer contraseña
          </Heading>
          <form onSubmit={handleSubmit}>
            <FormControl id="email" isRequired>
              <FormLabel>Correo electrónico</FormLabel>
              <Input
                placeholder="tu-correo@ejemplo.com"
                _placeholder={{ color: 'gray.500' }}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormControl>
            <FormControl id="password" isRequired mt={4}>
              <FormLabel>Nueva Contraseña</FormLabel>
              <Input
                placeholder="********"
                _placeholder={{ color: 'gray.500' }}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormControl>
            <Stack spacing={6} mt={6}>
              <Button
                type="submit"
                bg={'blue.400'}
                color={'white'}
                isLoading={isLoading}
                _hover={{
                  bg: 'blue.500',
                }}>
                Restablecer Contraseña
              </Button>
            </Stack>
          </form>
        </Stack>
      </Flex>
    );
  }
  