import React, { useState, useEffect } from "react";
import {
  Box,
  VStack,
  Text,
  Progress,
  Spinner,
  useColorModeValue,
  Image,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { FaCheckCircle, FaHourglassHalf } from "react-icons/fa";
import Logo from "./Logotipo_Clave_Única.svg";

const Signature = () => {
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    "Enviando Contrato al Cliente...",
    "Procesando Validación de Clave Única...",
    "Cliente Firmando...",
    "Validando Firma...",
    "Contrato Aceptado con Éxito.",
  ];

  useEffect(() => {
    if (currentStep < steps.length) {
      const timeout = setTimeout(() => {
        setCurrentStep((prevStep) => prevStep + 1);
      }, 1000); 
      return () => clearTimeout(timeout);
    }
  }, [currentStep]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      bg={useColorModeValue("gray.50", "gray.900")}
      p={6}
    >
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
          <Image src={Logo} alt="Logotipo Clave Única" style={{ width: "150px", height: "auto" }} />
          <Spinner
            size="xl"
            color="teal.500"
            thickness="4px"
            visibility={currentStep < steps.length ? "visible" : "hidden"}
          />
          {steps.map((step, index) => (
            <HStack key={index} w="full" justify="start" spacing={4}>
              <Icon
                as={index <= currentStep ? FaCheckCircle : FaHourglassHalf}
                color={index <= currentStep ? "teal.500" : "gray.400"}
              />
              <Text
                fontSize="lg"
                fontWeight="medium"
                color={index <= currentStep ? textColor : "gray.400"}
              >
                {step}
              </Text>
            </HStack>
          ))}
          <Progress
            hasStripe
            isAnimated
            value={(currentStep / steps.length) * 100}
            w="full"
            colorScheme="teal"
            borderRadius="full"
          />
        </VStack>
      </Box>
    </Box>
  );
};

export default Signature;
