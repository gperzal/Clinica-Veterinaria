// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData, rememberMe) => {
    const { token, name, role } = userData;

    const user = { token, name, role };
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
