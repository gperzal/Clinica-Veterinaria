// controllers/cartController.js

import Cart from '../../models/Cart.js'
import Product from '../../models/Product.js';

// Obtener el carrito del usuario
export const getCart = async (req, res) => {
    try {
        const userId = req.userId;
        console.log('Getting cart for user:', userId); // Debug log

        if (!userId) {
            return res.status(401).json({
                message: 'Usuario no autenticado o ID no válido'
            });
        }

        // Primero intentar encontrar el carrito existente
        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            // Crear nuevo carrito con el userId
            cart = new Cart({
                user: userId,  // Asegurarse de que esto se establece correctamente
                items: [],
                expiresAt: new Date(+new Date() + 3 * 24 * 60 * 60 * 1000)
            });
            await cart.save();
        }

        await cart.populate('items.product');
        res.json(cart);
    } catch (error) {
        console.error('Error detallado en getCart:', error);
        res.status(500).json({
            message: 'Error al obtener el carrito',
            error: error.message
        });
    }
};

// El método addToCart también necesita ser ajustado
export const addToCart = async (req, res) => {
    try {
        const { productId, quantity, variation } = req.body;
        const userId = req.userId;

        console.log('Adding to cart - User ID:', userId); // Debug log

        if (!userId) {
            return res.status(401).json({
                message: 'Usuario no autenticado o ID no válido'
            });
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

        // Buscar o crear el carrito usando findOneAndUpdate con upsert
        let cart = await Cart.findOneAndUpdate(
            { user: userId },
            {
                $setOnInsert: {
                    user: userId,
                    items: [],
                    expiresAt: new Date(+new Date() + 3 * 24 * 60 * 60 * 1000)
                }
            },
            {
                new: true,
                upsert: true
            }
        );

        // Calcular precio actual
        const currentPrice = product.details?.discount
            ? product.price * (1 - product.details.discount / 100)
            : product.price;

        // Buscar si el producto ya existe en el carrito
        const existingItemIndex = cart.items.findIndex(item =>
            item.product.toString() === productId && item.variation === variation
        );

        if (existingItemIndex > -1) {
            cart.items[existingItemIndex].quantity += quantity;
            cart.items[existingItemIndex].priceAtAddition = currentPrice;
        } else {
            cart.items.push({
                product: productId,
                quantity,
                variation,
                priceAtAddition: currentPrice,
                name: product.name,
                imageUrl: product.imageURL || product.details.images[0],
                sku: product.details.sku
            });
        }

        cart.lastUpdated = new Date();
        await cart.save();
        await cart.populate('items.product');

        res.json(cart);
    } catch (error) {
        console.error('Error detallado en addToCart:', error);
        res.status(500).json({
            message: 'Error al agregar al carrito',
            error: error.message
        });
    }
};

// Actualizar cantidad de un producto en el carrito
export const updateCartItem = async (req, res) => {
    try {
        const { productId, quantity, variation } = req.body;
        const userId = req.userId;

        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }

        const itemIndex = cart.items.findIndex(item =>
            item.product.toString() === productId && item.variation === variation
        );

        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Item no encontrado en el carrito' });
        }

        // Validar stock
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        if (product.details.stock < quantity) {
            return res.status(400).json({ message: 'No hay suficiente stock disponible' });
        }

        cart.items[itemIndex].quantity = quantity;
        cart.lastUpdated = new Date();
        await cart.save();

        res.json(cart);
    } catch (error) {
        res.status(500).json({
            message: 'Error al actualizar cantidad',
            error: error.message
        });
    }
};

// Eliminar un producto del carrito
export const removeFromCart = async (req, res) => {
    try {
        const { itemId, variation } = req.body; // Cambiado de productId a itemId
        const userId = req.userId;

        console.log('Removing item:', { itemId, variation, userId });

        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }

        console.log('Cart before removal:', cart.items);

        // Encontrar el índice del item usando el _id del item
        const itemIndex = cart.items.findIndex(item =>
            item._id.toString() === itemId && item.variation === variation
        );

        console.log('Item index:', itemIndex);

        if (itemIndex === -1) {
            return res.status(404).json({
                message: 'Item no encontrado en el carrito',
                searchedFor: { itemId, variation }
            });
        }

        cart.items.splice(itemIndex, 1);
        cart.lastUpdated = new Date();
        const updatedCart = await cart.save();

        res.json(updatedCart);
    } catch (error) {
        console.error('Error removing item:', error);
        res.status(500).json({
            message: 'Error al remover item del carrito',
            error: error.message
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
