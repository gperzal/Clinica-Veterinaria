// /components/AvailableTimes.jsx
import React, { useState, useEffect } from 'react';
import { SimpleGrid, Button, Heading, VStack } from '@chakra-ui/react';

const times = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
  "18:00", 
];

const AvailableTimes = ({ selectedDate, onSelectTime }) => {
  const [availability, setAvailability] = useState({});

  useEffect(() => {
    // Generar la disponibilidad de cada hora solo una vez al cargar el componente
    const initialAvailability = times.reduce((acc, time) => {
      acc[time] = Math.random() > 0.3; // Simulación de disponibilidad
      return acc;
    }, {});
    setAvailability(initialAvailability);
  }, []);

  return (
    <VStack spacing={4} mt={6}>
      <Heading fontSize={'lg'}>Horas disponibles para {selectedDate}</Heading>
      <SimpleGrid columns={4} spacing={2} w="full">
        {times.map((time) => (
          <Button
            key={time}
            onClick={() => availability[time] && onSelectTime(time)}
            isDisabled={!availability[time]}
            colorScheme={availability[time] ? "green" : "gray"}
            variant={availability[time] ? "solid" : "outline"}
          >
            {time}
          </Button>
        ))}
      </SimpleGrid>
    </VStack>
  );
};

export default AvailableTimes;
