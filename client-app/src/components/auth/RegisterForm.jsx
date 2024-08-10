import {
  Button,
  Checkbox,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Divider,
  useToast,
  Center
} from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc'
import { FaFacebook } from 'react-icons/fa'
import { SiLinkedin, SiMessenger } from 'react-icons/si'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../services/auth/authService';

export default function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await register({ name, email, password });
      if (response || response.data || response.data.message === 'Registration successful!') {
        toast({
          title: 'Registro exitoso',
          description: `Bienvenido ${name}`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        setTimeout(() => {
          navigate('/login');
        }, 3000); // Redirige después de 3 segundos
      } else {
        setErrorMessage('Error al registrar. Intente de nuevo.');
      }
    } catch (error) {
      setErrorMessage('Error al registrar. Intente de nuevo.');
    }
  };

  return (
    <Stack direction={{ base: 'column', md: 'row' }} w={'full'} maxW={'2xl'} >
      <Flex p={8} flex={1} align={'center'} justify={'center'} >
        <Stack spacing={4} w={'full'} maxW={'md'} border="1px solid #E2E8F0" borderRadius="md" p={8} boxShadow="lg">
          <Heading fontSize={'2xl'} textAlign={'center'}>Crea una cuenta</Heading>
          <form onSubmit={handleSubmit}>
            <FormControl id="name">
              <FormLabel>Nombre</FormLabel>
              <Input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </FormControl>
            <FormControl id="email" mt={4}>
              <FormLabel>Correo electrónico</FormLabel>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </FormControl>
            <FormControl id="password" mt={4}>
              <FormLabel>Contraseña</FormLabel>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </FormControl>
            <Stack spacing={6} mt={4}>
              <Button type="submit" colorScheme={'blue'} variant={'solid'}>
                Crear cuenta
              </Button>
            </Stack>
          </form>
          {errorMessage && <Text color="red.500">{errorMessage}</Text>}
          <Divider/>
          <Text textAlign={'center'} color={'gray.500'}>
            o regístrate con
          </Text>
          <Stack>
            <Button w={'full'} colorScheme={'facebook'} leftIcon={<FaFacebook />}>
              <Center>
                <Text>Registrarse con Facebook</Text>
              </Center>
            </Button>

            <Button w={'full'} variant={'outline'} leftIcon={<FcGoogle />}>
              <Center>
                <Text>Registrarse con Google</Text>
              </Center>
            </Button>

            <Button w={'full'} colorScheme={'messenger'} leftIcon={<SiLinkedin />}>
              <Center>
                <Text>Registrarse con LinkedIn</Text>
              </Center>
            </Button>

            <Button w={'full'} colorScheme={'messenger'} leftIcon={<SiMessenger />}>
              <Center>
                <Text>Registrarse con Messenger</Text>
              </Center>
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </Stack>
  );
}
