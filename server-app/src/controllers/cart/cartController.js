import Cart from '../../models/Cart.js';
import Product from '../../models/Product.js';

// Obtener el carrito del usuario
export const getCart = async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({
                message: 'Usuario no autenticado o ID no válido',
            });
        }

        const cart = await Cart.findOne({ user: userId }).populate('items.product');

        if (!cart) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }

        // Sincronizar precios
        const pricesUpdated = await cart.syncPrices();

        res.json(cart);
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener el carrito',
            error: error.message,
        });
    }
};

// Agregar producto al carrito
export const addToCart = async (req, res) => {
    try {
        const { productId, quantity, variation } = req.body;
        const userId = req.userId;
        if (!userId) return res.status(401).json({ message: 'Usuario no autenticado o ID no válido' });

        if (!Number.isInteger(quantity) || quantity <= 0) return res.status(400).json({ message: 'Cantidad inválida' });

        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: 'Producto no encontrado' });

        // Inicializar variables
        let currentPrice = product.price;
        let sku = product.details.sku || '';
        let imageUrl = product.imageURL || product.details.images[0] || '';
        let stockAvailable = product.details.stock || 0;

        if (variation) {
            // Encontrar la variación seleccionada
            const selectedVariation = product.details.variations.find(v => v.name === variation);
            if (!selectedVariation) {
                return res.status(400).json({ message: `Variación '${variation}' no encontrada para el producto` });
            }
            currentPrice = selectedVariation.price;
            sku = selectedVariation.sku || '';
            imageUrl = selectedVariation.imageURL || imageUrl;
            stockAvailable = selectedVariation.stock || 0;
        }

        // Aplicar descuento si existe
        if (product.details.discount) {
            currentPrice = currentPrice * (1 - product.details.discount / 100);
        }

        // Verificar stock
        if (stockAvailable < quantity) {
            return res.status(400).json({ message: 'No hay suficiente stock disponible' });
        }

        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = new Cart({ user: userId, items: [] });
        }

        const existingItemIndex = cart.items.findIndex(item => item.product.toString() === productId && item.variation === variation);
        if (existingItemIndex > -1) {
            const newQuantity = cart.items[existingItemIndex].quantity + quantity;
            if (stockAvailable < newQuantity) return res.status(400).json({ message: 'No hay suficiente stock disponible para la cantidad solicitada' });

            cart.items[existingItemIndex].quantity = newQuantity;
        } else {
            cart.items.push({
                product: productId,
                quantity,
                variation,
                priceAtAddition: currentPrice,
                name: product.name,
                imageUrl: imageUrl,
                sku: sku
            });
        }

        cart.lastUpdated = new Date();
        await cart.save();
        await cart.populate('items.product');

        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar al carrito', error: error.message });
    }
};

// Actualizar cantidad de un producto en el carrito
export const updateCartItem = async (req, res) => {
    try {
        const { itemId, quantity } = req.body;
        const userId = req.userId;

        if (!Number.isInteger(quantity) || quantity < 0) return res.status(400).json({ message: 'Cantidad inválida' });

        const cart = await Cart.findOne({ user: userId });
        if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });

        const itemIndex = cart.items.findIndex(item => item._id.toString() === itemId);
        if (itemIndex === -1) return res.status(404).json({ message: 'Ítem no encontrado en el carrito' });

        if (quantity === 0) {
            cart.items.splice(itemIndex, 1);
        } else {
            const productId = cart.items[itemIndex].product;
            const product = await Product.findById(productId);
            if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
            if (product.details.stock < quantity) return res.status(400).json({ message: 'No hay suficiente stock disponible' });

            cart.items[itemIndex].quantity = quantity;
        }

        cart.lastUpdated = new Date();
        await cart.save();
        await cart.populate('items.product');

        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar cantidad', error: error.message });
    }
};

// Eliminar un producto del carrito
export const removeFromCart = async (req, res) => {
    try {
        const { itemId } = req.body;
        const userId = req.userId;

        const cart = await Cart.findOne({ user: userId });
        if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });

        const itemIndex = cart.items.findIndex(item => item._id.toString() === itemId);
        if (itemIndex === -1) return res.status(404).json({ message: 'Ítem no encontrado en el carrito' });

        cart.items.splice(itemIndex, 1);

        if (cart.items.length === 0) {
            await Cart.deleteOne({ user: userId });
            return res.json({ message: 'Carrito eliminado completamente' });
        }

        cart.lastUpdated = new Date();
        await cart.save();

        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error al remover ítem del carrito', error: error.message });
    }
};

// Limpiar carrito
export const clearCart = async (req, res) => {
    try {
        const userId = req.userId;
        await Cart.deleteOne({ user: userId });
        res.json({ message: 'Carrito limpiado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al limpiar el carrito', error: error.message });
    }
};

