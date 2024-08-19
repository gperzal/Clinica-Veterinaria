// /components/dashboard/SidebarContent.jsx
import React from 'react';
import { Box, CloseButton, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { FiHome, FiUser, FiClipboard, FiShoppingCart, FiCreditCard, FiSettings } from 'react-icons/fi';

const LinkItems = [
  { name: 'Principal', icon: FiHome },
  { name: 'Perfil', icon: FiUser },
  { name: 'Historial Mascota', icon: FiClipboard },
  { name: 'Historial Compra', icon: FiShoppingCart },
  { name: 'Wallet', icon: FiCreditCard },
  { name: 'Configuración', icon: FiSettings },
];

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Clinica Mascotas
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, ...rest }) => {
  return (
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
        <Box mr="4" fontSize="16" as={icon} />
      )}
      {children}
    </Flex>
  );
};

export default SidebarContent;
