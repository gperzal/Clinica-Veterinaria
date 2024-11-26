// routes/dashboard/medicalRoutes.js

import express from 'express';
import {
  attendAppointment,
  saveMedicalRecord,
  getMedicalRecordByPet,
  updateMedicalEntry,
  deleteMedicalRecord,
  updatePet,
  updateAppointmentStatus
} from '../../controllers/dashboard/medicalRecordController.js';
import authMiddleware from '../../middleware/auth/authMiddleware.js';
import roleMiddleware from '../../middleware/auth/roleMiddleware.js';

const router = express.Router();

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


router.put('/:appointmentId/status', authMiddleware, roleMiddleware(['Veterinario', 'Administrador']), updateAppointmentStatus);


export default router;
