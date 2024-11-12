// client-app/src/modules/catalog/services/cartService.js
import api from '../../../services/api';

const getCart = async () => {
  const response = await api.get('/api/cart');
  return response.data;
};

const addProductToCart = async (productId, quantity, variation) => {
  const response = await api.post('/api/cart/add', {
    productId,
    quantity,
    variation
  });
  return response.data;
};

const removeProductFromCart = async (itemId) => {
  const response = await api.delete('/api/cart/remove', {
    data: { itemId },
  });
  return response.data;
};
const updateProductQuantity = async (itemId, quantity) => {
  const response = await api.put('/api/cart/update', {
    itemId,
    quantity,
  });
  return response.data;
};

const clearCartAPI = async () => {
  const response = await api.delete('/api/cart/clear');
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
  syncCartPrices,
};