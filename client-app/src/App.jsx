// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/partials/Navbar';
import Footer from './components/partials/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage'; 
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import ComingSoonPage from './pages/ComingSoonPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import ProfilePage from './pages/dashboard/ProfilePage';
import { Box, Flex } from '@chakra-ui/react';
import SidebarWithHeader from './components/dashboard/SidebarWithHeader'; // Importa el layout del dashboard

function App() {
  return (
    <AuthProvider>    
      <Router>
        <Routes>
          {/* Rutas generales con Navbar y Footer */}
          <Route 
            path="/" 
            element={
              <Flex direction="column" minH="100vh">
                <Navbar />
                <Box flex="1">
                  <HomePage />
                </Box>
                <Footer />
              </Flex>
            } 
          />
          <Route 
            path="/login" 
            element={
              <Flex direction="column" minH="100vh">
                <Navbar />
                <Box flex="1">
                  <LoginPage />
                </Box>
                <Footer />
              </Flex>
            } 
          />
          <Route 
            path="/register" 
            element={
              <Flex direction="column" minH="100vh">
                <Navbar />
                <Box flex="1">
                  <RegisterPage />
                </Box>
                <Footer />
              </Flex>
            } 
          />
          <Route 
            path="/forgot-password" 
            element={
              <Flex direction="column" minH="100vh">
                <Navbar />
                <Box flex="1">
                  <ForgotPasswordPage />
                </Box>
                <Footer />
              </Flex>
            } 
          />
          <Route 
            path="/reset-password/:resetToken" 
            element={
              <Flex direction="column" minH="100vh">
                <Navbar />
                <Box flex="1">
                  <ResetPasswordPage />
                </Box>
                <Footer />
              </Flex>
            } 
          />
          <Route 
            path="/coming-soon" 
            element={
              <Flex direction="column" minH="100vh">
                <Navbar />
                <Box flex="1">
                  <ComingSoonPage />
                </Box>
                <Footer />
              </Flex>
            } 
          />
          
          {/* Rutas del dashboard sin Navbar y Footer */}
          <Route 
            path="/dashboard/*" 
            element={
              <SidebarWithHeader>
                <Routes>
                  <Route path="" element={<DashboardPage />} /> {/* Dashboard principal */}
                  <Route path="profile" element={<ProfilePage />} /> Perfil del usuario
                  {/* Aquí puedes añadir otras rutas del dashboard */}
                </Routes>
              </SidebarWithHeader>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
