// controllers/order/adminOrderController.js

import Order from '../../models/Order.js';

// Obtener todas las órdenes (para administración)
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('customer', 'name email');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las órdenes' });
    }
};

// Actualizar estado de una orden
export const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        const order = await Order.findById(orderId);
        if (!order) return res.status(404).json({ error: 'Orden no encontrada' });

        order.status = status;
        await order.save();
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la orden' });
    }
};

// Eliminar una orden (solo si es necesario)
export const deleteOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        await Order.findByIdAndDelete(orderId);
        res.status(200).json({ message: 'Orden eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la orden' });
    }
};
