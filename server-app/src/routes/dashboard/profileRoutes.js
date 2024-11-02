import express from 'express';
import { getProfile, updateProfile, changePassword, getPets, addPet, updatePet, deletePet, getOwnerById, getPetById, getSpecialists } from '../../controllers/dashboard/profileController.js';
import authMiddleware from '../../middleware/auth/authMiddleware.js';
import roleMiddleware from '../../middleware/auth/roleMiddleware.js';

const router = express.Router();

// Ruta para actualizar el perfil del usuario
router.get('/profile', authMiddleware, roleMiddleware(['Cliente', 'Administrativo', 'Veterinario', 'Administrador']), getProfile);

// Ruta para cambiar la contraseña
router.put('/password', authMiddleware, roleMiddleware(['Cliente', 'Administrativo', 'Veterinario', 'Administrador']), changePassword);

// Ruta para actualizar el perfil del usuario
router.put('/profile', authMiddleware, roleMiddleware(['Cliente', 'Administrativo', 'Veterinario', 'Administrador']), updateProfile);

// Ruta Obtener todas las mascotas
router.get('/pets', authMiddleware, roleMiddleware(['Cliente', 'Administrativo', 'Veterinario', 'Administrador']), getPets);

// Ruta para agregar una nueva mascota
router.post('/pets', authMiddleware, roleMiddleware(['Cliente', 'Administrativo', 'Veterinario', 'Administrador']), addPet);

// Ruta para actualizar la información de una mascota             
router.put('/pets/:petId', authMiddleware, roleMiddleware(['Cliente', 'Administrativo', 'Veterinario', 'Administrador']), updatePet);

// Ruta para eliminar una mascota  
router.delete('/pets/:petId', authMiddleware, roleMiddleware(['Cliente', 'Administrativo', 'Veterinario', 'Administrador']), deletePet);


// Ruta para obtener dueño por ID
router.get('/owners/:ownerId', getOwnerById);

// Ruta para obtener mascota por ID
router.get('/pets/:petId', getPetById);

// Ruta para obtener veterinarios y estilistas
router.get('/specialists', getSpecialists);

export default router;
