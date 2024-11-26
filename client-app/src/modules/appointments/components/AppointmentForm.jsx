import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  VStack,
} from '@chakra-ui/react';
import { FaCalendarAlt } from 'react-icons/fa';

// Generar opciones de tiempo en intervalos de 20 minutos
const generateTimeSlots = () => {
  const timeSlots = [];
  for (let hour = 8; hour <= 18; hour++) {
    for (let minutes = 0; minutes < 60; minutes += 20) {
      const time = `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      timeSlots.push(time);
    }
  }
  return timeSlots;
};

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    service: '',
    doctor: '',
    date: '',
    time: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para manejar el envío del formulario
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <VStack spacing={4} align="start">
        <Heading fontSize="2xl">Programar Cita</Heading>

        {/* Tipo de Servicio */}
        <FormControl id="service" isRequired>
          <FormLabel>Tipo de Servicio</FormLabel>
          <Select
            placeholder="Selecciona el tipo de servicio"
            name="service"
            value={formData.service}
            onChange={handleInputChange}
          >
            <option value="veterinario">Consulta Veterinaria</option>
            <option value="estetica">Estética Canina</option>
            <option value="vacunacion">Vacunación</option>
          </Select>
        </FormControl>

        {/* Selección de Doctor */}
        <FormControl id="doctor" isRequired>
          <FormLabel>Doctor</FormLabel>
          <Select
            placeholder="Selecciona un doctor"
            name="doctor"
            value={formData.doctor}
            onChange={handleInputChange}
          >
            <option value="dr.smith">Dr. Smith</option>
            <option value="dr.jones">Dr. Jones</option>
            <option value="dr.williams">Dr. Williams</option>
          </Select>
        </FormControl>

        {/* Selección de Fecha */}
        <FormControl id="date" isRequired>
          <FormLabel>Fecha de la Cita</FormLabel>
          <Input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
          />
        </FormControl>

        {/* Selección de Hora */}
        <FormControl id="time" isRequired>
          <FormLabel>Hora de la Cita</FormLabel>
          <Select
            name="time"
            value={formData.time}
            onChange={handleInputChange}
            placeholder="Selecciona una hora"
          >
            {generateTimeSlots().map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </Select>
        </FormControl>

        <Button type="submit" colorScheme="blue" size="lg" leftIcon={<FaCalendarAlt />}>
          Programar Cita
        </Button>
      </VStack>
    </Box>
  );
};

export default AppointmentForm;
