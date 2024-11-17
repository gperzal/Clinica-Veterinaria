// models/Product.js
import mongoose from 'mongoose';

const variationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    sku: { type: String },
    price: { type: Number }, 
    discount: { type: Number, default: 0 }, 
    stock: { type: Number, default: 0 }, 
    imageURL: { type: String }, 
});

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true }, 
    rating: { type: Number, default: 5 },
    numReviews: { type: Number, default: 0 },
    imageURL: { type: String },
    description: { type: String },
    status: { type: Boolean, default: true },
    details: {
        sku: { type: String },
        discount: { type: Number, default: 0 }, 
        descriptionFull: { type: String },
        specificationsArray: [{ key: String, value: String }],
        variations: [variationSchema], 
        stock: { type: Number, default: 0 }, 
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    purchaseDate: { type: Date, default: Date.now }
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

export default Product;
