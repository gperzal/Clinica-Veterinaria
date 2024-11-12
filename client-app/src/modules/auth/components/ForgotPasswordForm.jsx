// src/components/auth/ForgotPasswordForm.jsx
import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import { useState } from 'react';
import { requestTokenPasswordReset } from '../services/authService';
import useToastNotification from '../../../hooks/useToastNotification';

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToastNotification();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await requestTokenPasswordReset(email);
      toast({
        title: 'Solicitud Exitosa',
        description: 'Revisa tu correo electrónico para continuar con el restablecimiento de tu contraseña. Busca en Spam si no lo encuentras.',
        status: 'success',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message || 'Algo salió mal. Intenta nuevamente.',
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
      justify={'center'}>
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        border="1px solid #E2E8F0"
        borderRadius="md"
        p={8}
        boxShadow="lg"
        my={12}>
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }} textAlign="center">
          ¿Olvidaste tu contraseña?
        </Heading>
        <Text
          fontSize={{ base: 'sm', sm: 'md' }}
          color={useColorModeValue('gray.800', 'gray.400')}>
          Te enviaremos un enlace a tu correo electrónico para restablecer tu contraseña.
        </Text>
        <form onSubmit={handleSubmit}>
          <FormControl id="email">
            <Input
              placeholder="tu-correo@ejemplo.com"
              _placeholder={{ color: 'gray.500' }}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormControl>
          <Stack spacing={6} mt={4}>
            <Button
              type="submit"
              bg={'blue.400'}
              color={'white'}
              isLoading={isLoading}
              _hover={{
                bg: 'blue.500',
              }}>
              Solicitar Restablecimiento
            </Button>
          </Stack>
        </form>
      </Stack>
    </Flex>
  );
}
