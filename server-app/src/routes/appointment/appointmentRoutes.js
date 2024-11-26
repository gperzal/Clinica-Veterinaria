// routes/appointment/appointmentRoutes.js
import express from 'express';
import { createAppointment, getAppointmentsByUser, getAppointmentsBySpecialist } from '../../controllers/appointment/appointmentControllers.js';
import authMiddleware from '../../middleware/auth/authMiddleware.js';
import roleMiddleware from '../../middleware/auth/roleMiddleware.js';

const router = express.Router();



// Ruta para obtener citas de un usuario
router.get('/specialist/', authMiddleware, roleMiddleware(['Veterinario', 'Estilista']), getAppointmentsBySpecialist);

// Ruta para obtener citas de un usuario
router.get('/:userId', getAppointmentsByUser);

// Ruta para crear una nueva cita
router.post('/', createAppointment);

export default router;
