// src/modules/auth/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData, rememberMe) => {
    const { token, name, role, _id } = userData; 
    const user = { token, name, role, _id }; 
    setUser(user);

    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem('userData', JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userData');
    sessionStorage.removeItem('userData');
  };

  useEffect(() => {
    const storedUserData =
      JSON.parse(localStorage.getItem('userData')) ||
      JSON.parse(sessionStorage.getItem('userData'));
    if (storedUserData && storedUserData.token) {
      setUser(storedUserData);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};
