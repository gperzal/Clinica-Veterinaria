// models/Order.js

import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    variation: { type: String, default: '' },
    priceAtPurchase: { type: Number, required: true }, // Precio al momento de la compra
    discountAtPurchase: { type: Number, default: 0 }
}, { _id: false });

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [orderItemSchema],
    subtotal: { type: Number, required: true },
    shippingCost: { type: Number, required: true },
    discountTotal: { type: Number, default: 0 },
    total: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    shippingAddress: { type: String, required: true },
    status: { type: String, default: 'pending', enum: ['pending', 'processed', 'shipped', 'delivered'] },
    orderDate: { type: Date, default: Date.now },
    orderNumber: { type: String, unique: true, required: true },
}, {
    timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
