// models/Product.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    imageURL: { type: String },
    description: { type: String },
    details: {
        sku: { type: String },
        discount: { type: Number, default: 0 },
        originalPrice: { type: Number },
        inStock: { type: Boolean, default: true },
        images: [{ type: String }],
        descriptionFull: { type: String },
        specificationsArray: [{ key: String, value: String }],
        variations: [{ type: String }]
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    purchaseDate: { type: Date, default: Date.now }
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

export default Product;
