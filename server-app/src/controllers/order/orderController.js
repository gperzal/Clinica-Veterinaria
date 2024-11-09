// controllers/order/orderController.js

import Order from '../../models/Order.js';

// Crear una nueva orden
export const createOrder = async (req, res) => {
    try {
        const { items, shippingMethod, paymentMethod, customer } = req.body;

        const newOrder = new Order({
            customer: req.user.id, // Id del usuario autenticado
            items,
            shippingMethod,
            paymentMethod,
            status: 'pending', // Estado inicial
            date: new Date()
        });

        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la orden' });
    }
};

// Ver todas las órdenes del cliente
export const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ customer: req.user.id });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las órdenes' });
    }
};

// Cancelar una orden del cliente
export const cancelOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await Order.findOne({ _id: orderId, customer: req.user.id });

        if (!order) return res.status(404).json({ error: 'Orden no encontrada' });
        if (order.status !== 'pending') return res.status(400).json({ error: 'No se puede cancelar esta orden' });

        order.status = 'canceled';
        await order.save();
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: 'Error al cancelar la orden' });
    }
};
