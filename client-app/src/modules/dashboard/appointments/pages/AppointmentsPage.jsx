import React, { useState } from 'react';
import {
  Tabs, TabList, TabPanels, Tab, TabPanel, Box, Text, Heading, Icon, useColorModeValue,
} from "@chakra-ui/react";
import { LuClipboardList, LuFileText, LuFilePlus, LuFolder, LuCalendarCheck } from "react-icons/lu";
import { RiHospitalFill } from "react-icons/ri";
import { FaChartLine } from "react-icons/fa";

import MedicalAppointments from '../components/MedicalAppointments';
import MedicalFiche from '../components/MedicalFiche';
import Recipes from '../components/Recipes';
import Documents from '../components/Documents';
import TreatmentHistory from '../components/TreatmentHistory';
import HealthHistory from '../components/HealthHistory';
import MedicalControls from '../components/MedicalControls';
import { getOwnerById, getPetById } from '../../profile/services/profileService';

const AppointmentsPage = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [ownerData, setOwnerData] = useState(null);
  const [petData, setPetData] = useState(null);
  const [showTreatmentHistory, setShowTreatmentHistory] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);

  const bgColor = useColorModeValue("gray.50", "gray.900");
  const selectedColor = useColorModeValue("blue.500", "blue.300");

  const isPatientSelected = selectedPatient && ownerData && petData;

  const handleViewDetails = async (appointment) => {
    try {
      const ownerResponse = await getOwnerById(appointment.ownerId);
      const petResponse = await getPetById(appointment.petId);
      
      setSelectedPatient({ ownerId: appointment.ownerId, petId: appointment.petId });
      setOwnerData(ownerResponse.data.owner);
      setPetData(petResponse.data.pet);
      setTabIndex(1); // Cambia automáticamente a la pestaña de Ficha Médica
    } catch (error) {
      console.error("Error al obtener los datos del paciente:", error);
    }
  };

  return (
    <Box p={4} bg={bgColor} borderRadius="lg" shadow="md" maxW="90vw" mx="auto">
      <Heading fontSize="2xl" fontWeight="bold" mb={6} textAlign="center">
        Gestión de Citas Médicas
      </Heading>
      <Tabs index={tabIndex} onChange={(index) => setTabIndex(index)} variant="unstyled">
        <TabList
          display="flex"
          bg={bgColor}
          borderRadius="md"
          p="2"
          justifyContent="center"
          gap={4}
          boxShadow="sm"
          mb={4}
          overflowX="auto"
          whiteSpace="nowrap"
        >
          <Tab _selected={{ color: 'white', bg: selectedColor }} fontWeight="bold">
            <Icon as={LuClipboardList} mr={2} />
            <Text fontSize={{ base: "xs", md: "sm" }}>Citas Médicas</Text>
          </Tab>
          <Tab _selected={{ color: 'white', bg: selectedColor }} fontWeight="bold" isDisabled={!isPatientSelected}>
            <Icon as={LuFileText} mr={2} />
            <Text fontSize={{ base: "xs", md: "sm" }}>Ficha Médica</Text>
          </Tab>
          <Tab _selected={{ color: 'white', bg: selectedColor }} fontWeight="bold" isDisabled={!showTreatmentHistory}>
            <Icon as={RiHospitalFill} mr={2} />
            <Text fontSize={{ base: "xs", md: "sm" }}>Historial de Tratamientos</Text>
          </Tab>
          <Tab _selected={{ color: 'white', bg: selectedColor }} fontWeight="bold" isDisabled={!isPatientSelected}>
            <Icon as={LuFilePlus} mr={2} />
            <Text fontSize={{ base: "xs", md: "sm" }}>Recetario</Text>
          </Tab>
          <Tab _selected={{ color: 'white', bg: selectedColor }} fontWeight="bold" isDisabled={!isPatientSelected}>
            <Icon as={LuFolder} mr={2} />
            <Text fontSize={{ base: "xs", md: "sm" }}>Documentos</Text>
          </Tab>
          <Tab _selected={{ color: 'white', bg: selectedColor }} fontWeight="bold" isDisabled={!isPatientSelected}>
            <Icon as={FaChartLine} mr={2} />
            <Text fontSize={{ base: "xs", md: "sm" }}>Histórico de Salud</Text>
          </Tab>
          <Tab _selected={{ color: 'white', bg: selectedColor }} fontWeight="bold" isDisabled={!isPatientSelected}>
            <Icon as={LuCalendarCheck} mr={2} />
            <Text fontSize={{ base: "xs", md: "sm" }}>Controles Médicos</Text>
          </Tab>
        </TabList>
        
        <TabPanels>
          <TabPanel>
            <MedicalAppointments onViewDetails={handleViewDetails} />
          </TabPanel>
          <TabPanel>
            {isPatientSelected ? (
              <MedicalFiche 
                ownerData={ownerData} 
                petData={petData}
                selectedPatient={selectedPatient} 
                onToggleTreatmentHistory={setShowTreatmentHistory}
              />
            ) : (
              <Text>Seleccione un paciente para ver la Ficha Médica.</Text>
            )}
          </TabPanel>
          <TabPanel>
            {showTreatmentHistory ? <TreatmentHistory selectedPatient={selectedPatient} /> : null}
          </TabPanel>
          <TabPanel>
            {isPatientSelected ? <Recipes /> : <Text>Seleccione un paciente para ver el Recetario.</Text>}
          </TabPanel>
          <TabPanel>
            {isPatientSelected ? <Documents /> : <Text>Seleccione un paciente para ver los Documentos.</Text>}
          </TabPanel>
          <TabPanel>
            {isPatientSelected ? <HealthHistory selectedPatient={selectedPatient} /> : <Text>Seleccione un paciente para ver el Histórico de Salud.</Text>}
          </TabPanel>
          <TabPanel>
            {isPatientSelected ? <MedicalControls selectedPatient={selectedPatient} /> : <Text>Seleccione un paciente para ver los Controles Médicos.</Text>}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default AppointmentsPage;
