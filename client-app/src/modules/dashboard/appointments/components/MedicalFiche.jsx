import React, { useState, useEffect } from 'react';
import { Box, VStack, Divider, Stack, Button, Heading, useColorModeValue } from '@chakra-ui/react';
import { FaSave } from 'react-icons/fa';
import OwnerInfoSection from './medical-fiche/OwnerInfoSection';
import PetInfoSection from './medical-fiche/PetInfoSection';
import MedicalInfoSection from './medical-fiche/MedicalInfoSection';
import AllergiesSection from './medical-fiche/AllergiesSection';
import VaccinationHistorySection from './medical-fiche/VaccinationHistorySection';
import ExamsSection from './medical-fiche/ExamsSection';
import NotesSection from './medical-fiche/NotesSection';
import { attendAppointment, setAppointmentStatus, saveMedicalRecord, updatePetInfo } from '../services/medicalRecordService';
import useToastNotification from '../../../../hooks/useToastNotification';
import { MedicalInfoProps, SelectedAppointmentProps } from '../utils/validateProps';

const MedicalFiche = ({ ownerData, petData, selectedAppointment, onToggleTreatmentHistory, onBack }) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const [isClinicalRest, setIsClinicalRest] = useState(false);

  const showToast = useToastNotification();

  // Estado para guardar la información médica
  const [updatedPetData, setUpdatedPetData] = useState({});
  const [medicalInfo, setMedicalInfo] = useState({});
  const [allergies, setAllergies] = useState([]);
  const [exams, setExams] = useState([]);
  const [vaccinations, setVaccinations] = useState([]);
  const [notes, setNotes] = useState("");
  const [treatmentLog, setTreatmentLog] = useState({});

  const handleToggleClinicalRest = () => {
    const newState = !isClinicalRest;
    setIsClinicalRest(newState);
    onToggleTreatmentHistory(newState); 
  };

  const handleCancelAttention = async () => {
    try {
      await setAppointmentStatus(selectedAppointment._id, 'Pendiente');
      onBack();
    } catch (error) {
      console.error('Error al cancelar la atención:', error);
    }
  };

  const handleSaveMedicalRecord = async () => {
    try {
      const formattedExams = exams.map(({ id, ...rest }) => rest);
      await updatePetInfo(selectedAppointment.pet._id, updatedPetData);
      const medicalRecordData = {
        appointmentId: selectedAppointment._id,
        petId: selectedAppointment.pet._id,
        ownerId: selectedAppointment.pet.owner._id,
        medicalEntry: {
          weight: medicalInfo.weight,
          temperature: medicalInfo.temperature,
          heartRate: medicalInfo.heartRate,
          respiratoryRate: medicalInfo.respiratoryRate,
          bodyCondition: medicalInfo.bodyCondition,
          hydrationLevel: medicalInfo.hydrationLevel,
          systolicPressure: medicalInfo.systolicPressure,
          diastolicPressure: medicalInfo.diastolicPressure,
          mucosaColor: medicalInfo.mucosaColor,
          mucosaObservations: medicalInfo.mucosaObservations,
          activityLevel: medicalInfo.activityLevel,
          temperament: medicalInfo.temperament,
          diet: medicalInfo.diet,
          appetiteDigestion: medicalInfo.appetiteDigestion,
        },
        allergies: allergies,
        vaccinations: vaccinations,
        exams: formattedExams,
        notes: notes,
        treatmentLog: treatmentLog,
      };
      await saveMedicalRecord(selectedAppointment._id, medicalRecordData);
      showToast({ title: 'Ficha Clínica Guardada', description: 'Los datos de la ficha clínica se han guardado correctamente.', status: 'success' });

      if (selectedAppointment.status !== 'Finalizado') {
        await setAppointmentStatus(selectedAppointment._id, 'Finalizado');
        showToast({ title: 'Cita Finalizada', description: 'La cita ha sido marcada como finalizada.', status: 'success' });
      } else {
        showToast({ title: 'Cita Finalizada', description: 'La cita ya estaba marcada como finalizada.', status: 'warning' });
      }
      onBack();
    } catch {
      showToast({ title: 'Error', description: 'Error al guardar la ficha clínica.', status: 'error' });
    }
  };

  useEffect(() => {
    const fetchAppointmentDetails = async () => {
      try {
        const response = await attendAppointment(selectedAppointment._id);
        const { medicalRecord, medicalEntry } = response;
        console.log("Medical Entry Fetched:", medicalEntry);
  
        // Configurar datos de alergias, vacunas y exámenes
        if (medicalRecord) {
          setAllergies(medicalRecord.allergies || []);
          setExams(medicalRecord.exams || []);
          setVaccinations(medicalRecord.vaccinations || []);
        } else {
          setAllergies([]);
          setExams([]);
          setVaccinations([]);
        }
  
        // Configurar datos médicos
        if (medicalEntry) {
          if (medicalEntry.medicalInfo && typeof medicalEntry.medicalInfo === 'object') {
            setMedicalInfo((prev) => ({
              ...prev,
              ...Object.keys(medicalEntry.medicalInfo).reduce((acc, key) => {
                acc[key] = medicalEntry.medicalInfo[key] || '';
                return acc;
              }, {}),
            }));
          } else {
            setMedicalInfo({});
          }
  
          setNotes(medicalEntry.notes || '');
  
          // Manejo del estado de tratamientos
          if (medicalEntry.treatmentLog) {
            setTreatmentLog(medicalEntry.treatmentLog);
            const hasTreatments = medicalEntry.treatmentLog.treatments.length > 0;
  
            setIsClinicalRest(hasTreatments);
            onToggleTreatmentHistory(hasTreatments); // Sincronizar con el componente padre
          } else {
            setTreatmentLog({
              startDate: null,
              endDate: null,
              treatments: [],
              contractSigned: false,
            });
            setIsClinicalRest(false);
            onToggleTreatmentHistory(false); // Sincronizar con el componente padre
          }
        } else {
          setMedicalInfo({});
          setNotes('');
          setTreatmentLog({
            startDate: null,
            endDate: null,
            treatments: [],
            contractSigned: false,
          });
          setIsClinicalRest(false);
          onToggleTreatmentHistory(false); // Sincronizar con el componente padre
        }
      } catch (error) {
        console.error('Error al obtener los detalles de la cita:', error);
      }
    };
  
    fetchAppointmentDetails();
  }, [selectedAppointment]);
  

  return (
    <Box p={6} bg={bgColor} borderRadius="lg" shadow="lg" maxWidth="100%" mx="auto">
      <Heading size="lg" textAlign="center" mb={6} color="teal.500">
        Ficha Clínica de {petData?.name || 'Mascota'}
      </Heading>
      <VStack spacing={6} align="start">
        <OwnerInfoSection ownerData={ownerData} />
        <Divider />
        <PetInfoSection petData={petData} onPetDataChange={setUpdatedPetData} />
        <Divider />
        <MedicalInfoSection medicalInfo={medicalInfo} setMedicalInfo={setMedicalInfo} />
        <Divider />
        <AllergiesSection allergies={allergies} setAllergies={setAllergies} onAllergyChange={setAllergies} />
        <Divider />
        <VaccinationHistorySection vaccinations={vaccinations} setVaccinations={setVaccinations} />
        <Divider />
        <ExamsSection exams={exams} setExams={setExams} />
        <Divider />
        <NotesSection
          isClinicalRest={isClinicalRest}
          onToggleClinicalRest={handleToggleClinicalRest}
          notes={notes}
          setNotes={setNotes}
        />
        <Stack direction="row" justify="center" mt={6}>
          <Button
            leftIcon={<FaSave />}
            colorScheme="teal"
            size="lg"
            onClick={handleSaveMedicalRecord}
          >
            Guardar Ficha Clínica
          </Button>
          <Button
            colorScheme="red"
            variant="outline"
            onClick={handleCancelAttention}
          >
            Cancelar Atención
          </Button>
        </Stack>
      </VStack>
    </Box>
  );
};

MedicalInfoSection.propTypes = MedicalInfoProps;
MedicalFiche.propTypes = { ...SelectedAppointmentProps };

export default MedicalFiche;
