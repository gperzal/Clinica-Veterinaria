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

    const itemProductIds = this.items.map(item => item.product);
    const products = await Product.find({ _id: { $in: itemProductIds } });

    const productMap = new Map();
    products.forEach(product => {
        productMap.set(product._id.toString(), product);
    });

    this.items = this.items.filter(item => {
        const product = productMap.get(item.product.toString());
        if (!product) {
            hasChanges = true;
            return false; 
        }

        const currentPrice = product.details?.discount
            ? product.price * (1 - product.details.discount / 100)
            : product.price;

        if (currentPrice !== item.priceAtAddition) {
            item.priceAtAddition = currentPrice;
            hasChanges = true;
        }

        item.name = product.name;
        item.imageUrl = product.imageURL || product.details.images[0];
        item.sku = product.details.sku;

        return true; // Mantener el item en el carrito
    });

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