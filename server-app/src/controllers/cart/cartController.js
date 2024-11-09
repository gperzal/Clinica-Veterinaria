// controllers/cart/cartController.js
import Cart from '../../models/Cart.js';
import Product from '../../models/Product.js';

// Obtener el carrito del usuario
export const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id }).populate('items.productId');
        res.status(200).json(cart || { userId: req.user.id, items: [] });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el carrito' });
    }
};

// Agregar un producto al carrito
export const addToCart = async (req, res) => {
    const { productId, quantity = 1, variation } = req.body;
    try {
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ error: 'Producto no encontrado' });

        let cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) {
            cart = new Cart({ userId: req.user.id, items: [] });
        }

        const existingItemIndex = cart.items.findIndex(
            item => item.productId.toString() === productId && item.variation === variation
        );

        if (existingItemIndex > -1) {
            cart.items[existingItemIndex].quantity += quantity;
        } else {
            const newItem = {
                productId,
                quantity,
                variation,
                price: product.price * (1 - (product.details.discount || 0) / 100),
                originalPrice: product.price,
                discount: product.details.discount || 0,
            };
            cart.items.push(newItem);
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar producto al carrito' });
    }
};

// Actualizar cantidad de un producto en el carrito
export const updateCartItem = async (req, res) => {
    const { productId, quantity, variation } = req.body;
    try {
        const cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });

        const itemIndex = cart.items.findIndex(
            item => item.productId.toString() === productId && item.variation === variation
        );

        if (itemIndex > -1) {
            if (quantity > 0) {
                cart.items[itemIndex].quantity = quantity;
            } else {
                // Si la cantidad es 0 o menos, eliminar el producto del carrito
                cart.items.splice(itemIndex, 1);
            }
        } else {
            return res.status(404).json({ error: 'Producto no encontrado en el carrito' });
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar producto en el carrito' });
    }
};

// Eliminar un producto del carrito
export const removeFromCart = async (req, res) => {
    const { productId, variation } = req.body;
    try {
        const cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });

        cart.items = cart.items.filter(
            item => !(item.productId.toString() === productId && item.variation === variation)
        );

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar producto del carrito' });
    }
};

// Limpiar carrito
export const clearCart = async (req, res) => {
    try {
        const cart = await Cart.findOneAndUpdate(
            { userId: req.user.id },
            { items: [] },
            { new: true }
        );
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: 'Error al limpiar el carrito' });
    }
};
