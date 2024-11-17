// routes/orderRoutes.js

import express from 'express';
import authMiddleware from '../../middleware/auth/authMiddleware.js';
import roleMiddleware from '../../middleware/auth/roleMiddleware.js';
import {
    createOrder,
    cancelOrder,
    getUserOrders,
    getOrderById,
    updateOrderStatus,
    getAllOrders,
    deleteOrder
} from '../../controllers/order/orderController.js';

const router = express.Router();

// Rutas para usuarios autenticados (Clientes)
router.post('/', authMiddleware, createOrder);
router.get('/', authMiddleware, getUserOrders);
router.get('/:orderId', authMiddleware, getOrderById);
router.put('/cancel/:orderId', authMiddleware, cancelOrder);

// Rutas para administradores
router.get('/admin/all', authMiddleware, roleMiddleware(['Administrador', 'Administrativo', 'Veterinario']), getAllOrders);
router.put('/admin/status/:orderId', authMiddleware, roleMiddleware(['Administrador', 'Administrativo', 'Veterinario']), updateOrderStatus);
router.delete('/admin/:orderId', authMiddleware, roleMiddleware(['Administrador', 'Administrativo', 'Veterinario']), deleteOrder);

export default router;