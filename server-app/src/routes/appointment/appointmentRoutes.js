// routes/appointment/appointmentRoutes.js
import express from 'express';
import { createAppointment, getAppointmentsByUser } from '../../controllers/appointment/appointmentControllers.js';

const router = express.Router();

// Ruta para crear una nueva cita
router.post('/', createAppointment);

// Ruta para obtener citas de un usuario
router.get('/user/:userId', getAppointmentsByUser);

export default router;
