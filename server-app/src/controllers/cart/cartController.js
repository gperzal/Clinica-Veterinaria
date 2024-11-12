// controllers/cartController.js

import Cart from '../../models/Cart.js'
import Product from '../../models/Product.js';

// Obtener el carrito del usuario
// controllers/cartController.js

export const getCart = async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({
                message: 'Usuario no autenticado o ID no válido',
            });
        }

        // Intentar encontrar el carrito existente
        const cart = await Cart.findOne({ user: userId }).populate('items.product');

        if (!cart) {
            // No crear un nuevo carrito aquí
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }

        res.json(cart);
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener el carrito',
            error: error.message,
        });
    }
};


// El método addToCart también necesita ser ajustado
export const addToCart = async (req, res) => {
    try {
        const { productId, quantity, variation } = req.body;
        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({
                message: 'Usuario no autenticado o ID no válido',
            });
        }

        // Validar cantidad
        if (!Number.isInteger(quantity) || quantity <= 0) {
            return res.status(400).json({ message: 'Cantidad inválida' });
        }

        // Validar producto
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        // Validar stock
        if (product.details.stock < quantity) {
            return res.status(400).json({ message: 'No hay suficiente stock disponible' });
        }

        // Buscar el carrito existente o crear uno nuevo
        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            // Crear nuevo carrito
            cart = new Cart({
                user: userId,
                items: [],
                expiresAt: new Date(Date.now() + CART_EXPIRATION_DAYS * 24 * 60 * 60 * 1000),
            });
        }

        // Calcular precio actual
        const currentPrice = product.details?.discount
            ? product.price * (1 - product.details.discount / 100)
            : product.price;

        // Buscar si el producto ya existe en el carrito
        const existingItemIndex = cart.items.findIndex(
            (item) => item.product.toString() === productId && item.variation === variation
        );

        if (existingItemIndex > -1) {
            const newQuantity = cart.items[existingItemIndex].quantity + quantity;

            if (product.details.stock < newQuantity) {
                return res.status(400).json({ message: 'No hay suficiente stock disponible para la cantidad solicitada' });
            }

            cart.items[existingItemIndex].quantity = newQuantity;
            cart.items[existingItemIndex].priceAtAddition = currentPrice;
        } else {
            cart.items.push({
                product: productId,
                quantity,
                variation,
                priceAtAddition: currentPrice,
                name: product.name,
                imageUrl: product.imageURL || product.details.images[0],
                sku: product.details.sku,
            });
        }

        cart.lastUpdated = new Date();
        await cart.save();
        await cart.populate('items.product');

        res.json(cart);
    } catch (error) {
        res.status(500).json({
            message: 'Error al agregar al carrito',
            error: error.message,
        });
    }
};



// Actualizar cantidad de un producto en el carrito
export const updateCartItem = async (req, res) => {
    try {
        const { itemId, quantity } = req.body;
        const userId = req.userId;

        if (!Number.isInteger(quantity) || quantity < 0) {
            return res.status(400).json({ message: 'Cantidad inválida' });
        }

        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }

        const itemIndex = cart.items.findIndex((item) => item._id.toString() === itemId);

        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Ítem no encontrado en el carrito' });
        }

        if (quantity === 0) {
            cart.items.splice(itemIndex, 1);
        } else {
            const productId = cart.items[itemIndex].product;
            const product = await Product.findById(productId);

            if (!product) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }

            if (product.details.stock < quantity) {
                return res.status(400).json({ message: 'No hay suficiente stock disponible' });
            }

            cart.items[itemIndex].quantity = quantity;
        }

        cart.lastUpdated = new Date();
        await cart.save();
        await cart.populate('items.product');

        res.json(cart);
    } catch (error) {
        res.status(500).json({
            message: 'Error al actualizar cantidad',
            error: error.message,
        });
    }
};



// Eliminar un producto del carrito
export const removeFromCart = async (req, res) => {
    try {
        const { itemId } = req.body;
        const userId = req.userId;
        
        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }
        // Encontrar el índice del ítem usando el _id del ítem
        const itemIndex = cart.items.findIndex((item) => item._id.toString() === itemId);

        if (itemIndex === -1) {
            return res.status(404).json({
                message: 'Ítem no encontrado en el carrito',
                searchedFor: { itemId },
            });
        }

        cart.items.splice(itemIndex, 1);
        cart.lastUpdated = new Date();
        const updatedCart = await cart.save();

        res.json(updatedCart);
    } catch (error) {
        res.status(500).json({
            message: 'Error al remover ítem del carrito',
            error: error.message,
        });
    }
};


// Limpiar carrito
export const clearCart = async (req, res) => {
    try {
        const userId = req.userId;
        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }

        cart.items = [];
        cart.lastUpdated = new Date();
        await cart.save();

        res.json({ message: 'Carrito limpiado exitosamente' });
    } catch (error) {
        res.status(500).json({
            message: 'Error al limpiar el carrito',
            error: error.message
        });
    }
};


// Sincronizar precios del carrito
export const syncPrices = async (req, res) => {
    try {
        const userId = req.userId;
        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }

        const hasChanges = await cart.syncPrices();

        res.json({
            cart,
            updated: hasChanges,
            message: hasChanges ? 'Precios actualizados' : 'Precios ya están actualizados'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al sincronizar precios',
            error: error.message
        });
    }
};

// Verificar actualizaciones necesarias
export const checkUpdates = async (req, res) => {
    try {
        const userId = req.userId;
        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }

        const needsUpdate = await cart.syncPrices();

        res.json({
            needsUpdate,
            expiresAt: cart.expiresAt
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al verificar actualizaciones',
            error: error.message
        });
    }
}
