// src/components/auth/ForgotPasswordForm.jsx
import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  useToast
} from '@chakra-ui/react';
import { useState } from 'react';
import emailjs from 'emailjs-com';
import { requestTokenPasswordReset } from '../../services/auth/authService';

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  // variables de email.js
  const serviceId = 'service_r0ogdid';
  const templateId = 'template_megtktu';
  const publicKey = 'tAfZvCjdw7obYxW0f';
  const URLB = import.meta.env.VITE_BACKEND_API;
  const URLF = import.meta.env.VITE_FRONTEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
   
      // 1. Solicitar el token y nombre de usuario al backend
      const response = await requestTokenPasswordReset(email);
      const { resetToken, userName } = response.data; 


      // 2. Definir los parámetros del template para EmailJS
      const templateParams = {
        user_email: email,
        to_name: userName,
        reset_link: `${import.meta.env.VITE_FRONTEND_URL}/reset-password/${resetToken}`,
      };

      // 2. Definir los parámetros del template para EmailJS
      // const templateParams = {
      //   user_email: email,
      //   to_name: userName,
      //   reset_link: ${import.meta.env.VITE_FRONTEND_URL}/reset-password/${resetToken},
      // };

      // // 3. Enviar el correo usando EmailJS
      const result = await emailjs.send(
        serviceId, 
        templateId,  
        templateParams,
        publicKey
      );

      console.log('Service ID:', serviceId);
      console.log('Template ID:', templateId);
      console.log('Public Key:',publicKey);
      console.log('Frontend URL:', URLF);
      console.log('Backend URL:', URLB);



      if (result.status === 200) {
        toast({
          title: 'Solicitud Exitosa',
          description: 'Revisa tu correo electrónico para continuar con el restablecimiento de tu contraseña.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      } else {
        throw new Error('Error en el envío del correo.');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message || 'Algo salió mal. Intenta nuevamente.',
        status: 'error',
        duration: 5000,
        isClosable: true,
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
