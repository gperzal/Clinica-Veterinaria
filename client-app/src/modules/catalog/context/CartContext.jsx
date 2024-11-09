// client-app/src/modules/catalog/context/CartContext.jsx

import React, { createContext, useState, useContext, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const toast = useToast();
  const [cartItems, setCartItems] = useState(() => {
    // Recuperar carrito del localStorage si existe
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    return Array.isArray(savedCart) ? savedCart : [];
  });
  
  // Actualizar localStorage cuando el carrito cambie
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Función para agregar al carrito
  const addToCart = (product, quantity = 1, variation = '') => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(
        item => item._id === product._id && item.variation === variation
      );

      if (existingItem) {
        return prevItems.map(item =>
          item._id === product._id && item.variation === variation
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      const newItem = {
        _id: product._id,
        name: product.name,
        price: product.details?.discount 
          ? product.price * (1 - product.details.discount / 100)
          : product.price,
        quantity,
        variation,
        imageUrl: product.imageURL || product.details.images[0],
        sku: product.details.sku,
        originalPrice: product.price,
        discount: product.details?.discount || 0
      };

      toast({
        title: 'Producto agregado',
        description: `${product.name} ha sido agregado al carrito`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      return [...prevItems, newItem];
    });
  };

  const removeFromCart = (productId, variation = '') => {
    setCartItems(prevItems => 
      prevItems.filter(item => !(item._id === productId && item.variation === variation))
    );
    toast({
      title: 'Producto eliminado',
      description: 'El producto ha sido eliminado del carrito',
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  };

  const updateQuantity = (productId, quantity, variation = '') => {
    if (quantity <= 0) {
      removeFromCart(productId, variation);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item._id === productId && item.variation === variation
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
    toast({
      title: 'Carrito vaciado',
      description: 'Se han eliminado todos los productos del carrito',
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};
