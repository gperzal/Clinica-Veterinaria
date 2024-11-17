// src/controllers/order/orderController.js
import mongoose from 'mongoose';
import Order from '../../models/Order.js';
import Cart from '../../models/Cart.js';
import User from '../../models/User.js';
import Product from '../../models/Product.js';


// Obtener todas las órdenes del usuario
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.userId;

    const orders = await Order.find({ user: userId })
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error('Error al obtener órdenes del usuario:', error);
    res.status(500).json({
      message: 'Error al obtener órdenes',
      error: error.message
    });
  }
};

// Obtener una orden específica del usuario
export const getOrderById = async (req, res) => {
  try {
    const userId = req.userId;
    const { orderId } = req.params;

    const order = await Order.findOne({
      _id: orderId,
      user: userId
    });

    if (!order) {
      return res.status(404).json({ message: 'Orden no encontrada' });
    }

    res.json(order);
  } catch (error) {
    console.error('Error al obtener la orden:', error);
    res.status(500).json({
      message: 'Error al obtener la orden',
      error: error.message
    });
  }
};


// Crear una nueva orden desde el carrito
export const createOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const { shippingMethod, shippingCost, paymentMethod } = req.body;

    // Obtener el usuario
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    // Obtener el carrito actual
    const cart = await Cart.findOne({ user: userId }).populate('items.product');
    if (!cart || cart.items.length === 0) {
      throw new Error('El carrito está vacío o no existe');
    }

    // Validar stock
    for (const item of cart.items) {
      const product = await Product.findById(item.product._id);
      if (!product || product.details.stock < item.quantity) {
        throw new Error(`Stock insuficiente para el producto ${item.product.name}`);
      }
      product.details.stock -= item.quantity;
      await product.save();
    }

    // Crear la orden
    const order = new Order({
      user: userId,
      items: cart.items.map(item => ({
        product: item.product._id,
        name: item.product.name,
        quantity: item.quantity,
        priceAtPurchase: item.priceAtAddition,
        sku: item.product.details.sku || '',
        imageUrl: item.product.imageURL || item.product.details.images[0] || '',
        variation: item.variation || ''
      })),
      shipping: {
        method: shippingMethod,
        cost: shippingCost,
        address: user.address || 'Dirección no proporcionada'
      },
      customer: {
        name: user.name,
        email: user.email,
        phone: user.phone || 'Teléfono no proporcionado',
      },
      payment: {
        method: paymentMethod,
        status: 'Pendiente'
      },
      status: 'Pendiente',
      trackingHistory: {
        status: 'Pendiente',
        timestamp: new Date(),
        comment: 'Orden creada'
      }
    });

    // Calcular totales y guardar
    order.calculateTotals();
    await order.save();

    // Limpiar carrito
    await Cart.deleteOne({ user: userId });

    res.status(201).json(order);
  } catch (error) {
    console.error('Error al crear orden:', error);
    res.status(500).json({ message: 'Error al crear la orden', error: error.message });
  }
};




// Cancelar una orden
export const cancelOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { orderId } = req.params;
    const { reason } = req.body;
    const userId = req.userId;

    const order = await Order.findOne({
      _id: orderId,
      user: userId,
      status: { $in: ['Pendiente', 'Preparación'] }
    }).session(session);

    if (!order) {
      throw new Error('Orden no encontrada o no puede ser cancelada');
    }

    // Revertir stock
    for (const item of order.items) {
      const product = await Product.findById(item.product).session(session);

      if (!product) {
        throw new Error(`Producto no encontrado: ${item.product}`);
      }

      // Revertir stock considerando variaciones
      if (product.details.variations && product.details.variations.length > 0 && item.variation) {
        await Product.updateOne(
          { _id: product._id, 'details.variations.name': item.variation },
          { $inc: { 'details.variations.$[elem].stock': item.quantity } },
          { arrayFilters: [{ 'elem.name': item.variation }], session }
        );
      } else {
        // Producto sin variaciones
        product.details.stock += item.quantity;
        await product.save({ session });
      }
    }

    // Actualizar estado de la orden
    order.status = 'Cancelado';
    order.cancelReason = reason || 'Cancelado por el usuario';
    await order.addTrackingEvent('Cancelado', order.cancelReason);
    await order.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.json(order);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error('Error al cancelar orden:', error);
    res.status(500).json({
      message: 'Error al cancelar la orden',
      error: error.message
    });
  }
};

// Actualizar estado de la orden (solo para administradores)
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status, comment } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Orden no encontrada' });
    }

    // Validar cambio de estado
    const validStatuses = ['Pendiente', 'Preparación', 'En Camino', 'Entregado', 'Cancelado'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Estado no válido' });
    }

    await order.addTrackingEvent(status, comment || `Estado actualizado a ${status}`);
    res.json(order);
  } catch (error) {
    console.error('Error al actualizar estado de la orden:', error);
    res.status(500).json({
      message: 'Error al actualizar estado de la orden',
      error: error.message
    });
  }
};

// Eliminar una orden (solo para administradores)
export const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    // Buscar la orden
    const order = await Order.findById(orderId);

    // Verificar si la orden existe
    if (!order) {
      return res.status(404).json({
        message: 'Orden no encontrada'
      });
    }

    // Validar si la orden puede ser eliminada (por ejemplo, si ya está entregada)
    if (order.status === 'Entregado') {
      return res.status(400).json({
        message: 'No se puede eliminar una orden que ya ha sido entregada'
      });
    }

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
};

// Obtener todas las órdenes (solo para administradores)
export const getAllOrders = async (req, res) => {
  try {

    const { status, page = 1, limit = 10 } = req.query;
    const query = status ? { status } : {};

    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .populate('user', 'name email');

    const total = await Order.countDocuments(query);

    res.json({
      orders,
      total,
      pages: Math.ceil(total / limit),
      currentPage: parseInt(page)
    });
  } catch (error) {
    console.error('Error al obtener todas las órdenes:', error);
    res.status(500).json({
      message: 'Error al obtener órdenes',
      error: error.message
    });
  }
};