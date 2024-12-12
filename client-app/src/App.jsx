// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box, Flex } from '@chakra-ui/react';
import { AuthProvider } from './modules/auth/context/AuthContext';

import HomePage from './pages/HomePage';

// Modulo de Layout
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
import Chatbot from './layout/Chatbot';

// Modulo de Auth
import LoginPage from './modules/auth/pages/LoginPage';
import RegisterPage from './modules/auth/pages/RegisterPage';
import ForgotPasswordPage from './modules/auth/pages/ForgotPasswordPage'; 
import ResetPasswordPage from './modules/auth/pages/ResetPasswordPage';
// Modulo de Pages Comming Soon y Not Found
import ComingSoonPage from './pages/ComingSoonPage';
import NotFoundPage from './pages/NotFoundPage';
// Modulo de Dashboard
import DashboardPage from './modules/dashboard/home/pages/DashboardPage';
import ProfilePage from './modules/dashboard/profile/pages/ProfilePage';
import SettingPage from './modules/dashboard/setting/pages/SettingPage';
import MedicalHistoryPage from './modules/dashboard/medical-history/pages/MedicalHistoryPage';
import PurchaseHistoryPage from './modules/dashboard/purchase-history/pages/PurchaseHistoryPage';
import CatalogPage from './modules/dashboard/catalog/pages/CatalogPage';
import InventoryPage from './modules/dashboard/inventory/pages/InventoryPage';
import MedicalAppointmentsPage from './modules/dashboard/medical-appointments/pages/MedicalAppointmentsPage';
import EstheticAppointmentsPage from './modules/dashboard/esthetic-appointments/pages/EstheticAppointmentsPage';
import AppointmentsPage from './modules/dashboard/appointments/pages/AppointmentsPage';
import {MedicalAppointmentsProvider} from './modules/dashboard/appointments/context/MedicalAppointmentsContext';
import UsersPage from './modules/dashboard/users/pages/UsersPage';
import RolesPage from './modules/dashboard/roles/pages/RolesPage';
import ReportsPage from './modules/dashboard/reports/pages//ReportsPage';
// Modulo de Users
import { UsersProvider } from './modules/dashboard/users/context/UsersContext';

// Modulo de Citas
import ScheduleAppointmentPage from './modules/appointments/pages/ScheduleAppointmentPage';
import AppointmentHistoryPage from './modules/appointments/pages/AppointmentHistoryPage';
import ManageOverbookingsPage from './modules/appointments/pages/ManageOverbookingsPage';
import { AppointmentsProvider } from './modules/appointments/context/AppointmentsContext';
// Modulo Catalogo
import ProductsPage from './modules/catalog/pages/ProductsPage';
import { CartProvider } from './modules/catalog/context/CartContext';
import { OrderProvider } from './modules/catalog/context/OrderContext.jsx';
import ProductDetailsPage from './modules/catalog/pages/ProductDetailsPage';
import ShoppingCart from './modules/catalog/pages/ShoppingCart';
// Modulo Contacto
import ContactPage from './modules/contact/pages/ContactPage';
import FAQPage from './modules/contact/pages/FAQPage';
import FeedbackPage from './modules/contact/pages/FeedbackPage';
// Modulo Blog
import BlogPage from './modules/blog/pages/BlogPage';


// Modulo Dashboard
import SidebarWithHeader from './layout/SidebarWithHeader'; 
import AboutPage from './pages/AboutPage';


function App() {
  return (
    <AuthProvider>  
      <AppointmentsProvider>  
      <CartProvider>
      <OrderProvider>
    
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
                  <Chatbot />
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
                                <Chatbot />
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
                      <Chatbot />
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
                      <Chatbot />
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
                            <Chatbot />
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
                            <Chatbot />
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
                            <Chatbot />
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
                  <Chatbot />
                </Box>
                <Footer />
              </Flex>
            } 
          />
          <Route 
            path="/blog" 
            element={
              <Flex direction="column" minH="100vh">
                <Navbar />
                <Box flex="1">
                  <BlogPage />
                  <Chatbot />
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

            <Route 
              path="/catalog/shopping-cart" 
              element={
                <Flex direction="column" minH="100vh">
                  <Navbar />
                  <Box flex="1">
                    <ShoppingCart />
                    <Chatbot />
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
                <Route path="appointments" element={<MedicalAppointmentsProvider>
                                                    <AppointmentsPage />
                                                    </MedicalAppointmentsProvider>} />
                <Route path="users" element={ <UsersProvider>
                                              <UsersPage />
                                            </UsersProvider>} />
                <Route path="roles" element={<RolesPage />} />
                <Route path="reports" element={<ReportsPage />} />
                <Route path="*" element={<ComingSoonPage />} />
              </Routes>
            </SidebarWithHeader>
            } 
          />
        </Routes>
      </Router>
      </OrderProvider>
      </CartProvider>
      </AppointmentsProvider>
    </AuthProvider>
  );
}

export default App;
