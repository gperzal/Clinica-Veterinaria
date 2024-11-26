import React, { useState, useContext } from 'react';
import {
  Box,
  CloseButton,
  Flex,
  Icon,
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
  Tooltip,
  useColorModeValue,
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
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { AuthContext } from '../modules/auth/context/AuthContext';

const menuSections = [
  {
    sectionName: 'Generales',
    allowedRoles: ['Cliente', 'Administrativo', 'Veterinario', 'Estilista', 'Administrador'],
    items: [
      { name: 'Dashboard', icon: FiHome, path: '/dashboard' },
      { name: 'Mi Perfil', icon: FiUser, path: '/dashboard/profile' },
      { name: 'Historial Médico', icon: FiClipboard, path: '/dashboard/coming-soon' },
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
    sectionName: 'Especialista',
    allowedRoles: ['Veterinario', 'Estilista', 'Administrador'],
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

const SidebarContent = ({ onClose, userRole, isCollapsed, toggleCollapse, ...rest }) => {
  return (
    <Box
      transition="0.3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={isCollapsed ? 16 : { base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      overflowY="auto"
      {...rest}
    >
      {/* Contenedor del título y botón de colapsar */}
      <Flex
        h="20"
        alignItems="center"
        mx="4"
        justifyContent="space-between"
        position="relative"
      >
        {/* Título del sidebar */}
        {!isCollapsed && (
          <Link to="/">
          <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
            Dashboard
          </Text>
          </Link>
        )}

        {/* Botón de colapsar */}
        <IconButton
          position="absolute"
          right={0} // Alineado al final del contenedor del título
          aria-label="Toggle sidebar"
          icon={isCollapsed ? <FiChevronRight /> : <FiChevronLeft />}
          onClick={toggleCollapse}
          variant="ghost"
        />
      </Flex>

      {/* Renderizado de los menús según roles */}
      {menuSections
        .filter((section) => section.allowedRoles.includes(userRole))
        .map((section) => (
          <MenuSection
            key={section.sectionName}
            section={section}
            isCollapsed={isCollapsed}
          />
        ))}
    </Box>
  );
};



const MenuSection = ({ section, isCollapsed }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Box mt={4}>
      {!isCollapsed && (
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
      )}
      <Collapse in={isOpen || isCollapsed} animateOpacity>
        <VStack align="start" spacing={0} mt={2}>
          {section.items.map((link) => (
            <NavItem key={link.name} icon={link.icon} path={link.path} isCollapsed={isCollapsed}>
              {link.name}
            </NavItem>
          ))}
        </VStack>
      </Collapse>
    </Box>
  );
};

const NavItem = ({ icon, children, path, isCollapsed, ...rest }) => {
  return (
    <Link to={path} style={{ textDecoration: 'none', width: '100%' }}>
      <Tooltip label={children} isDisabled={!isCollapsed} placement="right">
        <Flex
          align="center"
          p="4"
          pl={isCollapsed ? 0 : '6'}
          justifyContent={isCollapsed ? 'center' : 'flex-start'}
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
              mr={!isCollapsed ? '4' : 0}
              fontSize="16"
              _groupHover={{
                color: 'white',
              }}
              as={icon}
            />
          )}
          {!isCollapsed && children}
        </Flex>
      </Tooltip>
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
  const [isCollapsed, setIsCollapsed] = useState(false);

  const { user, logout } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={onClose}
        userRole={user.role}
        isCollapsed={isCollapsed}
        toggleCollapse={() => setIsCollapsed(!isCollapsed)}
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
          <SidebarContent
            onClose={onClose}
            userRole={user.role}
            isCollapsed={isCollapsed}
            toggleCollapse={() => setIsCollapsed(!isCollapsed)}
          />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} user={user} logout={logout} />
      <Box ml={{ base: 0, md: isCollapsed ? 16 : 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
};

export default SidebarWithHeader;
