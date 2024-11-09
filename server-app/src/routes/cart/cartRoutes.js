// routes/cart/cartRoutes.js
import express from 'express';
import {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
} from '../../controllers/cart/cartController.js';
import authMiddleware from '../../middleware/auth/authMiddleware.js';

const router = express.Router();

// Obtener el carrito del usuario autenticado
router.get('/cart', authMiddleware, getCart);

// Agregar un producto al carrito del usuario autenticado
router.post('/cart', authMiddleware, addToCart);

// Actualizar la cantidad de un producto en el carrito
router.put('/cart/update', authMiddleware, updateCartItem);

// Remover un producto específico del carrito
router.delete('/cart/remove', authMiddleware, removeFromCart);

// Limpiar todos los productos del carrito del usuario
router.delete('/cart/clear', authMiddleware, clearCart);

export default router;
