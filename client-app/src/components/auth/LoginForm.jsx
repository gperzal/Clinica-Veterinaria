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
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { login } from '../../services/auth/authService';

import { gapi } from 'gapi-script';
import GoogleLogin from 'react-google-login';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false); 
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const toast = useToast();
  const { login: loginContext } = useContext(AuthContext);  // Aquí obtenemos la función de login del contexto

  const [googleButtonVisible, setGoogleButtonVisible] = useState(true);
  const clientID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  useEffect(() => {
    const start = () => {
      gapi.auth2.init({
        clientId: clientID,
      });
    };
    gapi.load('client:auth2', start);
  }, [clientID]);

  const onSuccess = (response) => {
    const userProfile = response.profileObj;

    // Aquí actualizamos el contexto de autenticación
    loginContext({
      name: userProfile.name,
      imageUrl: userProfile.imageUrl,
      email: userProfile.email,
      token: response.tokenId,
    });

    setGoogleButtonVisible(false); 
    toast({
      title: 'Inicio de sesión con Google exitoso',
      description: `Bienvenido ${userProfile.name}`,
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
    navigate('/'); // Redirigir a la página principal
  };

  const onFailure = (response) => {
    console.log("Something went wrong", response);
    toast({
      title: 'Error al iniciar sesión con Google',
      description: 'Hubo un problema al iniciar sesión con Google.',
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login({ email, password });
      if (response.status === 200 && response.data.token) {
        const userData = { token: response.data.token, name: response.data.name };

        // Guardar en localStorage o sessionStorage dependiendo de "Recordarme"
        if (rememberMe) {
          localStorage.setItem('userData', JSON.stringify(userData));
        } else {
          sessionStorage.setItem('userData', JSON.stringify(userData));
        }

        loginContext(userData);
        toast({
          title: 'Inicio de sesión exitoso',
          description: `Bienvenido ${response.data.name}`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        navigate('/'); // Redirigir a la página principal
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
          <Stack >
            {googleButtonVisible && (
              <GoogleLogin
                clientId={clientID}
                render={renderProps => (
                  <Button w={'full'} maxW={'md'} variant={'outline'} leftIcon={<FcGoogle />} onClick={renderProps.onClick} disabled={renderProps.disabled}>
                    <Center>
                      <Text>Continue with Google</Text>
                    </Center>
                  </Button>
                )}
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
              />
            )}
            <Button w={'full'} colorScheme={'facebook'} leftIcon={<FaFacebook />}>
              <Center>
                <Text>Iniciar sesión con Facebook</Text>
              </Center>
            </Button>
            <Button w={'full'} colorScheme={'messenger'} leftIcon={<SiLinkedin />}>
              <Center>
                <Text>Iniciar sesión con LinkedIn</Text>
              </Center>
            </Button>
            <Button w={'full'} colorScheme={'messenger'} leftIcon={<SiMessenger />}>
              <Center>
                <Text>Iniciar sesión con Messenger</Text>
              </Center>
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </Stack>
  );
}
