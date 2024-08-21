import React, { useState } from 'react';
import {
  Box, Heading, SimpleGrid, FormControl, FormLabel, Input, Button, VStack,
  Image, Text, Select, Divider, Card, CardHeader, CardBody, CardFooter
} from '@chakra-ui/react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import StatusIndicator from '../../components/dashboard/StatusIndicator';

const ProfilePage = () => {
  const [mascotas, setMascotas] = useState([
    { nombre: 'Firulais', edad: '3 años', raza: 'Golden Retriever', color: 'Dorado', sexo: 'Macho', nroChip: '90088500012083', estadoSalud: 'Sano', status: 'Activo', imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVYcC0iQGB3Je2lKIzmlLtR67XhxKeUstOAbCc40Qj3M1hLlIfA98-QLj_PTsc8TWJ6sY&usqp=CAU' },
    { nombre: 'Mittens', edad: '2 años', raza: 'Siames', color: 'Blanco', sexo: 'Hembra', nroChip: '90055200012083', estadoSalud: 'Sano', status: 'Inactivo', imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVYcC0iQGB3Je2lKIzmlLtR67XhxKeUstOAbCc40Qj3M1hLlIfA98-QLj_PTsc8TWJ6sY&usqp=CAU' },
    { nombre: 'TTTT', edad: '3 años', raza: 'Golden Retriever', color: 'Dorado', sexo: 'Macho', nroChip: '900885000012083', estadoSalud: 'Sano', status: 'Activo', imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVYcC0iQGB3Je2lKIzmlLtR67XhxKeUstOAbCc40Qj3M1hLlIfA98-QLj_PTsc8TWJ6sY&usqp=CAU' },
    { nombre: 'AAA', edad: '2 años', raza: 'Siames', color: 'Blanco', sexo: 'Hembra', nroChip: '90055200012083', estadoSalud: 'Sano', status: 'Inactivo', imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVYcC0iQGB3Je2lKIzmlLtR67XhxKeUstOAbCc40Qj3M1hLlIfA98-QLj_PTsc8TWJ6sY&usqp=CAU' },
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

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 3, // Mostrar 3 tarjetas en pantallas grandes
    slidesToScroll: 2,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1024,  // Tablets y escritorio
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 768,  // Tablets pequeñas
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,  // Móviles
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };



  return (
    <Box p={4}>
      {/* Información Personal */}
      <VStack spacing={6} align="start" w="full">
        <Heading fontSize="2xl" fontWeight="bold" mb={4}>
          Información Personal
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="full">
          <FormControl>
            <FormLabel>Nombre Completo</FormLabel>
            <Input placeholder="Nombre Completo" />
          </FormControl>
          <FormControl>
            <FormLabel>Correo Electrónico</FormLabel>
            <Input type="email" placeholder="correo@ejemplo.com" />
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
          <FormControl>
            <FormLabel>Dirección</FormLabel>
            <Input placeholder="Calle, Ciudad, Código Postal" />
          </FormControl>
        </SimpleGrid>
        <Button colorScheme="blue" alignSelf="flex-end">
          Guardar Información
        </Button>

        <Divider my={8} />

        <Heading fontSize="lg" fontWeight="bold">
          Cambiar Contraseña
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="full">
          <FormControl>
            <FormLabel>Contraseña Actual</FormLabel>
            <Input type="password" placeholder="••••••••" />
          </FormControl>
          <FormControl>
            <FormLabel>Nueva Contraseña</FormLabel>
            <Input type="password" placeholder="••••••••" />
          </FormControl>
          <FormControl>
            <FormLabel>Confirmar Nueva Contraseña</FormLabel>
            <Input type="password" placeholder="••••••••" />
          </FormControl>
        </SimpleGrid>
        <Button colorScheme="teal" alignSelf="flex-end">
          Cambiar Contraseña
        </Button>
      </VStack>

      <Divider my={8} />

      {/* Organización de contenido principal */}
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
        {/* Formulario para agregar nueva mascota */}
        <Box p={4}>
          <Heading fontSize="2xl" fontWeight="bold" mb={4}>
            Administración de Mascotas
          </Heading>
          <VStack spacing={4} align="start" w="full">
            <SimpleGrid columns={1} spacing={4} w="full">
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
            </SimpleGrid>
            <SimpleGrid columns={1} spacing={4} w="full">
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
        </Box>

        {/* Carrusel de mascotas */}
        <Box p={4}>
          <Heading fontSize="2xl" fontWeight="bold" mb={4}>
            Lista de Mascotas
          </Heading>
          <Slider {...carouselSettings} >
            {mascotas.map((mascota, index) => (
               <Card key={index}  maxW="80%" m={5}  variant="outline">





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
          </Slider>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default ProfilePage;
