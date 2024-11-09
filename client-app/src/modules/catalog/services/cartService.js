// client-app/src/modules/catalog/services/cartService.js
import axios from 'axios';

export const fetchCart = async () => {
  const response = await axios.get('/api/cart');
  return response.data;
};

export const addProductToCart = async (product, quantity, variation) => {
  const response = await axios.post('/api/cart', { product, quantity, variation });
  return response.data;
};

export const removeProductFromCart = async (productId, variation) => {
  const response = await axios.delete(`/api/cart/remove`, { data: { productId, variation } });
  return response.data;
};

export const updateProductQuantity = async (productId, quantity, variation) => {
  const response = await axios.put(`/api/cart/update`, { productId, quantity, variation });
  return response.data;
};

export const clearCartAPI = async () => {
  await axios.delete('/api/cart/clear');
};
