// src/context/MedicalAppointmentsContext.js
import React, { createContext, useState, useContext } from "react";
import {
  attendAppointment,
  saveMedicalRecord,
  updateTreatmentLog,
  updateTreatments,
  getTreatmentLogByAppointment,
  getTreatmentLog,
  getMedicalRecordByPet,
  updateMedicalEntry,
  deleteMedicalEntry,
  updatePetInfo,
  setAppointmentStatus,
} from "../services/medicalRecordService";
import useToastNotification from "../../../../hooks/useToastNotification";

const MedicalAppointmentsContext = createContext();

export const MedicalAppointmentsProvider = ({ children }) => {
  const [treatmentLogs, setTreatmentLogs] = useState([]);
  const toast = useToastNotification();
  const updateTreatmentLogs = (updatedLogs) => {
    setTreatmentLogs(updatedLogs);
  };

  const handleAttendAppointment = async (appointmentId) => {
    return await attendAppointment(appointmentId);
  };

  const handleSaveMedicalRecord = async (appointmentId, data) => {
    return await saveMedicalRecord(appointmentId, data);
  };

  const handleUpdateTreatmentLog = async (treatmentId, treatmentLog) => {
    return await updateTreatmentLog(treatmentId, treatmentLog);
  };

  const handleUpdateTreatments = async (treatmentId, treatments) => {
    toast({
      title: "Tratamiento actualizado",
      description: "El tratamiento diario se ha actualizado correctamente.",
      status: "success",
    });
    return await updateTreatments(treatmentId, treatments);
  };

  const handleGetTreatmentLogByAppointment = async (appointmentId) => {
    return await getTreatmentLogByAppointment(appointmentId);
  };

  const handleGetTreatmentLog = async (treatmentId) => {
    return await getTreatmentLog(treatmentId);
  };

  const handleGetMedicalRecordByPet = async (petId) => {
    return await getMedicalRecordByPet(petId);
  };

  const handleUpdateMedicalEntry = async (medicalRecordId, entryId, entryData) => {
    return await updateMedicalEntry(medicalRecordId, entryId, entryData);
  };

  const handleDeleteMedicalEntry = async (medicalRecordId, entryId) => {
    return await deleteMedicalEntry(medicalRecordId, entryId);
  };

  const handleUpdatePetInfo = async (petId, petData) => {
    return await updatePetInfo(petId, petData);
  };

  const handleSetAppointmentStatus = async (appointmentId, status) => {
    return await setAppointmentStatus(appointmentId, status);
  };

  return (
    <MedicalAppointmentsContext.Provider
      value={{
        treatmentLogs,
        updateTreatmentLogs,
        handleAttendAppointment,
        handleSaveMedicalRecord,
        handleUpdateTreatmentLog,
        handleUpdateTreatments,
        handleGetTreatmentLogByAppointment,
        handleGetTreatmentLog,
        handleGetMedicalRecordByPet,
        handleUpdateMedicalEntry,
        handleDeleteMedicalEntry,
        handleUpdatePetInfo,
        handleSetAppointmentStatus,
      }}
    >
      {children}
    </MedicalAppointmentsContext.Provider>
  );
};

export const useMedicalAppointments = () => {
  return useContext(MedicalAppointmentsContext);
};
