import React, { createContext, useState } from 'react';
import useToastNotification from '../../../hooks/useToastNotification';
import { createAppointment } from '../services/appointmentService';
import { getPets } from '../../dashboard/profile/services/profileService';

export const AppointmentsContext = createContext();

export const AppointmentsProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);
  const [pets, setPets] = useState([]);
  const toast = useToastNotification();

  const loadPets = async (user) => {
    try {
      const response = await getPets();
      const activePets = (response.data?.pets || []).filter((pet) => pet.status === 'Activo');
      setPets(activePets);
      return activePets;
    } catch (error) {
      toast({
        title: "Error al cargar mascotas",
        description: error.message || "No se pudieron cargar las mascotas del usuario.",
        status: "error",
      });
      throw error;
    }
  };

  const confirmAppointment = async (appointmentData, specialistName) => {
    try {
      const response = await createAppointment(appointmentData);
      console.log("Appointment created:", response.data);
      setAppointments([...appointments, response.data.appointment]);
      toast({
        title: "Cita confirmada",
        description: `Tu cita con ${specialistName} ha sido programada para el ${appointmentData.date} a las ${appointmentData.time}.`,
        status: "success",
      });
      return response.data;
    } catch (error) {
      toast({
        title: "Error al confirmar la cita",
        description: error.message || "No se pudo confirmar la cita. Por favor, intenta nuevamente.",
        status: "error",
      });
      throw error;
    }
  };
  

  return (
    <AppointmentsContext.Provider
      value={{
        appointments,
        pets,
        loadPets,
        confirmAppointment,
      }}
    >
      {children}
    </AppointmentsContext.Provider>
  );
};
