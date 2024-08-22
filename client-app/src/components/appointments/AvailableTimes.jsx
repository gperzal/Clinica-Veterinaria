import React from 'react';
import { SimpleGrid, Button, Heading, VStack } from '@chakra-ui/react';

const times = [
  "09:00", "09:20", "09:40", "10:00", "10:20", "10:40",
  "11:00", "11:20", "11:40", "12:00", "12:20", "12:40",
  "13:00", "13:20", "13:40", "14:00", "14:20", "14:40",
  "15:00", "15:20", "15:40", "16:00", "16:20", "16:40",
];

const AvailableTimes = ({ selectedDate, onSelectTime }) => {
  const isTimeAvailable = (time) => {
    // Aquí puedes agregar la lógica para verificar si la hora está disponible.
    return Math.random() > 0.3; // Simulación de disponibilidad aleatoria
  };

  return (
    <VStack spacing={4} mt={6}>
      <Heading fontSize={'lg'}>Horas disponibles para {selectedDate}</Heading>
      <SimpleGrid columns={4} spacing={2} w="full">
        {times.map((time, index) => (
          <Button
            key={index}
            onClick={() => isTimeAvailable(time) && onSelectTime(time)}
            isDisabled={!isTimeAvailable(time)}
            colorScheme={isTimeAvailable(time) ? "green" : "gray"}
            variant={isTimeAvailable(time) ? "solid" : "outline"}
          >
            {time}
          </Button>
        ))}
      </SimpleGrid>
    </VStack>
  );
};

export default AvailableTimes;
