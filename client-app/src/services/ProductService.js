// src/services/ProductService.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_API;


const ProductService = {
    getProducts: async () => {
        const response = await axios.get(`${API_URL}/api/products`); 
        return response.data;
    },
};

export default ProductService;
