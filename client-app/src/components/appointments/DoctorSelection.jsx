import React from 'react';
import { SimpleGrid, Button, Heading, Text, VStack, Avatar, Box, useBreakpointValue } from '@chakra-ui/react';

const doctors = [
  { name: "Dr. John Doe", specialty: "Veterinaria General", image: "https://via.placeholder.com/100" },
  { name: "Dra. Jane Smith", specialty: "Cirugía Veterinaria", image: "https://via.placeholder.com/100" },
  { name: "Dr. John Doe", specialty: "Veterinaria General", image: "https://via.placeholder.com/100" },
  { name: "Dra. Jane Smith", specialty: "Cirugía Veterinaria", image: "https://via.placeholder.com/100" },
  { name: "Dr. John Doe", specialty: "Veterinaria General", image: "https://via.placeholder.com/100" },
  { name: "Dra. Jane Smith", specialty: "Cirugía Veterinaria", image: "https://via.placeholder.com/100" },
  { name: "Dr. John Doe", specialty: "Veterinaria General", image: "https://via.placeholder.com/100" },
  { name: "Dra. Jane Smith", specialty: "Cirugía Veterinaria", image: "https://via.placeholder.com/100" },
];

const DoctorSelection = ({ selectedDate, selectedTime, onSelectDoctor }) => {
  const columns = useBreakpointValue({ base: 2, md: 3 });

  return (
    <VStack spacing={4} mt={6}>
      <Heading fontSize={'lg'}>Doctores disponibles para {selectedDate} a las {selectedTime}</Heading>
      <SimpleGrid columns={columns} spacing={4} w="full" mt={2}>
        {doctors.map((doctor, index) => (
          <Button 
            key={index} 
            onClick={() => onSelectDoctor(doctor.name)} 
            variant="outline" 
            mb={10} 
            mt={10}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Avatar name={doctor.name} src={doctor.image} size="lg" mb={4} />
            <Text fontWeight="bold">{doctor.name}</Text>
            <Text fontSize="sm" color="gray.500">{doctor.specialty}</Text>
          </Button>
        ))}
      </SimpleGrid>
    </VStack>
  );
};

export default DoctorSelection;
