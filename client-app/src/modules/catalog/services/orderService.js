// client-app/src/modules/catalog/services/orderService.js
import api from '../../../services/api';

const createOrder = async (orderData) => {
  const response = await api.post('/api/orders', orderData);
  return response.data;
};

const getUserOrders = async () => {
  const response = await api.get('/api/orders/my-orders');
  return response.data;
};

const getOrderById = async (orderId) => {
  const response = await api.get(`/api/orders/my-orders/${orderId}`);
  return response.data;
};

const cancelOrder = async (orderId, reason) => {
  const response = await api.post(`/api/orders/cancel/${orderId}`, { reason });
  return response.data;
};

const checkOrderStatus = async (orderId) => {
  const response = await api.get(`/api/orders/status/${orderId}`);
  return response.data;
};

export const orderService = {
  createOrder,
  getUserOrders,
  getOrderById,
  cancelOrder,
  checkOrderStatus,
};