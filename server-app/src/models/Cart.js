// models/Cart.js
import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, default: 1 },
    variation: { type: String },  // En caso de que el producto tenga variaciones (color, tamaño, etc.)
    price: { type: Number, required: true },
    originalPrice: { type: Number }, // Precio original antes de descuentos
    discount: { type: Number, default: 0 }, // Descuento aplicado al producto
});

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    items: [cartItemSchema], // Array de items que contiene los productos en el carrito
}, {
    timestamps: true,
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
