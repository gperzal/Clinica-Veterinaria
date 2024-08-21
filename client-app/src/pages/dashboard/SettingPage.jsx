// src/pages/dashboard/ProfilePage.jsx
import React, { useState } from 'react';
import {
  Box, Heading,  Switch, FormControl, FormLabel,   VStack, Select
 
} from '@chakra-ui/react';

const SettingPage = () => {


  return (
    <Box p={4}>
      {/* Sección de Preferencias de Cuenta */}
   
      <Box mt={10}>
        <Heading fontSize="2xl" fontWeight="bold" mb={4}>
          Preferencias de Cuenta
        </Heading>
        <VStack spacing={4} align="start" w="25%">
        <FormControl display="flex" alignItems="center">
          <FormLabel mb="0">Preferencias de Notificación</FormLabel>
          <Select placeholder="Seleccionar preferencia">
            <option value="email">Correo Electrónico</option>
            <option value="sms">SMS</option>
          </Select>
        </FormControl>
          <FormControl display="flex" alignItems="center">
            <FormLabel mb="0">Activar notificaciones</FormLabel>
            <Switch id="email-alerts" />
          </FormControl>
          <FormControl display="flex" alignItems="center">
            <FormLabel mb="0">Modo oscuro</FormLabel>
            <Switch id="dark-mode" />
          </FormControl>
        </VStack>
      </Box>

      </Box>
  
  );
};

export default SettingPage;
