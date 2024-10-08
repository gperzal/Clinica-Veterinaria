import express from 'express';
import { registerUser, loginUser, forgotPassword } from '../../controllers/auth/authController.js';

const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/register', registerUser);

// Ruta para iniciar sesión
router.post('/login', loginUser);

// Obtener Token Reset Password
router.post('/forgot-password', forgotPassword);



export default router;
