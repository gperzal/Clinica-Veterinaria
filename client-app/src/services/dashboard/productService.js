// src/services/dashboard/productService.js
import api from '../api';

// Obtener todos los productos
export const getProducts = async () => {
  return await api.get('/api/dashboard/products');
};

// Obtener un producto por ID
export const getProductById = async (productId) => {
  return await api.get(`/api/dashboard/products/${productId}`);
};

// Crear un nuevo producto (puede no ser necesario si es solo para leer)
export const createProduct = async (productData) => {
  return await api.post('/api/dashboard/products', productData);
};

// Actualizar un producto
export const updateProduct = async (productId, productData) => {
  return await api.put(`/api/dashboard/products/${productId}`, productData);
};

// Eliminar un producto
export const deleteProduct = async (productId) => {
  return await api.delete(`/api/dashboard/products/${productId}`);
};
