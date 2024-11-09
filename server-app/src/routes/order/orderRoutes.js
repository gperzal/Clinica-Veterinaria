// routes/orderRoutes.js

import express from 'express';
import { createOrder, getUserOrders, cancelOrder } from '../../controllers/order/orderController.js';
import authMiddleware from '../middleware/authMiddleware.js';


const router = express.Router();

// Rutas para el cliente
router.post('/create', authMiddleware, createOrder);
router.get('/my-orders', authMiddleware, getUserOrders);
router.put('/cancel/:orderId', authMiddleware, cancelOrder);


export default router;
