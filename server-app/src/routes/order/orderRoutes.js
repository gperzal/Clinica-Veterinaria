// routes/orderRoutes.js

import express from 'express';
import {
    createOrder,
    getOrders,
    getAllOrders,
    updateOrderStatus,
    deleteOrder
} from '../../controllers/order/orderController.js';
import authMiddleware from '../../middleware/auth/authMiddleware.js';

const router = express.Router();

// Rutas de cliente
router.post('/create', authMiddleware, createOrder);
router.get('/my-orders', authMiddleware, getOrders);
// Obtener todas las órdenes (solo admin)
router.get('/all-orders', authMiddleware, getAllOrders);

// Actualizar estado de una orden (solo admin)
router.put('/update-status', authMiddleware, updateOrderStatus);

// Eliminar una orden (solo admin)
router.delete('/delete/:orderId', authMiddleware, deleteOrder);

export default router;
