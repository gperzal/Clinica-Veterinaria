// routes/dashboard/medicalRoutes.js

import express from 'express';
import {
  attendAppointment,
  saveMedicalRecord,
  getMedicalRecordByPet,
  updateMedicalEntry,
  deleteMedicalRecord,
  updatePet,
  updateAppointmentStatus,
  updateTreatmentLog,
  updateTreatments,
  getTreatmentLogByAppointment,
  getTreatmentLog
} from '../../controllers/dashboard/medicalRecordController.js';
import authMiddleware from '../../middleware/auth/authMiddleware.js';
import roleMiddleware from '../../middleware/auth/roleMiddleware.js';

const router = express.Router();

// Obtener el registro médico de una cita
router.get("/by-appointment/:appointmentId", getTreatmentLogByAppointment);
// Obtener el registro médico de una cita
router.get("/by-treatment/:treatmentId", getTreatmentLog);


// Atender una cita (Iniciar atención)
router.post('/attend/:appointmentId', authMiddleware, roleMiddleware(['Veterinario', 'Administrador']), attendAppointment);



// Guardar la ficha médica y completar la cita
router.post('/save/:appointmentId', authMiddleware, roleMiddleware(['Veterinario', 'Administrador']), saveMedicalRecord);

// Obtener el registro médico de una mascota
router.get('/pet/:petId', authMiddleware, roleMiddleware(['Veterinario', 'Administrador']), getMedicalRecordByPet);

// Actualizar una entrada médica específica
router.put('/entry/:medicalRecordId/:entryId', authMiddleware, roleMiddleware(['Veterinario', 'Administrador']), updateMedicalEntry);

// Eliminar el registro médico de una mascota
router.delete('/pet/:petId', authMiddleware, roleMiddleware(['Veterinario', 'Administrador']), deleteMedicalRecord);

// Actualizar información de la mascota
router.put('/pet/:petId/update', authMiddleware, roleMiddleware(['Veterinario', 'Administrador']), updatePet);

router.patch('/treatment/:treatmentId', authMiddleware, roleMiddleware(['Veterinario', 'Administrador']), updateTreatmentLog);
router.patch('/treatment/:treatmentId/treatments', authMiddleware, roleMiddleware(['Veterinario', 'Administrador']), updateTreatments);

// Actualizar el estado de una cita
router.put('/status/:appointmentId', authMiddleware, roleMiddleware(['Veterinario', 'Administrador']), updateAppointmentStatus);


export default router;
