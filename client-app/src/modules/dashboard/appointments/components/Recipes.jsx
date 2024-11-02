// src/modules/dashboard/appointments/components/Recipes.jsx
import React, { useState } from 'react';
import {
  Box, Heading, VStack, FormControl, FormLabel, Input, Textarea, Button, HStack, useColorModeValue,
  Flex, Text, Divider, useToast
} from '@chakra-ui/react';
import { FaPrint, FaEnvelope, FaSignature } from 'react-icons/fa';

const Recipes = ({ petData, ownerData }) => {
  const [prescription, setPrescription] = useState("");
  const [dosage, setDosage] = useState("");
  const [duration, setDuration] = useState("");
  const [signature, setSignature] = useState(""); // Para la firma electrónica
  const toast = useToast();

  const handleSend = () => {
    toast({
      title: "Receta enviada",
      description: "La receta ha sido enviada al correo del propietario.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const handlePrint = () => {
    const originalContent = document.body.innerHTML;
    const recipeContent = document.querySelector(".printable").innerHTML;
    document.body.innerHTML = recipeContent;
    window.print();
    document.body.innerHTML = originalContent;
  };

  return (
    <Box className="printable" p={6} bg={useColorModeValue("white", "gray.800")} borderRadius="lg" shadow="md">
      <Heading size="lg" color="teal.500" mb={6} textAlign="center">
        Recetario Médico
      </Heading>
      <VStack spacing={4} align="start">
        {/* Datos del paciente */}
        <Text fontSize="lg" fontWeight="bold" color="teal.500">
          Paciente: {petData?.name || "Nombre de la Mascota"}
        </Text>
        <Text color="gray.500">Propietario: {ownerData?.name || "Nombre del Dueño"}</Text>

        <Divider />

        {/* Formulario de Prescripción */}
        <FormControl id="prescription">
          <FormLabel color="teal.600">Prescripción</FormLabel>
          <Textarea
            value={prescription}
            onChange={(e) => setPrescription(e.target.value)}
            placeholder="Escriba el tratamiento o medicamento prescrito"
          />
        </FormControl>

        <FormControl id="dosage">
          <FormLabel color="teal.600">Dosis</FormLabel>
          <Input
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
            placeholder="Ej. 2 veces al día"
          />
        </FormControl>

        <FormControl id="duration">
          <FormLabel color="teal.600">Duración del tratamiento</FormLabel>
          <Input
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="Ej. 10 días"
          />
        </FormControl>

        {/* Sección de firma */}
        <FormControl id="signature">
          <FormLabel color="teal.600">Firma Electrónica</FormLabel>
          <Input
            placeholder="Ingrese su nombre para firmar"
            value={signature}
            onChange={(e) => setSignature(e.target.value)}
            icon={<FaSignature />}
          />
        </FormControl>

        {/* Botones de acción */}
        <HStack spacing={4} mt={6}>
          <Button colorScheme="teal" leftIcon={<FaEnvelope />} onClick={handleSend}>
            Enviar por Correo
          </Button>
          <Button colorScheme="teal" leftIcon={<FaPrint />} onClick={handlePrint}>
            Imprimir
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default Recipes;
