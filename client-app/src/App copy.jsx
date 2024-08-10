import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import Navbar from './components/partials/Navbar';

function App() {
  const isLoggedIn = false; // Lógica de autenticación
  const username = 'Juan'; // El nombre del usuario autenticado

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} username={username} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* Otras rutas */}
      </Routes>
    </Router>
  );
}

export default App;
