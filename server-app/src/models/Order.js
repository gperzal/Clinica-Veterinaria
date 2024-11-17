// models/Order.js
import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  name: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  priceAtPurchase: { type: Number, required: true },
  sku: { type: String, required: true },
  imageUrl: String
});

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
    unique: true,
    default: () => 'PED-' + Math.random().toString(36).substr(2, 9).toUpperCase()
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  customer: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true }
  },
  items: [orderItemSchema],
  shipping: {
    method: { type: String, required: true },
    cost: { type: Number, required: true },
    address: { type: String, required: true },
    estimatedDelivery: Date
  },
  payment: {
    method: { type: String, required: true },
    transactionId: String,
    lastFourDigits: String,
    status: {
      type: String,
      enum: ['Pendiente', 'Procesando', 'Completado', 'Fallido', 'Reembolsado'],
      default: 'Pendiente'
    }
  },
  status: {
    type: String,
    enum: ['Pendiente', 'Preparación', 'En Camino', 'Entregado', 'Cancelado'],
    default: 'Pendiente'
  },
  trackingHistory: {
    status: {
      type: String,
      enum: ['Pendiente', 'Preparación', 'En Camino'],
      required: true,
      default: 'Pendiente'
    },
    timestamp: { type: Date, default: Date.now },
    comment: { type: String, default: 'Orden creada' }
  },
  subtotal: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  total: { type: Number, required: true },
  issuedInvoice: { type: Boolean, default: false },
  cancelReason: String,
  notes: String
}, {
  timestamps: true
});

// Índices para búsquedas eficientes
orderSchema.index({ orderNumber: 1 });
orderSchema.index({ user: 1, createdAt: -1 });
orderSchema.index({ status: 1 });
orderSchema.index({ 'payment.status': 1 });
orderSchema.index({ createdAt: -1 });

// Método para agregar evento al historial
orderSchema.methods.addTrackingEvent = function (status, comment) {
  if (!['Pendiente', 'Preparación', 'En Camino'].includes(status)) {
    throw new Error(`Estado inválido para trackingHistory: ${status}`);
  }
  this.status = status;
  this.trackingHistory.push({
    status,
    timestamp: new Date(),
    comment,
  });
};

// Método para calcular totales
orderSchema.methods.calculateTotals = function () {
  this.subtotal = this.items.reduce((total, item) => total + (item.priceAtPurchase * item.quantity), 0);
  this.total = this.subtotal + this.shipping.cost - this.discount;
};



const Order = mongoose.model('Order', orderSchema);

export default Order;
