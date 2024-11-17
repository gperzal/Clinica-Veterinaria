// src/modules/dashboard/catalog/hooks/useProducts.js

import { useState, useEffect } from 'react';
import { catalogServices } from '../services/catalogService';
import useToastNotification from '../../../../../src/hooks/useToastNotification';

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToastNotification();

  // Función para obtener productos
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await catalogServices.getProducts();
      setProducts(response.data);
    } catch (error) {
      toast({
        title: 'Error al cargar los productos.',
        error: error,
        status: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  // Función para crear producto
  const createProduct = async (newProductData) => {
    try {
      await catalogServices.createProduct(newProductData);
      toast({
        title: 'Producto creado.',
        description: 'El producto ha sido creado exitosamente.',
        status: 'success',
      });
      fetchProducts();
    } catch (error) {
      toast({
        title: 'Error al cargar los productos.',
        error: error,
        status: 'error',
      });
    }
  };

  // Función para actualizar producto
  const updateProduct = async (updatedProduct) => {
    try {
      await catalogServices.updateProduct(updatedProduct._id, updatedProduct);
      toast({
        title: 'Producto actualizado.',
        description: 'El producto ha sido actualizado exitosamente.',
        status: 'success',
      });
      fetchProducts();
    } catch (error) {
      toast({
        title: 'Error al actualizar los productos.',
        error: error,
        status: 'error',

      });
    }
  };

  // Función para eliminar producto
  const deleteProduct = async (productId) => {
    try {
      await catalogServices.deleteProduct(productId);
      toast({
        title: 'Producto eliminado.',
        description: 'El Producto ha sido eliminado exitosamente.',
      });
      fetchProducts();
    } catch (error) {
      toast({
        title: 'Error al eliminar el producto.',
        error: error,
        status: 'error',
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
