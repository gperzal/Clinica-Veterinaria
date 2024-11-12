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
  variation: { type: String, default: '' },
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
  trackingHistory: [{
    status: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    comment: String
  }],
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
orderSchema.methods.addTrackingEvent = async function(status, comment = '') {
  this.trackingHistory.push({ status, comment, timestamp: new Date() });
  this.status = status;
  return this.save();
};

// Método para calcular totales
orderSchema.methods.calculateTotals = function() {
  this.subtotal = this.items.reduce((total, item) => total + (item.priceAtPurchase * item.quantity), 0);
  this.total = this.subtotal + this.shipping.cost - this.discount;
};

// Middleware pre-save para asegurar totales correctos y actualizar stock
orderSchema.pre('save', async function(next) {
  if (this.isModified('items') || this.isModified('shipping.cost') || this.isModified('discount')) {
    this.calculateTotals();
  }

  // Disminuir stock de los productos
  for (const item of this.items) {
    const product = await mongoose.model('Product').findById(item.product);
    if (product) {
      // Actualizar stock considerando variaciones
      if (product.details.variations && product.details.variations.length > 0) {
        const variationIndex = product.details.variations.findIndex(v => v.name === item.variation);
        if (variationIndex !== -1) {
          product.details.variations[variationIndex].stock -= item.quantity;
          if (product.details.variations[variationIndex].stock < 0) {
            throw new Error(`Stock insuficiente para la variación ${item.variation} del producto ${product.name}`);
          }
        } else {
          throw new Error(`Variación ${item.variation} no encontrada para el producto ${product.name}`);
        }
      } else {
        product.details.stock -= item.quantity;
        if (product.details.stock < 0) {
          throw new Error(`Stock insuficiente para el producto ${product.name}`);
        }
      }
      await product.save();
    }
  }

  next();
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
