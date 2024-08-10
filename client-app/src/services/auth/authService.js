import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_API;
console.log(API_URL);

export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/api/auth/register`, userData);
  return response;
};

export const login = async (userData) => {
  const response = await axios.post(`${API_URL}/api/auth/login`, userData);
  return response;
};
