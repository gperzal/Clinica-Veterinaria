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
  Center, Tooltip
} from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc'

import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth/context/AuthContext';
import { login } from '../../auth/services/authService';
import useToastNotification from '../../../hooks/useToastNotification';


export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false); 
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const toast = useToastNotification();
  const { login: loginContext } = useContext(AuthContext);



  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await login({ email, password });
      if (response.status === 200 && response.data.token) {
        const userData = {
          token: response.data.token,
          name: response.data.name,
          role: response.data.role,
          _id: response.data._id
        };
        // Llamar a loginContext con userData y rememberMe
        loginContext(userData, rememberMe);
  
        toast({
          title: 'Inicio de sesión exitoso',
          description: `Bienvenido ${response.data.name}`,
          status: 'success',
        });
        navigate('/'); 
      } else {
        setErrorMessage('Credenciales incorrectas.');
        
      }
    } catch (error) {
      setErrorMessage('Credenciales incorrectas.');
     
    }
  };

  return (
    <Stack direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'} border="1px solid #E2E8F0" borderRadius="md" p={8} boxShadow="lg">
          <Heading fontSize={'2xl'} textAlign={'center'}>Iniciar sesión </Heading>
          <form onSubmit={handleSubmit}>
            <FormControl id="email">
              <FormLabel>Correo electrónico</FormLabel>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </FormControl>
            <FormControl id="password" mt={4}>
              <FormLabel>Contraseña</FormLabel>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </FormControl>
            <Stack spacing={6} mt={4}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}
              >
                <Checkbox isChecked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)}>
                  Recordarme
                </Checkbox>
                <Text color={'blue.500'} cursor="pointer" onClick={() => navigate('/forgot-password')}>
                  ¿Olvidaste tu contraseña?
                </Text>
              </Stack>
              <Button type="submit" colorScheme={'blue'} variant={'solid'}>
                Iniciar sesión
              </Button>
            </Stack>
          </form>
          {errorMessage && <Text color="red.500">{errorMessage}</Text>}
          <Divider/>
          <Text textAlign={'center'} color={'gray.500'}>
            o inicia sesión con
          </Text>
          <Stack spacing={4} align="center" justify="center" >
            <Tooltip label="Este servicio está temporalmente fuera de servicio" aria-label="A tooltip">
              <Button w={'full'} variant={'outline'} leftIcon={<FcGoogle />}>
                <Center>
                  <Text>Iniciar sesión con Google</Text>
                </Center>
              </Button>
            </Tooltip>
        </Stack>
        </Stack>
      </Flex>
    </Stack>
  );
}
