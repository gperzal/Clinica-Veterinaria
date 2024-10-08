// ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import {
  Box, Heading, SimpleGrid, FormControl, FormLabel, Input, Button, VStack,
  Image, Text, Select, Divider, Card, CardHeader, CardBody, CardFooter,Icon,
  InputGroup, InputRightElement, IconButton
} from '@chakra-ui/react';
import { FaPaw, FaEye, FaEyeSlash }  from 'react-icons/fa'; // Importamos un icono de paw (huella)
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import StatusIndicator from '../../components/dashboard/StatusIndicator';
import { getProfile, updateProfile, changePassword, getPets, addPet, updatePet, deletePet } from '../../services/dashboard/profileService';

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
    image: 'https://i.pinimg.com/236x/27/af/c7/27afc74ef24f6902dfdc0f2a5c676d32.jpg',
    notes: '',
  });

  const [isEditing, setIsEditing] = useState(false); 
  const [editingPetId, setEditingPetId] = useState(null); 

  // Función para cargar los datos de perfil y mascotas desde el backend
  const loadData = async () => {
    try {
      const profileResponse = await getProfile();
      console.log('Perfil cargado:', profileResponse.data);
      setProfile(profileResponse.data.user);  

      const petsResponse = await getPets();
      console.log('Mascotas cargadas:', petsResponse.data);
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
      alert('Perfil actualizado con éxito');
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
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
      alert('Las contraseñas no coinciden');
      return;
    }
    try {
      await changePassword({ 
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword 
      });
      alert('Contraseña cambiada con éxito');
    } catch (error) {
      console.error('Error al cambiar contraseña:', error);
    }
  };

  // Manejo de cambios en los inputs de la nueva mascota
  const handlePetInputChange = (e) => {
    const { name, value } = e.target;
    setNewPet({ ...newPet, [name]: value });
  };

  // Agregar o actualizar una mascota
  const handleAddOrUpdatePet = async () => {
    try {
      if (isEditing) {
        // Actualizar mascota
        await updatePet(editingPetId, newPet);
        alert('Mascota actualizada con éxito');
      } else {
        // Agregar mascota
        await addPet(newPet);
        alert('Mascota agregada con éxito');
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
        notes: '',
      });

      setIsEditing(false);
      setEditingPetId(null);

    } catch (error) {
      console.error('Error al agregar o actualizar mascota:', error);
    }
  };

  // Eliminar una mascota
  const handleDeletePet = async (petId) => {
    try {
      await deletePet(petId);
      // Recargar la lista de mascotas desde el backend
      const petsResponse = await getPets();
      setPets(petsResponse.data.pets);
      alert('Mascota eliminada con éxito');
    } catch (error) {
      console.error('Error al eliminar mascota:', error);
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
      notes: pet.notes || '',
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
          <FormControl>
            <FormLabel>Nombre Completo</FormLabel>
            <Input
              name="name"
              value={profile.name}
              onChange={handleProfileChange}
              placeholder="Nombre Completo"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Correo Electrónico</FormLabel>
            <Input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleProfileChange}
              placeholder="correo@ejemplo.com"
            />
          </FormControl>
          <FormControl>
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
          <FormControl>
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
              <FormControl>
                <FormLabel>Nombre</FormLabel>
                <Input
                  placeholder="Nombre de la mascota"
                  name="name"
                  value={newPet.name}
                  onChange={handlePetInputChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Edad</FormLabel>
                <Input
                  placeholder="Edad de la mascota"
                  name="age"
                  value={newPet.age}
                  type="number"
                  onChange={handlePetInputChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Raza</FormLabel>
                <Input
                  placeholder="Raza de la mascota"
                  name="breed"
                  value={newPet.breed}
                  onChange={handlePetInputChange}
                />
              </FormControl>
              <FormControl>
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
              <FormControl>
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
              <FormControl>
                <FormLabel>Número de Chip</FormLabel>
                <Input
                  placeholder="Número de chip"
                  name="chipNumber"
                  value={newPet.chipNumber}
                  onChange={handlePetInputChange}
                />
              </FormControl>
              <FormControl>
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
              <FormControl>
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
            <FormControl>
              <FormLabel>Notas adicionales</FormLabel>
              <Input
                placeholder="Notas sobre la mascota"
                name="notes"
                value={newPet.notes}
                onChange={handlePetInputChange}
              />
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
        <Slider {...carouselSettings}>
          {pets.map((pet) => (
            <Box key={pet._id} p={2}>
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
                    <Text><strong>Edad:</strong> {pet.age || 'Desconocido'}</Text>
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
      </Box>
      </SimpleGrid>
    </Box>
  );
};

export default ProfilePage;
