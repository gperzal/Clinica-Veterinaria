import React, { useState, useEffect, useContext } from 'react';
import { 
  Box, Container, Flex, Heading, 
  useColorModeValue, Text,
} from '@chakra-ui/react';
import ServiceSelection from '../components/ServiceSelection';
import PetSelection from '../components/PetSelection';
import WeeklyCalendar from '../components/WeeklyCalendar';
import AvailableTimes from '../components/AvailableTimes';
import SpecialistSelection from '../components/SpecialistSelection';
import ConfirmationModal from '../components/ConfirmationModal';  
import { getPets } from '../../dashboard/profile/services/profileService';
import { AuthContext } from '../../auth/context/AuthContext';
import useToastNotification from '../../../hooks/useToastNotification';
import { createAppointment } from '../services/appointmentService';

const ScheduleAppointmentPage = () => {
  const { user } = useContext(AuthContext); 
  const [serviceType, setServiceType] = useState(null);
  const [selectedPet, setSelectedPet] = useState(null);
  const [pets, setPets] = useState([]);  
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedSpecialist, setSelectedSpecialist] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { showToast } = useToastNotification();

  useEffect(() => {
  }, [user]);

  useEffect(() => {
    if (!user) return;

    const fetchPets = async () => {
      try {
        const response = await getPets();
        const activePets = (response.data?.pets || []).filter((pet) => pet.status === 'Activo');
        setPets(activePets);
        if (activePets.length === 1) {
          setSelectedPet(activePets[0]);
        }
      } catch (error) {
        showToast({
          title: "Error al cargar mascotas",
          description: error.message || "No se pudieron cargar las mascotas del usuario.",
          status: "error",
        });
      }
    };

    fetchPets();
  }, [user, showToast]);

  const handleServiceSelection = (type) => {
    setServiceType(type);
    if (pets.length === 1) {
      setSelectedPet(pets[0]);
    } else {
      setSelectedPet(null);
    }
    setSelectedDate(null);
    setSelectedTime(null);
    setSelectedSpecialist(null);
  };

  const handlePetSelection = (pet) => {
    setSelectedPet(pet);
  };

  const handleDateSelection = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
    setSelectedSpecialist(null);
  };

  const handleTimeSelection = (time) => {
    setSelectedTime(time);
  };

  const handleSpecialistSelection = (specialist) => {
    setSelectedSpecialist(specialist);
    setIsModalOpen(true);
  };

  const formatDateToISO = (dateString) => {
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`; // Convierte a "YYYY-MM-DD"
  };

  const handleConfirmAppointment = async () => {
    const formattedDate = formatDateToISO(selectedDate); 
    const appointmentData = {
      date: formattedDate,
      time: selectedTime,
      serviceType,
      specialistId: selectedSpecialist._id,
      customerId: user._id,
      petId: selectedPet._id
    };
    console.log("Creating appointment with data:", appointmentData); // Agrega este log para verificar los datos

    try {
      console.log("Creating appointment with data:", appointmentData); 
      const response = await createAppointment(appointmentData);
      console.log("Appointment created:", response.data);
      showToast({
        title: "Cita confirmada",
        description: `Tu cita con ${selectedSpecialist.name} ha sido programada para el ${selectedDate} a las ${selectedTime}.`,
        status: "success",
      });
      setIsModalOpen(false);
    } catch (error) {
      showToast({
        title: "Error al confirmar la cita",
        description: error.message || "No se pudo confirmar la cita. Por favor, intenta nuevamente.",
        status: "error"
      });
    }
  };

  if (!user) {
    return (
      <Container maxW={'lg'} py={12} textAlign="center">
        <Box
          bg={useColorModeValue('white', 'gray.800')}
          borderRadius="lg"
          boxShadow="xl"
          p={8}
          border="1px solid #E2E8F0"
        >
          <Heading fontSize={'2xl'} mb={4}>Agendar una Cita</Heading>
          <Text fontSize="lg" color="red.500" fontWeight="bold">
            Debes estar registrado para agendar una cita.
          </Text>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxW={'10xl'} py={12} alignItems={'center'} justifyContent={'center'}>
      <Flex direction="column" alignItems={'center'} justifyContent={'center'} w={'full'} h={'100%'}>
        <Box
          w={'full'}
          maxW={'900px'}
          bg={useColorModeValue('white', 'gray.800')}
          borderRadius="lg"
          boxShadow="xl"
          p={8}
          textAlign="center"
          border="1px solid #E2E8F0"
        >
          <Heading fontSize={'3xl'} textAlign={'center'} mb={6}>
            Programar una Cita
          </Heading>

          {!serviceType && <ServiceSelection onSelectService={handleServiceSelection} />}

          {serviceType && pets.length > 1 && !selectedPet && (
            <PetSelection pets={pets} onSelectPet={handlePetSelection} />
          )}

          {serviceType && selectedPet && (
            <>
              <WeeklyCalendar onSelectDate={handleDateSelection} />
              {selectedDate && (
                <AvailableTimes selectedDate={selectedDate} onSelectTime={handleTimeSelection} />
              )}
              {selectedTime && (
                <SpecialistSelection 
                  selectedDate={selectedDate} 
                  selectedTime={selectedTime} 
                  onSelectSpecialist={handleSpecialistSelection} 
                  serviceType={serviceType}
                />
              )}
            </>
          )}
        </Box>

        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          selectedSpecialist={selectedSpecialist}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          serviceType={serviceType}
          selectedPet={selectedPet}
          onConfirm={handleConfirmAppointment}
        />
      </Flex>
    </Container>
  );
};

export default ScheduleAppointmentPage;
