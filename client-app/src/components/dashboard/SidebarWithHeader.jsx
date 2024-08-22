// src/components/dashboard/SidebarWithHeader.jsx
'use client'

import {
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  Collapse,
  IconButton,
  VStack,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Avatar,
} from '@chakra-ui/react';
import {
  FiHome,
  FiUser,
  FiUsers,
  FiClipboard,
  FiShoppingCart,
  FiSettings,
  FiMenu,
  FiBell,
  FiFile ,
  FiChevronDown,
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useState } from 'react';

// Datos organizados por secciones
const menuSections = [
  {
    sectionName: 'Generales',
    items: [
      { name: 'Dashboard', icon: FiHome, path: '/dashboard' }, 
      { name: 'Mi Perfil', icon: FiUser, path: '/dashboard/profile' },
      { name: 'Historial Médico', icon: FiClipboard, path: '/dashboard/coming-soon' }, // path: '/dashboard/medical-history'
      { name: 'Historial Compras', icon: FiShoppingCart, path: '/dashboard/coming-soon' }, //path: '/dashboard/purchase-history'
      { name: 'Configuración', icon: FiSettings, path: '/dashboard/settings' },
    ],
  },
  {
    sectionName: 'Administrativo',
    items: [
      { name: 'Catalogo', icon: FiClipboard, path: '/dashboard/catalog'}, 
      { name: 'Inventario', icon: FiShoppingCart, path: '/dashboard/inventory' }, 
      { name: 'Citas Medicas', icon: FiClipboard,path: '/dashboard/coming-soon' }, // path: '/dashboard/medical-appointments'
      { name: 'Citas Estilisticas', icon: FiClipboard, path: '/dashboard/coming-soon' }, // path: '/dashboard/esthetic-appointments'
    ],
  },
  {
    sectionName: 'Veterinario',
    items: [
      { name: 'Citas', icon: FiClipboard, path: '/dashboard/coming-soon'}, // path: '/dashboard/appointments' 
    ],
  },
  {
    sectionName: 'Admin',
    items: [
      { name: 'Usuarios', icon: FiUsers,path: '/dashboard/users' }, 
      { name: 'Roles', icon: FiUser,  path: '/dashboard/roles' }, 
      { name : 'Reportes', icon: FiFile, path: '/dashboard/reports' },
    ],
  },
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
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Link to="/">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
           Dashboard
        </Text>
        </Link>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {menuSections.map((section) => (
        <MenuSection key={section.sectionName} section={section} />
      ))}
    </Box>
  );
};

const MenuSection = ({ section }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Box mt={4}>
      <Flex
        align="center"
        justifyContent="space-between"
        px={4}
        py={2}
        bg={useColorModeValue('gray.100', 'gray.700')}
        borderRadius="md"
        cursor="pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Text fontSize="sm" fontWeight="bold" textTransform="uppercase">
          {section.sectionName}
        </Text>
        <Icon as={FiMenu} />
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <VStack align="start" spacing={0} mt={2}>
          {section.items.map((link) => (
            <NavItem key={link.name} icon={link.icon} path={link.path}>
              {link.name}
            </NavItem>
          ))}
        </VStack>
      </Collapse>
    </Box>
  );
};

const NavItem = ({ icon, children, path, ...rest }) => {
  return (
    <Link to={path} style={{ textDecoration: 'none', width: '100%' }}>
      <Flex
        align="center"
        p="4"
        pl="6"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}
      >
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

const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
    
  

      <HStack spacing={{ base: '0', md: '6' }}>
        <IconButton size="lg" variant="ghost" aria-label="open menu" icon={<FiBell />} />
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
              <HStack>
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2">
                  <Text fontSize="sm">Justina Clark</Text>
                  <Text fontSize="xs" color="gray.600">
                    Admin
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}>
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuDivider />
              <MenuItem>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>


    </Flex>
  );
};

const SidebarWithHeader = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
};

export default SidebarWithHeader;
