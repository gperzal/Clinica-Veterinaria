// src/components/dashboard/SidebarWithHeader.jsx

import React, { useState, useContext } from 'react';
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
  MenuItem,
  MenuList,
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
  FiFile,
  FiChevronDown,
} from 'react-icons/fi';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { AuthContext } from '../modules/auth/context/AuthContext';


// Datos organizados por secciones con roles permitidos
const menuSections = [
  {
    sectionName: 'Generales',
    allowedRoles: ['Cliente', 'Administrativo', 'Veterinario', 'Administrador'],
    items: [
      { name: 'Dashboard', icon: FiHome, path: '/dashboard' },
      { name: 'Mi Perfil', icon: FiUser, path: '/dashboard/profile' },
      { name: 'Historial Médico', icon: FiClipboard, path: '/dashboard/coming-soon' },
      { name: 'Historial Compras', icon: FiShoppingCart, path: '/dashboard/purchase-history' },
      { name: 'Configuración', icon: FiSettings, path: '/dashboard/settings' },
    ],
  },
  {
    sectionName: 'Administrativo',
    allowedRoles: ['Administrativo', 'Veterinario', 'Administrador'],
    items: [
      { name: 'Catálogo', icon: FiClipboard, path: '/dashboard/catalog' },
      { name: 'Inventario', icon: FiShoppingCart, path: '/dashboard/inventory' },
      { name: 'Citas Médicas', icon: FiClipboard, path: '/dashboard/coming-soon' },
      { name: 'Citas Estilísticas', icon: FiClipboard, path: '/dashboard/coming-soon' },
    ],
  },
  {
    sectionName: 'Veterinario',
    allowedRoles: ['Veterinario', 'Administrador'],
    items: [
      { name: 'Citas', icon: FiClipboard, path: '/dashboard/appointments' },
    ],
  },
  {
    sectionName: 'Administrador',
    allowedRoles: ['Administrador'],
    items: [
      { name: 'Usuarios', icon: FiUsers, path: '/dashboard/users' },
      { name: 'Roles', icon: FiUser, path: '/dashboard/roles' },
      { name: 'Reportes', icon: FiFile, path: '/dashboard/reports' },
    ],
  },
];

const SidebarContent = ({ onClose, userRole, ...rest }) => {
  return (
    <Box
      transition="0.3s ease"
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
      {menuSections
        .filter((section) => section.allowedRoles.includes(userRole))
        .map((section) => (
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
};;

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

const MobileNav = ({ onOpen, user, logout, ...rest }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirige al inicio o a la página de login
  };

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
                <VStack
                  display={{ md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm" fontWeight="bold">{user.name}</Text>
                  <Text fontSize="xs" color="gray.600" fontWeight="bold">
                    {user.role}
                  </Text>
                </VStack>
                <Box display={{ md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}
            >
              <MenuItem onClick={handleLogout}>Cerrar Sesión</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

const SidebarWithHeader = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Obtenemos el usuario desde el contexto
  const { user, logout } = useContext(AuthContext);

  if (!user) {
    // Si no hay usuario, redireccionamos al login
    return <Navigate to="/" replace />;
  }

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={onClose}
        userRole={user.role}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} userRole={user.role} />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} user={user} logout={logout} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
};
export default SidebarWithHeader;
