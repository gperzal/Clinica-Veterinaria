// routes/orderRoutes.js

import express from 'express';
import {
    createOrder,
    getUserOrders,
    getOrderById,
    cancelOrder,
    updateOrderStatus,
    getAllOrders,
    deleteOrder
} from '../../controllers/order/orderController.js';
import authMiddleware from '../../middleware/auth/authMiddleware.js';

const router = express.Router();

// Rutas de cliente
router.post('/', authMiddleware, createOrder);
// Ruta para obtener las órdenes del usuario
router.get('/my-orders', authMiddleware, getUserOrders);
// Ruta para obtener una orden por ID
router.get('/my-orders/:orderId', authMiddleware, getOrderById);

// Ruta para cancelar una orden
router.post('/cancel/:orderId', authMiddleware, cancelOrder);

// Rutas de administrador
// Obtener todas las órdenes (solo admin)
router.get('/all-orders', authMiddleware, getAllOrders);

// Actualizar estado de una orden (solo admin)
router.put('/status/:orderId', authMiddleware, updateOrderStatus);

// Eliminar una orden (solo admin)
router.delete('/:orderId', authMiddleware, deleteOrder);

export default router;
