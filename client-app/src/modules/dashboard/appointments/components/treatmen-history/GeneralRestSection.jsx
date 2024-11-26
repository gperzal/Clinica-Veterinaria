import React, { useState } from 'react';
import {
  Box, Heading, Accordion, AccordionItem, AccordionButton, AccordionPanel,
  AccordionIcon, Text, Button, HStack, Icon, VStack, useColorModeValue, Input, Tooltip
} from '@chakra-ui/react';
import { FaCalendarAlt, FaClock, FaPlusCircle } from 'react-icons/fa';

const GeneralRestSection = () => {
  const labelColor = useColorModeValue("teal.600", "teal.300");
  const [treatmentDays, setTreatmentDays] = useState({
    startDate: "01/10/2024",
    endDate: "07/10/2024",
    extendedDays: false,
  });

  const handleExtendDuration = () => {
    setTreatmentDays({ ...treatmentDays, extendedDays: !treatmentDays.extendedDays });
  };

  return (
    <Box mb={6} p={6} borderWidth="1px" borderRadius="lg" bg={useColorModeValue("white", "gray.800")}>
      <Heading size="md" color={labelColor} mb={4}>Información General del Reposo</Heading>

      <Accordion allowToggle borderRadius="lg" overflow="hidden" borderColor={useColorModeValue("gray.200", "gray.600")}>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left" fontWeight="bold" color={labelColor}>
                <Icon as={FaClock} mr={2} /> Duración del Reposo
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>

          <AccordionPanel pb={4} bg={useColorModeValue("gray.50", "gray.700")} borderRadius="md" p={4}>
            <VStack align="start" spacing={3}>
              <HStack>
                <Icon as={FaCalendarAlt} color="blue.400" />
                <Text fontWeight="semibold">Fecha de Inicio:</Text>
                <Input
                  type="date"
                  value={treatmentDays.startDate}
                  onChange={(e) => setTreatmentDays({ ...treatmentDays, startDate: e.target.value })}
                  maxW="200px"
                  size="sm"
                />
              </HStack>
              
              <HStack>
                <Icon as={FaCalendarAlt} color="blue.400" />
                <Text fontWeight="semibold">Fecha de Fin:</Text>
                <Input
                  type="date"
                  value={treatmentDays.endDate}
                  onChange={(e) => setTreatmentDays({ ...treatmentDays, endDate: e.target.value })}
                  maxW="200px"
                  size="sm"
                />
              </HStack>

              <Tooltip label="Extender el período de reposo si es necesario" fontSize="sm">
                <Button
                  leftIcon={<FaPlusCircle />}
                  mt={4}
                  colorScheme={treatmentDays.extendedDays ? "green" : "blue"}
                  onClick={handleExtendDuration}
                  size="sm"
                >
                  {treatmentDays.extendedDays ? 'Duración Extendida' : 'Extender Duración'}
                </Button>
              </Tooltip>
            </VStack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};

export default GeneralRestSection;
