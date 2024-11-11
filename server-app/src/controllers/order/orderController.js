// controllers/orderController.js

import Order from '../../models/Order.js';
import Product from '../../models/Product.js';

// Crear una nueva orden
export const createOrder = async (req, res) => {
    const { items, subtotal, shippingCost, discountTotal, total, paymentMethod, shippingAddress } = req.body;
    try {
        // Generar un número de pedido único
        const orderNumber = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();

        // Descontar el stock de cada producto en la orden
        for (let item of items) {
            const product = await Product.findById(item.productId);
            if (!product) {
                return res.status(404).json({ error: `Producto con ID ${item.productId} no encontrado.` });
            }
            if (product.details.stock < item.quantity) {
                return res.status(400).json({ error: `Stock insuficiente para el producto: ${product.name}` });
            }
            product.details.stock -= item.quantity;
            await product.save();
        }

        // Crear la orden
        const order = new Order({
            userId: req.user.id,
            items: items.map(item => ({
                productId: item.productId,
                quantity: item.quantity,
                variation: item.variation,
                priceAtPurchase: item.priceAtPurchase,
                discountAtPurchase: item.discountAtPurchase,
            })),
            subtotal,
            shippingCost,
            discountTotal,
            total,
            paymentMethod,
            shippingAddress,
            orderNumber
        });

        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la orden' });
    }
};

// Obtener todas las órdenes del usuario
export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user.id });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las órdenes' });
    }
};

// Obtener todas las órdenes (para administración)
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('userId', 'name email');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener todas las órdenes' });
    }
};

// Actualizar el estado de una orden (para administración)
export const updateOrderStatus = async (req, res) => {
    const { orderId, status } = req.body;
    try {
        const order = await Order.findById(orderId);
        if (!order) return res.status(404).json({ error: 'Orden no encontrada' });

        order.status = status;
        await order.save();
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el estado de la orden' });
    }
};

// Eliminar una orden (para administración)
export const deleteOrder = async (req, res) => {
    const { orderId } = req.params;
    try {
        const order = await Order.findByIdAndDelete(orderId);
        if (!order) return res.status(404).json({ error: 'Orden no encontrada' });

        res.status(200).json({ message: 'Orden eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la orden' });
    }
};
