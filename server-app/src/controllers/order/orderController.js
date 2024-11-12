// src/controllers/order/orderController.js
import Order from '../../models/Order.js';
import Cart from '../../models/Cart.js';
import User from '../../models/User.js';

// Crear una nueva orden desde el carrito
export const createOrder = async (req, res) => {
    try {
        const userId = req.userId;
        const { shippingMethod, shippingCost, paymentMethod } = req.body;

        // Obtener el carrito actual
        const cart = await Cart.findOne({ user: userId }).populate('items.product');
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Carrito vacío' });
        }

        // Obtener información del usuario
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Crear la orden
        const order = new Order({
            user: userId,
            items: cart.items.map(item => ({
                product: item.product._id,
                name: item.product.name,
                quantity: item.quantity,
                priceAtPurchase: item.priceAtAddition,
                variation: item.variation,
                sku: item.product.details.sku,
                imageUrl: item.product.imageURL || item.product.details.images[0]
            })),
            shipping: {
                method: shippingMethod,
                cost: shippingCost,
                address: user.address
            },
            customer: {
                name: user.name,
                email: user.email,
                phone: user.phone,
            },
            payment: {
                method: paymentMethod,
                status: 'Pendiente'
            }
        });

        // Calcular totales
        order.calculateTotals();

        // Guardar la orden
        await order.save();

        // Limpiar el carrito
        await Cart.findOneAndUpdate(
            { user: userId },
            { $set: { items: [] } }
        );

        // Agregar evento inicial al tracking
        await order.addTrackingEvent('Pendiente', 'Orden creada');

        res.status(201).json(order);
    } catch (error) {
        console.error('Error al crear orden:', error);
        res.status(500).json({
            message: 'Error al crear la orden',
            error: error.message
        });
    }
};

// Obtener todas las órdenes del usuario
export const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.userId })
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener órdenes',
            error: error.message
        });
    }
}
// Obtener una orden específica
export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findOne({
            _id: req.params.orderId,
            user: req.userId
        });

        if (!order) {
            return res.status(404).json({ message: 'Orden no encontrada' });
        }

        res.json(order);
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener la orden',
            error: error.message
        });
    }
}

// Cancelar una orden
export const cancelOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { reason } = req.body;

        const order = await Order.findOne({
            _id: orderId,
            user: req.userId,
            status: 'Pendiente' // Solo se pueden cancelar órdenes pendientes
        });

        if (!order) {
            return res.status(404).json({
                message: 'Orden no encontrada o no puede ser cancelada'
            });
        }

        order.status = 'Cancelado';
        order.cancelReason = reason;
        await order.addTrackingEvent('Cancelado', reason);

        res.json(order);
    } catch (error) {
        res.status(500).json({
            message: 'Error al cancelar la orden',
            error: error.message
        });
    }
}

// Actualizar estado de la orden (solo para administradores)
export const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status, comment } = req.body;

        // Verificar si el usuario es administrador
        if (req.userRole !== 'Administrador') {
            return res.status(403).json({
                message: 'No autorizado para actualizar estados de orden'
            });
        }

        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Orden no encontrada' });
        }

        await order.addTrackingEvent(status, comment);
        res.json(order);
    } catch (error) {
        res.status(500).json({
            message: 'Error al actualizar estado de la orden',
            error: error.message
        });
    }
}

// Obtener todas las órdenes (solo para administradores)
export const getAllOrders = async (req, res) => {
    try {
        if (req.userRole !== 'Administrador') {
            return res.status(403).json({
                message: 'No autorizado para ver todas las órdenes'
            });
        }

        const { status, page = 1, limit = 10 } = req.query;
        const query = status ? { status } : {};

        const orders = await Order.find(query)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .populate('user', 'name email');

        const total = await Order.countDocuments(query);

        res.json({
            orders,
            total,
            pages: Math.ceil(total / limit),
            currentPage: page
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener órdenes',
            error: error.message
        });
    }
}

// Eliminar una orden (solo administradores)
export const deleteOrder = async (req, res) => {
    async (req, res) => {
        try {
            const { orderId } = req.params;

            // Verificar si el usuario es administrador
            if (req.userRole !== 'Administrador') {
                return res.status(403).json({
                    message: 'No autorizado para eliminar órdenes',
                    error: 'Acceso denegado'
                });
            }

            // Buscar la orden
            const order = await Order.findById(orderId);

            // Verificar si la orden existe
            if (!order) {
                return res.status(404).json({
                    message: 'Orden no encontrada',
                    error: 'La orden no existe en el sistema'
                });
            }

            // Validar si la orden puede ser eliminada (por ejemplo, si ya está entregada)
            if (order.status === 'Entregado') {
                return res.status(400).json({
                    message: 'No se puede eliminar una orden entregada',
                    error: 'Operación no permitida'
                });
            }

            // Registrar la actividad antes de eliminar (opcional, si tienes un sistema de logs)
            console.log(`Orden ${orderId} eliminada por admin ${req.userId} en ${new Date()}`);

            // Eliminar la orden
            await Order.findByIdAndDelete(orderId);

            res.json({
                message: 'Orden eliminada exitosamente',
                deletedOrder: {
                    orderNumber: order.orderNumber,
                    customer: order.customer.name,
                    date: order.createdAt
                }
            });

        } catch (error) {
            console.error('Error al eliminar orden:', error);
            res.status(500).json({
                message: 'Error al eliminar la orden',
                error: error.message
            });
        }
    }
}