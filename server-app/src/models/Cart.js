// models/Cart.js
import mongoose from 'mongoose';

const CART_EXPIRATION_DAYS = 3;

const cartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    variation: {
        type: String,
        default: ''
    },
    priceAtAddition: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    },
    sku: {
        type: String
    }
});

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    items: [cartItemSchema],
    lastUpdated: {
        type: Date,
        default: Date.now
    },
    expiresAt: {
        type: Date,
        required: true,
        default: () => new Date(+new Date() + CART_EXPIRATION_DAYS * 24 * 60 * 60 * 1000)
    }
}, {
    timestamps: true
});

// Middleware para actualizar la fecha de expiración
cartSchema.pre('save', function (next) {
    if (this.isModified('items') || this.isModified('lastUpdated')) {
        this.expiresAt = new Date(+new Date() + CART_EXPIRATION_DAYS * 24 * 60 * 60 * 1000);
    }
    next();
});

// Método para sincronizar precios
cartSchema.methods.syncPrices = async function () {
    const Product = mongoose.model('Product');
    let hasChanges = false;

    for (let item of this.items) {
        const currentProduct = await Product.findById(item.product);
        if (!currentProduct) {
            this.items = this.items.filter(i => i.product.toString() !== item.product.toString());
            hasChanges = true;
            continue;
        }

        const currentPrice = currentProduct.details?.discount
            ? currentProduct.price * (1 - currentProduct.details.discount / 100)
            : currentProduct.price;

        if (currentPrice !== item.priceAtAddition) {
            item.priceAtAddition = currentPrice;
            hasChanges = true;
        }

        item.name = currentProduct.name;
        item.imageUrl = currentProduct.imageURL || currentProduct.details.images[0];
        item.sku = currentProduct.details.sku;
    }

    if (hasChanges) {
        this.lastUpdated = new Date();
        await this.save();
    }

    return hasChanges;
};

// Índices
cartSchema.index({ user: 1 }, { unique: true });
cartSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;