import React from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  Button, Text, VStack, HStack, Avatar, Badge, Box, Divider, SimpleGrid
} from "@chakra-ui/react";
import { FaUserShield, FaCalendarAlt, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const UserInfoModal = ({ user, isOpen, onClose }) => {
  if (!user) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Detalles del Usuario</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* Sección de Perfil */}
          <HStack spacing={4} mb={6}>
            <Avatar size="xl" src={user.avatar} />
            <VStack align="start">
              <Text fontSize="2xl" fontWeight="bold">{user.name}</Text>
              <Text fontSize="md" color="gray.600">{user.email}</Text>
              <Badge colorScheme={user.status === 'Activo' ? 'green' : 'red'}>
                {user.status}
              </Badge>
              <HStack>
                <FaUserShield />
                <Text>{user.role}</Text>
              </HStack>
            </VStack>
          </HStack>
          
          <Divider />

          {/* Sección de Actividad Reciente */}
          <VStack align="start" spacing={3} my={6}>
            <Text fontSize="lg" fontWeight="bold">Actividad Reciente</Text>
            <SimpleGrid columns={2} spacing={4} w="full">
              <HStack>
                <FaCalendarAlt />
                <Text>Último Acceso:</Text>
                <Text fontWeight="bold">15/08/2023 14:30</Text>
              </HStack>
              <HStack>
                <FaCalendarAlt />
                <Text>Registro en el Sistema:</Text>
                <Text fontWeight="bold">01/01/2023</Text>
              </HStack>
              <HStack>
                <FaUserShield />
                <Text>Última Actividad:</Text>
                <Text fontWeight="bold">Actualización de Perfil</Text>
              </HStack>
              <HStack>
                <FaUserShield />
                <Text>Historial de Sesiones:</Text>
                <Text fontWeight="bold">Ver Detalles</Text>
              </HStack>
            </SimpleGrid>
          </VStack>

          <Divider />

          {/* Información de Contacto */}
          <VStack align="start" spacing={3} my={6}>
            <Text fontSize="lg" fontWeight="bold">Información de Contacto</Text>
            <SimpleGrid columns={2} spacing={4} w="full">
              <HStack>
                <FaPhone />
                <Text>Teléfono Principal:</Text>
                <Text fontWeight="bold">+1234567890</Text>
              </HStack>
              <HStack>
                <FaPhone />
                <Text>Teléfono Secundario:</Text>
                <Text fontWeight="bold">+0987654321</Text>
              </HStack>
              <HStack>
                <FaMapMarkerAlt />
                <Text>Dirección:</Text>
                <Text fontWeight="bold">Calle 123, Ciudad, País</Text>
              </HStack>
            </SimpleGrid>
          </VStack>

          <Divider />

          {/* Historial de Roles y Permisos */}
          <VStack align="start" spacing={3} my={6}>
            <Text fontSize="lg" fontWeight="bold">Historial de Roles</Text>
            <VStack align="start" spacing={2}>
              <HStack>
                <FaUserShield />
                <Text>Cliente</Text>
                <Text fontSize="sm" color="gray.500">(01/01/2023 - 15/02/2023)</Text>
              </HStack>
              <HStack>
                <FaUserShield />
                <Text>Administrativo</Text>
                <Text fontSize="sm" color="gray.500">(15/02/2023 - 30/06/2023)</Text>
              </HStack>
              <HStack>
                <FaUserShield />
                <Text>Veterinario</Text>
                <Text fontSize="sm" color="gray.500">(30/06/2023 - Presente)</Text>
              </HStack>
            </VStack>
          </VStack>

          <Divider />

          {/* Notas Administrativas */}
          <VStack align="start" spacing={3} my={6}>
            <Text fontSize="lg" fontWeight="bold">Notas Administrativas</Text>
            <Text fontStyle="italic" color="gray.300">
              "Usuario transferido al rol de Veterinario debido a su experiencia en la clínica desde Junio 2023."
            </Text>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>Cerrar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UserInfoModal;
