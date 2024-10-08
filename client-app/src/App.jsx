// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/partials/Navbar';
import Footer from './components/partials/Footer';
import HomePage from './pages/HomePage';
// Modulo de Auth
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage'; 
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
// Modulo de Pages Comming Soon y Not Found
import ComingSoonPage from './pages/ComingSoonPage';
import NotFoundPage from './pages/NotFoundPage';
// Modulo de Dashboard
import DashboardPage from './pages/dashboard/DashboardPage';
import ProfilePage from './pages/dashboard/ProfilePage';
import SettingPage from './pages/dashboard/SettingPage';
import MedicalHistoryPage from './pages/dashboard/MedicalHistoryPage';
import PurchaseHistoryPage from './pages/dashboard/PurchaseHistoryPage';
import CatalogPage from './pages/dashboard/CatalogPage';
import InventoryPage from './pages/dashboard/InventoryPage';
import MedicalAppointmentsPage from './pages/dashboard/MedicalAppointmentsPage';
import EstheticAppointmentsPage from './pages/dashboard/EstheticAppointmentsPage';
import AppointmentsPage from './pages/dashboard/AppointmentsPage';
import UsersPage from './pages/dashboard/UsersPage';
import RolesPage from './pages/dashboard/RolesPage';
import ReportsPage from './pages/dashboard/ReportsPage';
// Modulo de Citas
import ScheduleAppointmentPage from './pages/appointments/ScheduleAppointmentPage';
import AppointmentHistoryPage from './pages/appointments/AppointmentHistoryPage';
import ManageOverbookingsPage from './pages/appointments/ManageOverbookingsPage';
import { AppointmentsProvider } from './context/AppointmentsContext';
// Modulo Catalogo
import ProductsPage from './pages/catalog/ProductsPage';
import { CartProvider } from './context/CartContext';
import ProductDetailsPage from './pages/catalog/ProductDetailsPage';

import { Box, Flex } from '@chakra-ui/react';

// Modulo Contacto
import ContactPage from './pages/contact/ContactPage';
import FAQPage from './pages/contact/FAQPage';
import FeedbackPage from './pages/contact/FeedbackPage';
import SidebarWithHeader from './components/dashboard/SidebarWithHeader'; 
import AboutPage from './pages/AboutPage';
function App() {
  return (
    <AuthProvider>  
      <AppointmentsProvider>  
      <CartProvider>
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
                          path="/appointments" 
                          element={
                            <Flex direction="column" minH="100vh">
                              <Navbar />
                              <Box flex="1">
                                <ScheduleAppointmentPage />
                              </Box>
                              <Footer />
                            </Flex>
                          } 
          />
          <Route path="/appointments/history" element={<AppointmentHistoryPage />} />
          <Route path="/appointments/manage-overbookings" element={<ManageOverbookingsPage />} />        
          <Route path="/catalog" 
                element={
                  <Flex direction="column" minH="100vh">
                    <Navbar />
                    <Box flex="1">
                      <ProductsPage />
                    </Box>
                    <Footer />
                  </Flex>
                } 
              />
            <Route path="/products/:productId"
                element={
                  <Flex direction="column" minH="100vh">
                    <Navbar />
                    <Box flex="1">
                      <ProductDetailsPage />
                    </Box>
                    <Footer />
                  </Flex>
                } 
              />
          <Route path="/contact"
                      element={
                        <Flex direction="column" minH="100vh">
                          <Navbar />
                          <Box flex="1">
                            <ContactPage />
                          </Box>
                          <Footer />
                        </Flex>
                      } 
          />
           <Route path="/faq"
                      element={
                        <Flex direction="column" minH="100vh">
                          <Navbar />
                          <Box flex="1">
                            <FAQPage />
                          </Box>
                          <Footer />
                        </Flex>
                      } 
          />
        <Route path="/feedback"
                      element={
                        <Flex direction="column" minH="100vh">
                          <Navbar />
                          <Box flex="1">
                            <FeedbackPage />
                          </Box>
                          <Footer />
                        </Flex>
                      } 
          />
          <Route 
            path="/about" 
            element={
              <Flex direction="column" minH="100vh">
                <Navbar />
                <Box flex="1">
                  <AboutPage />
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

          <Route path="*" element={<NotFoundPage />} />
          {/* Rutas del dashboard sin Navbar y Footer */}
          <Route path="/dashboard/*" element={
              <SidebarWithHeader>
              <Routes>
                <Route path="" element={<DashboardPage />} /> 
                <Route path="profile" element={<ProfilePage />} /> 
                <Route path="settings" element={<SettingPage />} />
                <Route path="medical-history" element={<MedicalHistoryPage />} />
                <Route path="purchase-history" element={<PurchaseHistoryPage />} />
                <Route path="catalog" element={<CatalogPage />} />
                <Route path="inventory" element={<InventoryPage />} />
                <Route path="medical-appointments" element={<MedicalAppointmentsPage />} />
                <Route path="esthetic-appointments" element={<EstheticAppointmentsPage />} />
                <Route path="appointments" element={<AppointmentsPage />} />
                <Route path="users" element={<UsersPage />} />
                <Route path="roles" element={<RolesPage />} />
                <Route path="reports" element={<ReportsPage />} />
                <Route path="*" element={<ComingSoonPage />} />
              </Routes>
            </SidebarWithHeader>
            } 
          />
        </Routes>
      </Router>
      </CartProvider>
      </AppointmentsProvider>
    </AuthProvider>
  );
}

export default App;
