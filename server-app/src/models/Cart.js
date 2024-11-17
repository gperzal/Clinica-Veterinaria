// models/Cart.js
import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 1 },
    variation: { type: String, default: '' },
    priceAtAddition: { type: Number, required: true },
    name: { type: String, required: true },
    imageUrl: { type: String },
    sku: { type: String }
});

const cartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    items: [cartItemSchema],
    lastUpdated: { type: Date, default: Date.now },
    expiresAt: { type: Date }
}, { timestamps: true });

// Índice TTL
cartSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Middleware para actualizar expiresAt cada vez que el carrito se modifica
cartSchema.pre('save', function (next) {
    this.expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    next();
});

// Metodo para actualizar los precios de los productos en el carrito
cartSchema.methods.syncPrices = async function () {
    let pricesUpdated = false;

    for (const item of this.items) {
        const product = await mongoose.model('Product').findById(item.product);
        if (product) {
            const currentPrice = product.price;
            if (item.priceAtAddition !== currentPrice) {
                item.priceAtAddition = currentPrice;
                pricesUpdated = true;
            }
        }
    }

    if (pricesUpdated) {
        await this.save();
    }

    return pricesUpdated;
};


const Cart = mongoose.model('Cart', cartSchema);

export default Cart;