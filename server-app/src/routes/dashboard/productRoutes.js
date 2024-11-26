// routes/dashboard/productRoutes.js
import express from 'express';
import {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
} from '../../controllers/dashboard/productController.js';
import authMiddleware from '../../middleware/auth/authMiddleware.js';

const router = express.Router();

// Crear producto
router.post('/', authMiddleware, createProduct);

// Obtener todos los productos
router.get('/', getProducts);

// Obtener producto por ID
router.get('/:id', getProductById);

// Actualizar producto               
router.put('/:id', authMiddleware, updateProduct);

// Eliminar producto
router.delete('/:id', authMiddleware, deleteProduct);

export default router;
