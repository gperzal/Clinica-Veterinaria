// src/modules/dashboard/appointments/components/treatmen-history/ContractSection.jsx
import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Checkbox,
  Button,
  List,
  ListItem,
  ListIcon,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";

const ContractSection = ({ onSignContract }) => {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const labelColor = useColorModeValue("teal.600", "teal.300");

  return (
    <Box mb={6} p={4} borderWidth="1px" borderRadius="lg" bg={useColorModeValue("white", "gray.700")}>
      <Heading size="md" color={labelColor} mb={4}>
        Contrato de Responsabilidad
      </Heading>

      <Box
        borderWidth="1px"
        borderRadius="lg"
        p={4}
        bg={useColorModeValue("gray.100", "gray.600")}
        maxHeight="400px"
        overflowY="auto"
      >
        <Text fontSize="sm" fontWeight="bold" mb={4} color={labelColor}>
          <Box as="span" fontWeight="bold"> Cláusulas Principales: </Box>
        </Text>
        <List spacing={3} fontSize="sm" color="gray.100">
          <ListItem>
            <ListIcon as={FaCheckCircle} color="green.500" />
            <Box as="span" fontWeight="bold">1. Este contrato establece las responsabilidades del propietario y de la clínica.</Box>
          </ListItem>
          <ListItem>
            <ListIcon as={FaCheckCircle} color="green.500" />
            <Box as="span" fontWeight="bold">2. Responsabilidad del Propietario:</Box> El propietario se compromete a recoger a su mascota en la fecha y hora acordadas para su alta médica, salvo acuerdo en contrario o razones justificadas comunicadas por escrito.
          </ListItem>

          <ListItem>
            <ListIcon as={FaCheckCircle} color="green.500" />
            <Box as="span" fontWeight="bold">3. Obligación de Notificación:</Box> En caso de no poder recoger a la mascota en la fecha acordada, debe notificarse con al menos 2 horas de antelación. Las estadías prolongadas estarán sujetas a cargos adicionales.
          </ListItem>

          <ListItem>
            <ListIcon as={FaCheckCircle} color="green.500" />
            <Box as="span" fontWeight="bold">4. Abandono de la Mascota:</Box> Se considera abandono si no se retira en un plazo de 3 días después de la fecha de alta sin justificación válida, sujeto a la Ley de Tenencia Responsable de Mascotas (Ley N° 21.020).
          </ListItem>

          <ListItem>
            <ListIcon as={FaCheckCircle} color="green.500" />
            <Box as="span" fontWeight="bold">5. Acciones en Caso de Abandono:</Box> La clínica notificará a las autoridades competentes (Carabineros, PDI, Ministerio Público) y entregará la información necesaria para el caso.
          </ListItem>

          <ListItem>
            <ListIcon as={FaCheckCircle} color="green.500" />
            <Box as="span" fontWeight="bold">6. Cargos Adicionales:</Box> El propietario es responsable de los gastos adicionales por estadía prolongada, incluyendo alimentación, alojamiento, y cuidados médicos.
          </ListItem>

          <ListItem>
            <ListIcon as={FaCheckCircle} color="green.500" />
            <Box as="span" fontWeight="bold">7. Procedimiento de Notificación:</Box> La clínica intentará contactar al propietario hasta 3 veces antes de proceder con las acciones de la cláusula 5.
          </ListItem>

          <ListItem>
            <ListIcon as={FaCheckCircle} color="green.500" />
            <Box as="span" fontWeight="bold">8. Aceptación de Condiciones:</Box> Al firmar, el propietario acepta las condiciones. La clínica no se responsabiliza en caso de abandono por parte del propietario.
          </ListItem>

          <ListItem>
            <ListIcon as={FaCheckCircle} color="green.500" />
            <Box as="span" fontWeight="bold">9. Resolución de Conflictos:</Box> Cualquier conflicto se resolverá ante los tribunales competentes en la ciudad de _______________.
          </ListItem>

        </List>
       
       
       
        <Checkbox
          isChecked={termsAccepted}
          onChange={() => setTermsAccepted(!termsAccepted)}
          colorScheme="teal"
          mt={6}
        >
          Acepto los términos y condiciones del contrato de responsabilidad.
        </Checkbox>
      </Box>
      <Button
        colorScheme="green"
        isDisabled={!termsAccepted}
        mt={4}
        onClick={onSignContract}
      >
        Firmar Contrato
      </Button>
    </Box>
  );
};

export default ContractSection;
