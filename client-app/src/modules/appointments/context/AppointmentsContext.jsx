import React, { createContext, useState } from 'react';

export const AppointmentsContext = createContext();

export const AppointmentsProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);
  const [overbookedAppointments, setOverbookedAppointments] = useState([]);

  const addAppointment = (newAppointment) => {
    setAppointments([...appointments, newAppointment]);
  };

  const cancelAppointment = (id) => {
    setAppointments(appointments.filter(appointment => appointment.id !== id));
  };

  const rescheduleAppointment = (id) => {
    const updatedAppointments = appointments.map(appointment =>
      appointment.id === id ? { ...appointment, date: new Date() } : appointment
    );
    setAppointments(updatedAppointments);
  };

  const approveOverbooking = (id) => {
    setOverbookedAppointments(overbookedAppointments.filter(appointment => appointment.id !== id));
  };

  return (
    <AppointmentsContext.Provider
      value={{
        appointments,
        overbookedAppointments,
        addAppointment,
        cancelAppointment,
        rescheduleAppointment,
        approveOverbooking
      }}
    >
      {children}
    </AppointmentsContext.Provider>
  );
};
