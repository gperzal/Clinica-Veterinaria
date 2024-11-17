// client-app/src/modules/catalog/pages/ShoppingCart.jsx

import React, { useState } from 'react';
import {
  Box,
  Stack,
  Heading,
  Button,
  Flex,
  useColorModeValue,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import CartItem from '../components/cart/CartItem';
import CartOrderSummary from '../components/cart/CartOrderSummary';
import Checkout from '../components/checkout/Checkout';
import Payment from '../components/payment/Payment';
import PaymentConfirmation from '../components/payment/PaymentConfirmation';
import { useCart } from '../context/CartContext';

const ShoppingCart = () => {
  const [currentStep, setCurrentStep] = useState('cart');
  const [shippingCost, setShippingCost] = useState(0);
  const [shippingMethod, setShippingMethod] = useState('');
  const [orderDetails, setOrderDetails] = useState(null);

  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    addToCart,
    getCartTotal,
    clearCart,
  } = useCart();

  const handlePaymentClick = () => {
    if (currentStep === 'cart') {
      setCurrentStep('checkout');
    } else if (currentStep === 'checkout') {
      setCurrentStep('processing');
    }
  };

  const handlePaymentComplete = async (newOrder) => {
    setCurrentStep('confirmation');
    setOrderDetails(newOrder);
  };

  const handleBackToCart = () => {
    setCurrentStep('cart');
  };

  const renderMainContent = () => {
    switch (currentStep) {
      case 'cart':
        return (
          <Stack spacing="6">
            {Array.isArray(cartItems) && cartItems.length > 0 ? (
              cartItems.map((item) => (
                <CartItem
                  key={item._id}
                  item={item}
                  onRemove={() => removeFromCart(item._id)}
                  onUpdateQuantity={(quantity) => updateQuantity(item._id, quantity)}
                />
              ))
            ) : (
              <Alert status="info" borderRadius="md">
                <AlertIcon />
                Tu carrito está vacío. ¡Comienza a agregar productos!
              </Alert>
            )}
          </Stack>
        );
      case 'checkout':
        return (
          <Checkout
            cartTotal={getCartTotal()}
            cartItems={cartItems || []}
            setShippingCost={setShippingCost}
            setOrderDetails={setOrderDetails}
            setShippingMethod={setShippingMethod}
          />
        );
      case 'processing':
        return (
          <Payment orderDetails={orderDetails} onPaymentComplete={handlePaymentComplete} />
        );
      case 'confirmation':
        return <PaymentConfirmation orderDetails={orderDetails} />;
      default:
        return null;
    }
  };

  const renderTitle = () => {
    switch (currentStep) {
      case 'cart':
        return 'Carrito de Compras';
      case 'checkout':
        return 'Finalizar Compra';
      case 'processing':
        return 'Procesando Pago';
      case 'confirmation':
        return 'Confirmación de Compra';
      default:
        return '';
    }
  };

  const isPaymentDisabled =
    currentStep === 'cart' && (!Array.isArray(cartItems) || cartItems.length === 0);

  return (
    <Box
      maxW={{ base: '3xl', lg: '7xl' }}
      mx="auto"
      px={{ base: '4', md: '8', lg: '12' }}
      py={{ base: '6', md: '8', lg: '12' }}
    >
      <Stack
        direction={{ base: 'column', lg: 'row' }}
        align={{ lg: 'flex-start' }}
        spacing={{ base: '8', md: '16' }}
      >
        <Stack spacing={{ base: '8', md: '10' }} flex="2">
          <Heading fontSize="2xl" fontWeight="extrabold">
            {renderTitle()}
          </Heading>
          {renderMainContent()}
        </Stack>

        {(currentStep === 'cart' || currentStep === 'checkout') && (
          <Flex direction="column" align="center" flex="1">
            <CartOrderSummary subtotal={getCartTotal()} shippingCost={shippingCost} />
            <Button
              mt="6"
              colorScheme="teal"
              size="lg"
              width="full"
              onClick={handlePaymentClick}
              isDisabled={isPaymentDisabled}
            >
              {currentStep === 'checkout' ? 'Pagar' : 'Ir al Pago'}
            </Button>

            {currentStep === 'checkout' && (
              <Button
                mt="4"
                colorScheme="gray"
                size="lg"
                width="full"
                onClick={handleBackToCart}
              >
                Regresar al Carrito
              </Button>
            )}

            {currentStep === 'cart' && (
              <Button as={RouterLink} to="/catalog" mt="4" variant="link" color="teal.500">
                Seguir Comprando
              </Button>
            )}
          </Flex>
        )}
      </Stack>
    </Box>
  );
};

export default ShoppingCart;
