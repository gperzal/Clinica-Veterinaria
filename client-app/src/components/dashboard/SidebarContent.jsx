// src/components/dashboard/SidebarContent.jsx
import React from 'react';
import { Box, Flex, Icon, useColorModeValue, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FiHome, FiUser, FiClipboard, FiShoppingCart, FiCreditCard, FiSettings } from 'react-icons/fi';

const LinkItems = [
  { name: 'Dashboard', icon: FiHome, path: '/dashboard' },
  { name: 'Mi Perfil', icon: FiUser, path: '/dashboard/profile' },
  { name: 'Historial Médico', icon: FiClipboard, path: '/dashboard/medical-history' },
  { name: 'Historial  Compras', icon: FiShoppingCart, path: '/dashboard/purchase-history' },
  { name: 'Billetera', icon: FiCreditCard, path: '/dashboard/wallet' },
  { name: 'Configuración', icon: FiSettings, path: '/dashboard/settings' },
];

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} path={link.path}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, path, ...rest }) => {
  return (
    <Link to={path} style={{ textDecoration: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

export default SidebarContent;
