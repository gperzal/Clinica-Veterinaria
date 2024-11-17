// controllers/dashboard/productController.js
import Product from '../../models/Product.js';

// Crear un nuevo producto
export const createProduct = async (req, res) => {
  try {
    const product = new Product({ ...req.body, user: req.userId }); // Asociamos el producto al usuario
    await product.save();
    res.status(201).json({ message: 'Producto creado con éxito', product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el producto' });
  }
};

// Obtener todos los productos
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('user', 'name email'); // Traer los datos del usuario asociado
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los productos' });
  }
};

// Obtener un producto por ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('user', 'name email');
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el producto' });
  }
};


// Actualizar un producto
export const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json({ message: 'Producto actualizado con éxito', updatedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el producto' });
  }
};


// Eliminar un producto
export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json({ message: 'Producto eliminado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el producto' });
  }
};

