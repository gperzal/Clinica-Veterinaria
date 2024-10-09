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
router.post('/products', authMiddleware, createProduct);

// Obtener todos los productos
router.get('/products', getProducts);

// Obtener producto por ID
router.get('/products/:id', getProductById);

// Actualizar producto               
router.put('/products/:id', authMiddleware, updateProduct);

// Eliminar producto
router.delete('/products/:id', authMiddleware, deleteProduct);

export default router;
