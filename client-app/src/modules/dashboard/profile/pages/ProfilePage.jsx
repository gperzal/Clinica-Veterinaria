// ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import {
  Box, Heading, SimpleGrid, FormControl, FormLabel, Input, Button, VStack,
  Image, Text, Select, Divider, Card, CardHeader, CardBody, CardFooter,Icon,
  InputGroup, InputRightElement, IconButton, useToast,
  NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper,
  InputLeftAddon, Link,Flex
  } from '@chakra-ui/react';
import { FaPaw, FaEye, FaEyeSlash }  from 'react-icons/fa';
import {  FiImage }  from 'react-icons/fi';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import StatusIndicator from '../../../dashboard/profile/components/StatusIndicator';
import { getProfile, updateProfile, changePassword, getPets, addPet, updatePet, deletePet } from '../services/profileService';

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    altPhone: '',
    birthdate: '',
    address: ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  const [pets, setPets] = useState([]);
  const [newPet, setNewPet] = useState({
    name: '',
    age: '',
    breed: '',
    color: '',
    sex: '',
    chipNumber: '',
    healthStatus: '',
    status: '',
    image: '',
  });

  const [isEditing, setIsEditing] = useState(false); 
  const [editingPetId, setEditingPetId] = useState(null); 

  // Inicializamos el hook useToast
  const toast = useToast();

  // Función para cargar los datos de perfil y mascotas desde el backend
  const loadData = async () => {
    try {
      const profileResponse = await getProfile();
      setProfile(profileResponse.data.user);  
      const petsResponse = await getPets();
      setPets(petsResponse.data.pets);  
    } catch (error) {
      console.error('Error al cargar datos:', error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Manejo de cambios en los inputs del perfil
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  // Guardar cambios en el perfil
  const handleSaveProfile = async () => {
    try {
      await updateProfile(profile);
      toast({
        title: 'Perfil actualizado con éxito.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      toast({
        title: 'Error al actualizar el perfil.',
        description: 'Por favor, inténtalo de nuevo más tarde.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Manejo de cambios en el formulario de contraseña
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  // Cambiar contraseña
  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      toast({
        title: 'Las contraseñas no coinciden.',
        description: 'Por favor, verifica que las contraseñas sean iguales.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    try {
      await changePassword({ 
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword 
      });
      toast({
        title: 'Contraseña cambiada con éxito.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error al cambiar contraseña:', error);
      toast({
        title: 'Error al cambiar la contraseña.',
        description: error.response?.data?.message || 'Por favor, inténtalo de nuevo más tarde.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Manejo de cambios en los inputs de la nueva mascota
  const handlePetInputChange = (e) => {
    const { name, value } = e.target;
    setNewPet({ ...newPet, [name]: value });
  };

  // Agregar o actualizar una mascota
  const handleAddOrUpdatePet = async () => {
    // Validaciones (ver siguiente sección)
    const requiredFields = ['name', 'age', 'breed', 'color', 'sex', 'healthStatus', 'status'];
    for (let field of requiredFields) {
      if (!newPet[field]) {
        toast({
          title: 'Campos obligatorios incompletos.',
          description: 'Por favor, completa todos los campos obligatorios.',
          status: 'warning',
          duration: 5000,
          isClosable: true,
        });
        return; // Salimos de la función si falta algún campo
      }
    }

    // Asignar imagen por defecto si no se proporciona una URL
    const petData = {
      ...newPet,
      image: newPet.image || 'https://i.pinimg.com/236x/27/af/c7/27afc74ef24f6902dfdc0f2a5c676d32.jpg',
    };
  
    try {
      if (isEditing) {
        // Actualizar mascota
        await updatePet(editingPetId, petData);
        toast({
          title: 'Mascota actualizada con éxito.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      } else {
        // Agregar mascota
        await addPet(petData);
        toast({
          title: 'Mascota agregada con éxito.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      }
  
      // Recargar la lista de mascotas desde el backend
      const petsResponse = await getPets();
      setPets(petsResponse.data.pets);
  
      // Resetear el formulario
      setNewPet({
        name: '',
        age: '',
        breed: '',
        color: '',
        sex: '',
        chipNumber: '',
        healthStatus: '',
        status: '',
        image: 'https://i.pinimg.com/236x/27/af/c7/27afc74ef24f6902dfdc0f2a5c676d32.jpg',
      });
  
      setIsEditing(false);
      setEditingPetId(null);
  
    } catch (error) {
      console.error('Error al agregar o actualizar mascota:', error);
      toast({
        title: 'Error al guardar la mascota.',
        description: error.response?.data?.message || 'Por favor, verifica los datos e inténtalo de nuevo.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Eliminar una mascota
  const handleDeletePet = async (petId) => {
    try {
      await deletePet(petId);
      // Recargar la lista de mascotas desde el backend
      const petsResponse = await getPets();
      setPets(petsResponse.data.pets);
      toast({
        title: 'Mascota eliminada con éxito.',
        status: 'info',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error al eliminar mascota:', error);
      toast({
        title: 'Error al eliminar la mascota.',
        description: 'Por favor, inténtalo de nuevo más tarde.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Cargar datos de la mascota en el formulario para editar
  const handleEditPet = (pet) => {
    setNewPet({
      name: pet.name || '',
      age: pet.age || '',
      breed: pet.breed || '',
      color: pet.color || '',
      sex: pet.sex || '',
      chipNumber: pet.chipNumber || '',
      healthStatus: pet.healthStatus || '',
      status: pet.status || '',
      image: pet.image || '',
    });
    setIsEditing(true);
    setEditingPetId(pet._id);
  };

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 2,
    slidesToScroll: 2,
    adaptiveHeight: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } }
    ]
  };

  const formattedBirthdate = profile.birthdate ? profile.birthdate.split('T')[0] : '';

  // Manejo de visibilidad de contrasenias
  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });

  const handleTogglePasswordVisibility = (field) => {
    setShowPasswords({
      ...showPasswords,
      [field]: !showPasswords[field],
    });
  };

  return (
    <Box p={4}>
      {/* Información Personal */}
      <VStack spacing={6} align="start" w="full">
        <Heading fontSize="2xl" fontWeight="bold" mb={4}>
          Información Personal
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="full">
          <FormControl isRequired>
            <FormLabel>Nombre Completo</FormLabel>
            <Input
              name="name"
              value={profile.name}
              onChange={handleProfileChange}
              placeholder="Nombre Completo"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Correo Electrónico</FormLabel>
            <Input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleProfileChange}
              placeholder="correo@ejemplo.com"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Teléfono Principal</FormLabel>
            <Input
              name="phone"
              value={profile.phone}
              onChange={handleProfileChange}
              placeholder="Teléfono Principal"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Teléfono Alternativo (opcional)</FormLabel>
            <Input
              name="altPhone"
              value={profile.altPhone}
              onChange={handleProfileChange}
              placeholder="Teléfono Alternativo (opcional)"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Fecha de Nacimiento</FormLabel>
            <Input
              type="date"
              name="birthdate"
              value={formattedBirthdate}
              onChange={handleProfileChange}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Dirección</FormLabel>
            <Input
              name="address"
              value={profile.address}
              onChange={handleProfileChange}
              placeholder="Calle, Ciudad, Código Postal"
            />
          </FormControl>
        </SimpleGrid>
        <Button colorScheme="blue" alignSelf="flex-end" onClick={handleSaveProfile}>Guardar Información</Button>

        <Divider my={8} />

        <Heading fontSize="lg" fontWeight="bold">
          Cambiar Contraseña
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="full">
        <FormControl>
          <FormLabel>Contraseña Actual</FormLabel>
          <InputGroup>
            <Input
              type={showPasswords.currentPassword ? 'text' : 'password'}
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              placeholder="••••••••"
            />
            <InputRightElement>
              <IconButton
                variant="ghost"
                aria-label={showPasswords.currentPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                icon={showPasswords.currentPassword ? <FaEyeSlash /> : <FaEye />}
                onClick={() => handleTogglePasswordVisibility('currentPassword')}
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl>
          <FormLabel>Nueva Contraseña</FormLabel>
          <InputGroup>
            <Input
              type={showPasswords.newPassword ? 'text' : 'password'}
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              placeholder="••••••••"
            />
            <InputRightElement>
              <IconButton
                variant="ghost"
                aria-label={showPasswords.newPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                icon={showPasswords.newPassword ? <FaEyeSlash /> : <FaEye />}
                onClick={() => handleTogglePasswordVisibility('newPassword')}
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl>
          <FormLabel>Confirmar Nueva Contraseña</FormLabel>
          <InputGroup>
            <Input
              type={showPasswords.confirmNewPassword ? 'text' : 'password'}
              name="confirmNewPassword"
              value={passwordData.confirmNewPassword}
              onChange={handlePasswordChange}
              placeholder="••••••••"
            />
            <InputRightElement>
              <IconButton
                variant="ghost"
                aria-label={showPasswords.confirmNewPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                icon={showPasswords.confirmNewPassword ? <FaEyeSlash /> : <FaEye />}
                onClick={() => handleTogglePasswordVisibility('confirmNewPassword')}
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>
      </SimpleGrid>
        <Button colorScheme="teal" alignSelf="flex-end" onClick={handleChangePassword}>Cambiar Contraseña</Button>
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
              <FormControl isRequired>
                <FormLabel>Nombre</FormLabel>
                <Input
                  placeholder="Nombre de la mascota"
                  name="name"
                  value={newPet.name}
                  onChange={handlePetInputChange}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Edad</FormLabel>
                  <NumberInput
                  min={0}
                  max={100}
                  value={newPet.age}
                  onChange={(valueString) =>
                    setNewPet({ ...newPet, age: parseInt(valueString) || '' })
                  }
                >
                  <NumberInputField
                    placeholder="Edad de la mascota"
                    name="age"
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                   </NumberInput>
                </FormControl>
              <FormControl isRequired>
                <FormLabel>Raza</FormLabel>
                <Input
                  placeholder="Raza de la mascota"
                  name="breed"
                  value={newPet.breed}
                  onChange={handlePetInputChange}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Color</FormLabel>
                <Input
                  placeholder="Color de la mascota"
                  name="color"
                  value={newPet.color}
                  onChange={handlePetInputChange}
                />
              </FormControl>
            </SimpleGrid>
            <SimpleGrid columns={1} spacing={4} w="full">
              <FormControl isRequired>
                <FormLabel>Sexo</FormLabel>
                <Select
                  name="sex"
                  value={newPet.sex}
                  onChange={handlePetInputChange}
                >
                  <option value="">Seleccione</option>
                  <option value="Macho">Macho</option>
                  <option value="Hembra">Hembra</option>
                </Select>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Número de Chip</FormLabel>
                <Input
                  placeholder="Número de chip"
                  name="chipNumber"
                  value={newPet.chipNumber}
                  onChange={handlePetInputChange}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Estado de Salud General</FormLabel>
                <Select
                  name="healthStatus"
                  value={newPet.healthStatus}
                  onChange={handlePetInputChange}
                >
                  <option value="">Seleccione</option>
                  <option value="Sano">Sano</option>
                  <option value="En tratamiento">En tratamiento</option>
                </Select>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Status</FormLabel>
                <Select
                  name="status"
                  value={newPet.status}
                  onChange={handlePetInputChange}
                >
                  <option value="">Seleccione</option>
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                </Select>
              </FormControl>
            </SimpleGrid>
            <FormControl >
          <FormLabel>
            <Flex align="center">
              <Icon as={FiImage} mr={2} />
              URL de imagen (opcional)
            </Flex>
          </FormLabel>
          <InputGroup>
            <InputLeftAddon children="https://" />
            <Input
              name="image"
              value={newPet.image}
              onChange={handlePetInputChange}
              placeholder="ejemplo.com/imagen.jpg"
            />
          </InputGroup>
          <Text fontSize="sm" mt={1} color="gray.500">
            Sube tu imagen a un servicio de alojamiento como{' '}
            <Link href="https://imgbb.com" color="blue.500" isExternal>
              imgbb.com
            </Link>{' '}
            o{' '}
            <Link href="https://postimages.org" color="blue.500" isExternal>
              postimages.org
            </Link>
            , y pega el enlace aquí.
          </Text>
        </FormControl>
            <Button colorScheme="green" onClick={handleAddOrUpdatePet}>
              {isEditing ? 'Actualizar Mascota' : 'Agregar Mascota'}
            </Button>
          </VStack>
        </Box>

        {/* Carrusel de mascotas */}
        <Box p={4}>
        <Heading fontSize="2xl" fontWeight="bold" mb={4}>
          Lista de Mascotas
        </Heading>
        {pets.length === 0 ? (
          <Text>No tienes mascotas registradas.</Text>
        ) : (
          <Slider {...carouselSettings}>
            {pets.map((pet) => (
              <Box key={pet._id} p={2}>
                {/* ... tarjeta de mascota */}
                <Card variant="outline" width="100%" height="100%">
                <CardHeader display="flex" justifyContent="space-between" alignItems="center" bg="teal.500"  color="white" pb={2}>
                  <Icon as={FaPaw} w={6} h={6} mb={2} />
                  <Heading size="lg" fontWeight="bold" textAlign="center" pb={2} >
                    {pet.name || 'Nombre Desconocido'}
                  </Heading>
                  <StatusIndicator status={pet.status || 'Inactivo'} />
                </CardHeader>
                <CardBody>
                  <Image
                    src={pet.image || 'https://via.placeholder.com/150'}
                    alt={pet.name || 'Mascota'}
                    borderRadius="lg"
                    mb={4}
                    width="100%"
                    height="200px"
                    objectFit="cover"
                  />
                  <VStack align="start" spacing={1}>
                    <Text><strong>Edad:</strong> {pet.age ? `${pet.age} años` : 'Desconocido'}</Text>
                    <Text><strong>Raza:</strong> {pet.breed || 'Desconocida'}</Text>
                    <Text><strong>Sexo:</strong> {pet.sex || 'Desconocido'}</Text>
                    <Text><strong>Color:</strong> {pet.color || 'Desconocido'}</Text>
                    <Text><strong>Número de Chip:</strong> {pet.chipNumber || 'No disponible'}</Text>
                    <Text><strong>Estado de Salud:</strong> {pet.healthStatus || 'Desconocido'}</Text>
                  </VStack>
                </CardBody>
                <CardFooter display="flex" justifyContent="space-between">
                  <Button colorScheme="blue" onClick={() => handleEditPet(pet)}>Editar</Button>
                  <Button colorScheme="red" onClick={() => handleDeletePet(pet._id)}>Eliminar</Button>
                </CardFooter>
              </Card>
              </Box>
            ))}
          </Slider>
        )}
        
      </Box>
      </SimpleGrid>
    </Box>
  );
};

export default ProfilePage;
