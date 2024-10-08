// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUserData =
      JSON.parse(localStorage.getItem('userData')) ||
      JSON.parse(sessionStorage.getItem('userData'));
    if (storedUserData && storedUserData.token && storedUserData.name) {
      setUser({ token: storedUserData.token, name: storedUserData.name });
    }
  }, []);

  const login = (userData, rememberMe) => {
    setUser(userData);
    if (rememberMe) {
      localStorage.setItem('userData', JSON.stringify(userData));
    } else {
      sessionStorage.setItem('userData', JSON.stringify(userData));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userData');
    sessionStorage.removeItem('userData');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
