// client-app/src/modules/catalog/context/CartContext.jsx

import React, { createContext, useState, useContext, useEffect } from 'react';
import useToastNotification from '../../../hooks/useToastNotification';
import { cartService } from '../services/cartService';
import { AuthContext } from '../../auth/context/AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const showToast = useToastNotification();
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Función para obtener el carrito desde el servidor
  const fetchCart = async () => {
    if (!user) {
      setCartItems([]);
      setLoading(false);
      return;
    }
    try {
      const cart = await cartService.getCart();
      setCartItems(cart?.items || []);
    } catch (error) {
      if (error.response?.status === 404) {
        setCartItems([]);
      } else {
        showToast({
          title: 'Error al cargar el carrito',
          description: error.response?.data?.message || error.message,
          status: 'error',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  const addToCart = async (product, quantity = 1, variation = '') => {
    if (!user) {
      showToast({
        title: 'Debes iniciar sesión',
        description: 'Por favor, inicia sesión para agregar productos al carrito',
        status: 'warning',
      });
      return;
    }
    try {
      const updatedCart = await cartService.addProductToCart(
        product._id,
        quantity,
        variation
      );
      setCartItems(updatedCart.items);
      showToast({
        title: 'Producto agregado',
        description: `${product.name} ha sido agregado al carrito`,
        status: 'success',
      });
    } catch (error) {
      showToast({
        title: 'Error al agregar al carrito',
        description:
          error.response?.data?.message || 'Error al conectar con el servidor',
        status: 'error',
      });
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      const updatedCart = await cartService.removeProductFromCart(itemId);
      setCartItems(updatedCart.items || []);
      showToast({
        title: 'Producto eliminado',
        description: 'El producto ha sido eliminado del carrito',
        status: 'info',
      });
    } catch (error) {
      showToast({
        title: 'Error al eliminar del carrito',
        description:
          error.response?.data?.message || 'Error al conectar con el servidor',
        status: 'error',
      });
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    try {
      if (quantity <= 0) {
        await removeFromCart(itemId);
        return;
      }

      const updatedCart = await cartService.updateProductQuantity(itemId, quantity);
      setCartItems(updatedCart.items);
    } catch (error) {
      console.error('Error al actualizar cantidad:', error);
      showToast({
        title: 'Error al actualizar cantidad',
        description:
          error.response?.data?.message || 'Error al conectar con el servidor',
        status: 'error',
      });
    }
  };

  const clearCart = async () => {
    try {
      await cartService.clearCartAPI();
      setCartItems([]);
      showToast({
        title: 'Carrito vaciado',
        description: 'Se han eliminado todos los productos del carrito',
        status: 'info',
      });
    } catch (error) {
      showToast({
        title: 'Error al vaciar el carrito',
        description:
          error.response?.data?.message || 'Error al conectar con el servidor',
        status: 'error',
      });
    }
  };

  const getCartTotal = () => {
    return Array.isArray(cartItems)
      ? cartItems.reduce((total, item) => total + item.priceAtAddition * item.quantity, 0)
      : 0;
  };

  const getCartCount = () => {
    return Array.isArray(cartItems)
      ? cartItems.reduce((total, item) => total + item.quantity, 0)
      : 0;
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};
