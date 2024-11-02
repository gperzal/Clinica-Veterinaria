import React from 'react';
import { SimpleGrid, Button, Heading, Text, VStack, useBreakpointValue } from '@chakra-ui/react';

const daysOfWeek = ["L", "M", "X", "J", "V", "S", "D"];
const fullDaysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

const WeeklyCalendar = ({ onSelectDate }) => {
  const today = new Date();
  const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1));
  const isMobile = useBreakpointValue({ base: true, md: false });
  const days = Array.from({ length: 7 }).map((_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    return date;
  });

  return (
    <VStack spacing={4}>
      <Heading fontSize={'xl'}>Semana del {startOfWeek.toLocaleDateString()}</Heading>
      <SimpleGrid columns={isMobile ? 7 : 7} spacing={2} w="full">
        {days.map((date, index) => (
          <Button
            key={index}
            onClick={() => onSelectDate(date.toLocaleDateString())}
            colorScheme="blue"
            variant="solid"
            w="full"
            textAlign="center"
            p={isMobile ? 3 : 6}
            borderRadius="md"
          >
            <Text>{isMobile ? daysOfWeek[index] : fullDaysOfWeek[index]}</Text>
            <Text fontSize="sm">{date.getDate()}</Text>
          </Button>
        ))}
      </SimpleGrid>
    </VStack>
  );
};

export default WeeklyCalendar;
