// src/modules/dashboard/catalog/hooks/useProducts.js

import { useState, useEffect } from 'react';
import { catalogServices } from '../services/catalogService';
import useToastNotification from '../../../../../src/hooks/useToastNotification';

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showInfoToast, showErrorToast, showSuccessToast } = useToastNotification();

  // Función para obtener productos
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await catalogServices.getProducts();
      setProducts(response.data);
    } catch (error) {
      showErrorToast({
        title: 'Error al cargar los productos.',
        error: error,
      });
    } finally {
      setLoading(false);
    }
  };

  // Función para crear producto
  const createProduct = async (newProductData) => {
    try {
      await catalogServices.createProduct(newProductData);
      showSuccessToast({
        title: 'Producto creado.',
        description: 'El producto ha sido creado exitosamente.',
      });
      fetchProducts();
    } catch (error) {
      showErrorToast({
        title: 'Error al cargar los productos.',
        error: error,
      });
    }
  };

  // Función para actualizar producto
  const updateProduct = async (updatedProduct) => {
    try {
      await catalogServices.updateProduct(updatedProduct._id, updatedProduct);
      showSuccessToast({
        title: 'Producto actualizado.',
        description: 'El producto ha sido actualizado exitosamente.',
      });
      fetchProducts();
    } catch (error) {
      showErrorToast({
        title: 'Error al actualizar los productos.',
        error: error,
      });
    }
  };

  // Función para eliminar producto
  const deleteProduct = async (productId) => {
    try {
      await catalogServices.deleteProduct(productId);
      showInfoToast({
        title: 'Producto eliminado.',
        description: 'El Producto ha sido eliminado exitosamente.',
      });
      fetchProducts();
    } catch (error) {
      showErrorToast({
        title: 'Error al eliminar el producto.',
        error: error,
      });
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line
  }, []);

  return {
    products,
    loading,
    createProduct,
    updateProduct,
    deleteProduct,
    fetchProducts,
  };
};

export default useProducts;
