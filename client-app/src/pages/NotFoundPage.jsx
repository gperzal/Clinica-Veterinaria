// src/pages/NotFoundPage.jsx
import React from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import styles from '../assets/css/NotFoundPage.module.css';


const NotFoundPage = () => {
  return (
    
    <Box className={styles.container}>
      <Text className={styles.glitch} aria-hidden="true">404</Text>
      <Heading display="inline-block" as="h2" size="2xl" bgGradient="linear(to-r, teal.400, teal.600)" backgroundClip="text">
      <Text className={styles.message}>
          Página No Encontrada
        </Text>
      </Heading>
        <Text className={styles.message2}>
          Lo sentimos, la página que estás buscando no existe.
        </Text>
        <Link to="/">
        <Button colorScheme="teal" bgGradient="linear(to-r, teal.400, teal.500, teal.600)" color="white" variant="solid"  mt={5}>
          Volver al Inicio
        </Button>
        </Link>


    </Box>
  );
};

export default NotFoundPage;