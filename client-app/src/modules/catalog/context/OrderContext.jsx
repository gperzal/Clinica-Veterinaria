// client-app/src/modules/catalog/context/OrderContext.jsx
import React, { createContext, useContext, useState } from 'react';
import useToastNotification from '../../../hooks/useToastNotification';
import { orderService } from '../services/orderService';
import { useCart } from './CartContext';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const toast = useToastNotification();
  const { clearCart } = useCart();
  const [currentOrder, setCurrentOrder] = useState(null);
  const [userOrders, setUserOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const createNewOrder = async (orderDetails) => {
    try {
        setLoading(true);
        const newOrder = await orderService.createOrder(orderDetails);
        setCurrentOrder(newOrder);
        toast({
          title: 'Orden creada',
          description: 'La orden ha sido creada exitosamente',
          status: 'success',
        })
        return newOrder;
      } catch (error) {
        toast({
          title: 'Error al crear la orden',
          description: error.response?.data?.message || 'Error al procesar la orden',
          status: 'error',
        });
        throw error;
      } finally {
        setLoading(false);
      }
    };

  const getUserOrderHistory = async () => {
    try {
      setLoading(true);
      const orders = await orderService.getUserOrders();
      setUserOrders(orders);
      return orders;
    } catch (error) {
      toast({
        title: 'Error al obtener historial de órdenes',
        description: error.response?.data?.message || 'Error al cargar las órdenes',
        status: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <OrderContext.Provider
      value={{
        currentOrder,
        userOrders,
        loading,
        createNewOrder,
        getUserOrderHistory
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder debe ser usado dentro de un OrderProvider');
  }
  return context;
};