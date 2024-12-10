import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  VStack,
  HStack,
  Avatar,
  Badge,
  Box,
  Divider,
  SimpleGrid,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import {
  FaPhone,
  FaMapMarkerAlt,
  FaPaw,
  FaShoppingCart,
  FaClipboardList,
} from "react-icons/fa";

const UserInfoModal = ({
  user,
  pets = [],
  orders = [],
  appointments = [],
  isOpen,
  onClose,
}) => {
  if (!user) return null; // Asegurarse de que haya un usuario antes de renderizar

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Información del Cliente</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* Información General del Cliente */}
          <VStack align="start" spacing={4}>
            <HStack spacing={4}>
              <Avatar size="xl" src={user.avatar || ""} />
              <VStack align="start">
                <Text fontSize="2xl" fontWeight="bold">
                  {user.name}
                </Text>
                <Text>{user.email}</Text>
                <Badge
                  colorScheme={user.role === "Administrador" ? "purple" : "blue"}
                >
                  {user.role}
                </Badge>
                <HStack>
                  <FaPhone />
                  <Text>{user.phone}</Text>
                </HStack>
                <HStack>
                  <FaMapMarkerAlt />
                  <Text>{user.address}</Text>
                </HStack>
              </VStack>
            </HStack>
          </VStack>
          <Divider my={6} />

          {/* Mascotas Asociadas */}
          <Box>
            <Text fontSize="lg" fontWeight="bold" mb={3}>
              <FaPaw /> Mascotas Asociadas
            </Text>
            {pets.length > 0 ? (
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Nombre</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {pets.map((pet) => (
                    <Tr key={pet._id}>
                      <Td>{pet.name}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            ) : (
              <Text>No hay mascotas asociadas.</Text>
            )}
          </Box>
          <Divider my={6} />

          {/* Órdenes Realizadas */}
          <Box>
            <Text fontSize="lg" fontWeight="bold" mb={3}>
              <FaShoppingCart /> Órdenes Realizadas
            </Text>
            {orders.length > 0 ? (
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Número de Orden</Th>
                    <Th>Fecha</Th>
                    <Th>Estado</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {orders.map((order) => (
                    <Tr key={order.orderNumber}>
                      <Td>{order.orderNumber}</Td>
                      <Td>{new Date(order.date).toLocaleDateString()}</Td>
                      <Td>
                        <Badge
                          colorScheme={
                            order.status === "Pendiente" ? "yellow" : "green"
                          }
                        >
                          {order.status}
                        </Badge>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            ) : (
              <Text>No hay órdenes realizadas.</Text>
            )}
          </Box>
          <Divider my={6} />

          {/* Citas Médicas */}
          <Box>
            <Text fontSize="lg" fontWeight="bold" mb={3}>
              <FaClipboardList /> Citas Médicas
            </Text>
            {appointments.length > 0 ? (
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Fecha</Th>
                    <Th>Hora</Th>
                    <Th>Servicio</Th>
                    <Th>Especialista</Th>
                    <Th>Mascota</Th>
                    <Th>Estado</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {appointments.map((appointment, index) => (
                    <Tr key={index}>
                      <Td>
                        {new Date(appointment.date).toLocaleDateString()}
                      </Td>
                      <Td>{appointment.time}</Td>
                      <Td>{appointment.serviceType}</Td>
                      <Td>{appointment.specialist}</Td>
                      <Td>{appointment.pet}</Td>
                      <Td>
                        <Badge
                          colorScheme={
                            appointment.status === "Finalizado"
                              ? "green"
                              : "blue"
                          }
                        >
                          {appointment.status}
                        </Badge>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            ) : (
              <Text>No hay citas médicas registradas.</Text>
            )}
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>
            Cerrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UserInfoModal;
