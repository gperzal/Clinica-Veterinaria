// client-app/src/modules/catalog/services/cartService.js
import api from '../../../services/api';

const getCart = async () => {
  const response = await api.get('/api/cart');
  return response.data;
};

const addProductToCart = async (productId, quantity, variation) => {
  const userData = JSON.parse(localStorage.getItem('userData')) ||
    JSON.parse(sessionStorage.getItem('userData'));

  if (!userData?.token) {
    throw new Error('Usuario no autenticado');
  }

  const response = await api.post('/api/cart/add', {
    productId,
    quantity,
    variation
  });
  return response.data;
};

const removeProductFromCart = async (itemId, variation) => {
  console.log('Removing item with:', { itemId, variation }); // Log para debug
  const response = await api.delete(`/api/cart/remove`, {
    data: {
      itemId,  
      variation
    }
  });
  return response.data;
};

const updateProductQuantity = async (productId, quantity, variation) => {
  const response = await api.put(`/api/cart/update`, {
    productId,
    quantity,
    variation
  });
  return response.data;
};

const clearCartAPI = async () => {
  const response = await api.delete('/api/cart/clear');
  return response.data;
};

const checkCartUpdates = async () => {
  const response = await api.get('/api/cart/check-updates');
  return response.data;
};

const syncCartPrices = async () => {
  const response = await api.get('/api/cart/sync-prices');
  return response.data;
};

export const cartService = {
  getCart,
  addProductToCart,
  removeProductFromCart,
  updateProductQuantity,
  clearCartAPI,
  checkCartUpdates,
  syncCartPrices,
};