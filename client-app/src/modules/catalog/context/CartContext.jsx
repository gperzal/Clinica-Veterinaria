// client-app/src/modules/catalog/context/CartContext.jsx

import React, { createContext, useState, useContext, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import {cartService} from '../../catalog/services/cartService';


export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const toast = useToast();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Actualizar localStorage cuando el carrito cambie
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('userData')) || 
                        JSON.parse(sessionStorage.getItem('userData'));
        
        if (!userData?.token) {
          setCartItems([]);
          setLoading(false);
          return;
        }
        const cart = await cartService.getCart();
        setCartItems(cart.items || []);
      } catch (error) {
        if (error.message !== 'Usuario no autenticado') {
          toast({
            title: 'Error al cargar el carrito',
            description: error.response?.data?.message || error.message,
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        }
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [toast]);

  

  // Sincronizar precios al modificar el carrito
  const syncCartIfNeeded = async () => {
    try {
      const { needsUpdate } = await cartService.checkCartUpdates();
      if (needsUpdate) {
        const { cart } = await cartService.syncCartPrices();
        setCartItems(cart.items);
        toast({
          title: 'Precios actualizados',
          description: 'Los precios han sido actualizados según el catálogo actual',
          status: 'info',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error al sincronizar precios:', error);
    }
  };
  
  // Función para agregar al carrito
  const addToCart = async (product, quantity = 1, variation = '') => {
    try {
      const userData = JSON.parse(localStorage.getItem('userData')) || 
                      JSON.parse(sessionStorage.getItem('userData'));
                      
      if (!userData?.token) {
        toast({
          title: 'Error',
          description: 'Debes iniciar sesión para agregar productos al carrito',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      const updatedCart = await cartService.addProductToCart(product._id, quantity, variation);
      setCartItems(updatedCart.items);
      
      toast({
        title: 'Producto agregado',
        description: `${product.name} ha sido agregado al carrito`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      // Verificar actualizaciones después de modificar el carrito
      await syncCartIfNeeded();
    } catch (error) {
      console.error('Error al agregar al carrito:', error);
      toast({
        title: 'Error al agregar al carrito',
        description: error.response?.data?.message || 'Error al conectar con el servidor',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };


  const removeFromCart = async (itemId, variation = '') => {
    try {
      console.log('Removing from cart:', { itemId, variation }); 
      const updatedCart = await cartService.removeProductFromCart(itemId, variation);
      setCartItems(updatedCart.items);
      
      toast({
        title: 'Producto eliminado',
        description: 'El producto ha sido eliminado del carrito',
        status: 'info',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error al eliminar del carrito:', error);
      toast({
        title: 'Error al eliminar del carrito',
        description: error.response?.data?.message || 'Error al conectar con el servidor',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const updateQuantity = async (productId, quantity, variation = '') => {
    try {
      if (quantity <= 0) {
        await removeFromCart(productId, variation);
        return;
      }

      const updatedCart = await cartService.updateProductQuantity(productId, quantity, variation);
      setCartItems(updatedCart.items);
    } catch (error) {
      console.error('Error al actualizar cantidad:', error);
      toast({
        title: 'Error al actualizar cantidad',
        description: error.response?.data?.message || 'Error al conectar con el servidor',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const clearCart = async () => {
    try {
      await cartService.clearCartAPI();
      setCartItems([]);
      
      toast({
        title: 'Carrito vaciado',
        description: 'Se han eliminado todos los productos del carrito',
        status: 'info',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error al vaciar el carrito:', error);
      toast({
        title: 'Error al vaciar el carrito',
        description: error.response?.data?.message || 'Error al conectar con el servidor',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.priceAtAddition * item.quantity), 0);
  };

  const getCartCount = () => {
    console.log('cartItems:', cartItems.reduce((total, item) => total + item.quantity, 0));
    return cartItems.reduce((total, item) => total + item.quantity, 0);

  };

  return (
    <CartContext.Provider value={{
      cartItems,
      loading,
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