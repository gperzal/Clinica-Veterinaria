

import express from 'express';
import { getAllOrders, updateOrderStatus, deleteOrder } from '../../controllers/order/adminOrderController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Rutas para el administrador
router.get('/admin/orders', authMiddleware, adminMiddleware, getAllOrders);
router.put('/admin/orders/:orderId', authMiddleware, adminMiddleware, updateOrderStatus);
router.delete('/admin/orders/:orderId', authMiddleware, adminMiddleware, deleteOrder);

export default router;
