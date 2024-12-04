import React from "react";
import { Box, VStack, Text, Progress, Spinner, useColorModeValue, Image } from "@chakra-ui/react";
import Logo from "./Logotipo_Clave_Única.svg";

const Signature = () => {
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");

  const steps = [
    "Enviando Contrato al Cliente...",
    "Procesando Validación de Clave Única...",
    "Cliente Firmando...",
    "Validando Firma...",
    "Contrato Aceptado con Éxito.",
  ];

  return (
    <Box
      p={8}
      bg={bgColor}
      borderRadius="lg"
      boxShadow="xl"
      maxW="md"
      w="full"
      textAlign="center"
    >
      <VStack spacing={6}>
         <Image src={Logo} alt="Logotipo Clave Única" style={{ width: "400px", height: "auto" }} />
        <Spinner size="xl" color="teal.500" thickness="4px" />
        {steps.map((step, index) => (
          <Text fontSize="xl" fontWeight="medium" color={textColor} key={index}>
            {step}
          </Text>
        ))}
        <Progress
          hasStripe
          isAnimated
          value={100}
          w="full"
          colorScheme="teal"
          borderRadius="full"
        />
      </VStack>
    </Box>
  );
};

export default Signature;
