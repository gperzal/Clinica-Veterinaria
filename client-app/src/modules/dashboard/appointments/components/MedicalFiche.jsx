import React, { useState } from 'react';
import { Text, Box, VStack, Divider, Stack, Button, Heading, useColorModeValue, Switch } from '@chakra-ui/react';
import { FaSave } from 'react-icons/fa';
import OwnerInfoSection from './medical-fiche/OwnerInfoSection';
import PetInfoSection from './medical-fiche/PetInfoSection';
import MedicalInfoSection from './medical-fiche/MedicalInfoSection';
import AllergiesSection from './medical-fiche/AllergiesSection';
import VaccinationHistorySection from './medical-fiche/VaccinationHistorySection';
import ExamsSection from './medical-fiche/ExamsSection';
import NotesSection from './medical-fiche/NotesSection';
const MedicalFiche = ({ ownerData, petData, onToggleTreatmentHistory  }) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const [isClinicalRest, setIsClinicalRest] = useState(false);

  const handleToggleClinicalRest = () => {
    const newState = !isClinicalRest;
    setIsClinicalRest(newState);
    onToggleTreatmentHistory(newState); 
  };


  return (
    <Box p={6} bg={bgColor} borderRadius="lg" shadow="lg" maxWidth="100%" mx="auto">
      <Heading size="lg" textAlign="center" mb={6} color="teal.500">
        Ficha Clínica de {petData?.name || 'Mascota'}
      </Heading>
      <VStack spacing={6} align="start">
        <OwnerInfoSection ownerData={ownerData} />
        <Divider />
        <PetInfoSection petData={petData} />
        <Divider />
        <MedicalInfoSection />
        <Divider />
        <AllergiesSection />
        <Divider />
        <VaccinationHistorySection />
        <Divider />
        <ExamsSection />
        <Divider />
        <NotesSection isClinicalRest={isClinicalRest} onToggleClinicalRest={handleToggleClinicalRest} /> 
        
        <Stack direction="row" justify="center" mt={6}>
          <Button leftIcon={<FaSave />} colorScheme="teal" size="lg">
            Guardar Ficha Clínica
          </Button>
        </Stack>
      </VStack>
    </Box>
  );
};

export default MedicalFiche;
