// src/routes/dashboard/usersRoutes.js

import express from 'express';
import multer from 'multer';
import {
    getUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    bulkUploadUsers,
    getUserSummary
} from '../../controllers/dashboard/usersControllers.js';

const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 },
});



// Rutas de usuarios
router.get('/', getUsers);
router.post('/', createUser);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/summary/:userId/', getUserSummary);

// Ruta de carga masiva
router.post('/bulk-upload', upload.single('file'), bulkUploadUsers);

export default router;
