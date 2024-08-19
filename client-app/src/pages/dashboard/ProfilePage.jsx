// src/pages/dashboard/ProfilePage.jsx
import React, { useState } from 'react';
import {
  Box, Heading, SimpleGrid, Switch, FormControl, FormLabel, Input, Button, VStack,
  Card, CardHeader, CardBody, CardFooter, Image, Text, Select, Flex
} from '@chakra-ui/react';
import StatusIndicator from '../../components/dashboard/StatusIndicator';

const ProfilePage = () => {
  const [mascotas, setMascotas] = useState([
    { nombre: 'Firulais', edad: '3 años', raza: 'Golden Retriever', color: 'Dorado', sexo: 'Macho', nroChip: '900885000012083', estadoSalud: 'Sano', status: 'Activo', imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVYcC0iQGB3Je2lKIzmlLtR67XhxKeUstOAbCc40Qj3M1hLlIfA98-QLj_PTsc8TWJ6sY&usqp=CAU' },
    { nombre: 'Mittens', edad: '2 años', raza: 'Siames', color: 'Blanco', sexo: 'Hembra', nroChip: '90055200012083', estadoSalud: 'Sano', status: 'Inactivo', imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVYcC0iQGB3Je2lKIzmlLtR67XhxKeUstOAbCc40Qj3M1hLlIfA98-QLj_PTsc8TWJ6sY&usqp=CAU' },
  ]);

  const [nuevaMascota, setNuevaMascota] = useState({
    nombre: '',
    edad: '',
    raza: '',
    color: '',
    sexo: '',
    nroChip: '',
    estadoSalud: '',
    status: 'Activo',
    imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVYcC0iQGB3Je2lKIzmlLtR67XhxKeUstOAbCc40Qj3M1hLlIfA98-QLj_PTsc8TWJ6sY&usqp=CAU', // Imagen por defecto
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevaMascota({ ...nuevaMascota, [name]: value });
  };

  const handleAddMascota = () => {
    setMascotas([...mascotas, nuevaMascota]);
    setNuevaMascota({
      nombre: '', edad: '', raza: '', color: '', sexo: '', nroChip: '', estadoSalud: '', status: 'Activo',
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVYcC0iQGB3Je2lKIzmlLtR67XhxKeUstOAbCc40Qj3M1hLlIfA98-QLj_PTsc8TWJ6sY&usqp=CAU'
    });
  };

  return (
    <Box p={4}>
      {/* Información Personal */}
      <VStack spacing={4} align="start" w="full">
        <Heading fontSize="2xl" fontWeight="bold" mb={4}>
          Información Personal
        </Heading>
        {/* Formulario de información personal */}
        <FormControl>
          <FormLabel>Nombre Completo</FormLabel>
          <Input placeholder="Nombre Completo" />
        </FormControl>
        <FormControl>
          <FormLabel>Correo Electrónico</FormLabel>
          <Input type="email" placeholder="correo@ejemplo.com" />
        </FormControl>
        <FormControl>
          <FormLabel>Contraseña</FormLabel>
          <Input type="password" placeholder="••••••••" />
        </FormControl>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="full">
          <FormControl>
            <FormLabel>Dirección</FormLabel>
            <Input placeholder="Calle, Ciudad, Código Postal" />
          </FormControl>
          <FormControl>
            <FormLabel>Teléfono Principal</FormLabel>
            <Input placeholder="Teléfono Principal" />
          </FormControl>
          <FormControl>
            <FormLabel>Teléfono Alternativo</FormLabel>
            <Input placeholder="Teléfono Alternativo" />
          </FormControl>
          <FormControl>
            <FormLabel>Fecha de Nacimiento</FormLabel>
            <Input type="date" />
          </FormControl>
        </SimpleGrid>
        <FormControl display="flex" alignItems="center">
          <FormLabel mb="0">Preferencias de Notificación</FormLabel>
          <Select placeholder="Seleccionar preferencia">
            <option value="email">Correo Electrónico</option>
            <option value="sms">SMS</option>
          </Select>
        </FormControl>
      </VStack>

      {/* Sección de Preferencias de Cuenta */}
      <Box mt={10}>
        <Heading fontSize="2xl" fontWeight="bold" mb={4}>
          Preferencias de Cuenta
        </Heading>
        <VStack spacing={4} align="start" w="full">
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

      {/* Gestión de Mascotas */}
      <Box mt={10}>
        <Heading fontSize="2xl" fontWeight="bold" mb={4}>
          Gestión de Mascotas
        </Heading>
        {/* Formulario para agregar nueva mascota */}
        <VStack spacing={4} align="start" w="full">
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="full">
            <FormControl>
              <FormLabel>Nombre</FormLabel>
              <Input
                placeholder="Nombre de la mascota"
                name="nombre"
                value={nuevaMascota.nombre}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Edad</FormLabel>
              <Input
                placeholder="Edad de la mascota"
                name="edad"
                value={nuevaMascota.edad}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Raza</FormLabel>
              <Input
                placeholder="Raza de la mascota"
                name="raza"
                value={nuevaMascota.raza}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Color</FormLabel>
              <Input
                placeholder="Color de la mascota"
                name="color"
                value={nuevaMascota.color}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Sexo</FormLabel>
              <Select
                name="sexo"
                value={nuevaMascota.sexo}
                onChange={handleInputChange}
              >
                <option value="Macho">Macho</option>
                <option value="Hembra">Hembra</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Número de Chip</FormLabel>
              <Input
                placeholder="Número de chip"
                name="nroChip"
                value={nuevaMascota.nroChip}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Estado de Salud General</FormLabel>
              <Select
                name="estadoSalud"
                value={nuevaMascota.estadoSalud}
                onChange={handleInputChange}
              >
                <option value="Sano">Sano</option>
                <option value="En tratamiento">En tratamiento</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Status</FormLabel>
              <Select
                name="status"
                value={nuevaMascota.status}
                onChange={handleInputChange}
              >
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </Select>
            </FormControl>
          </SimpleGrid>
          <FormControl>
            <FormLabel>Notas adicionales</FormLabel>
            <Input
              placeholder="Notas sobre la mascota"
              name="notas"
              value={nuevaMascota.notas}
              onChange={handleInputChange}
            />
          </FormControl>
          <Button colorScheme="green" onClick={handleAddMascota}>
            Agregar Mascota
          </Button>
        </VStack>

        {/* Lista de mascotas */}
        <Heading fontSize="lg" fontWeight="bold" mt={8}>
          Lista de Mascotas
        </Heading>
        <Flex wrap="wrap" justifyContent="between" w="full" gap={4} mt={4}>
        {mascotas.map((mascota, index) => (
          <Card key={index} maxW={{ base: 'full', md: '48%'  }} variant={'outline'}>
            <CardHeader display="flex" justifyContent="space-between" alignItems="center">
              <Heading size="md">{mascota.nombre}</Heading>
              <StatusIndicator status={mascota.status} />
            </CardHeader>
            <CardBody>
              <Image src={mascota.imagen} alt={mascota.nombre} borderRadius="lg" mb={4} />
              <Text>Edad: {mascota.edad}</Text>
              <Text>Raza: {mascota.raza}</Text>
              <Text>Sexo: {mascota.sexo}</Text>
              <Text>Color: {mascota.color}</Text>
              <Text>Número de Chip: {mascota.nroChip}</Text>
              <Text>Estado de Salud: {mascota.estadoSalud}</Text>
            </CardBody>
            <CardFooter>
              <Button colorScheme="blue" mr={2}>Editar</Button>
              <Button colorScheme="red">Eliminar</Button>
            </CardFooter>
          </Card>
        ))}
      </Flex>

      </Box>
    </Box>
  );
};

export default ProfilePage;
