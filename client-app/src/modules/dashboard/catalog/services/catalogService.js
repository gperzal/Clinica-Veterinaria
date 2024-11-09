// src/dashboard/catalog/services/productService.js
import api from '../../../../services/api';

// Servicios disponibles para cualquier parte de la aplicación
const getProducts = async () => {
  return await api.get('/api/dashboard/products');
};

const getProductById = async (productId) => {
  return await api.get(`/api/dashboard/products/${productId}`);
};

// Servicios exclusivos del dashboard (CRUD completo)
const createProduct = async (productData) => {
  return await api.post('/api/dashboard/products', productData);
};

const updateProduct = async (productId, productData) => {
  return await api.put(`/api/dashboard/products/${productId}`, productData);
};

const deleteProduct = async (productId) => {
  return await api.delete(`/api/dashboard/products/${productId}`);
};

// Exportar sólo los métodos de lectura para el catálogo de usuarios
export const productServices = {
  getProducts,
  getProductById,
};

// Exportar todos los métodos CRUD para el dashboard
export const catalogServices = {
  ...productServices, 
  createProduct,
  updateProduct,
  deleteProduct,
};
