// routes/cart/cartRoutes.js
import express from 'express';
import {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    syncPrices
} from '../../controllers/cart/cartController.js';
import authMiddleware from '../../middleware/auth/authMiddleware.js';

const router = express.Router();

// Obtener el carrito del usuario autenticado
router.get('/', authMiddleware, getCart);

// Agregar un producto al carrito del usuario autenticado
router.post('/add', authMiddleware, addToCart);

// Actualizar la cantidad de un producto en el carrito
router.put('/update', authMiddleware, updateCartItem);

// Remover un producto específico del carrito
router.delete('/remove', authMiddleware, removeFromCart);

// Limpiar todos los productos del carrito del usuario
router.delete('/clear', authMiddleware, clearCart);

// Rutas de sincronización y actualización
router.post('/sync-prices', authMiddleware, syncPrices);


export default router;
