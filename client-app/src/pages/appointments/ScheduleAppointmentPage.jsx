import React, { useState } from 'react';
import { 
  Box, Container, Flex, Heading, 
  useColorModeValue, useToast, 
} from '@chakra-ui/react';
import WeeklyCalendar from '../../components/appointments/WeeklyCalendar';
import AvailableTimes from '../../components/appointments/AvailableTimes';
import DoctorSelection from '../../components/appointments/DoctorSelection';
import ConfirmationModal from '../../components/appointments/ConfirmationModal';  

const ScheduleAppointmentPage = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toast = useToast();

  const handleDateSelection = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
    setSelectedDoctor(null);
  };

  const handleTimeSelection = (time) => {
    setSelectedTime(time);
  };

  const handleDoctorSelection = (doctor) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };

  const handleConfirmAppointment = () => {
    toast({
      title: "Cita confirmada",
      description: `Tu cita con el Dr./Dra. ${selectedDoctor} ha sido programada para el ${selectedDate} a las ${selectedTime}.`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    setIsModalOpen(false);
  };
  

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
          <WeeklyCalendar onSelectDate={handleDateSelection} />
          {selectedDate && (
            <AvailableTimes selectedDate={selectedDate} onSelectTime={handleTimeSelection} />
          )}
          {selectedTime && (
            <DoctorSelection selectedDate={selectedDate} selectedTime={selectedTime} onSelectDoctor={handleDoctorSelection} />
          )}
        </Box>

        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          selectedDoctor={selectedDoctor}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          onConfirm={handleConfirmAppointment}
        />

      </Flex>
    </Container>
  );
};

export default ScheduleAppointmentPage;
