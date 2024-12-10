import React, { useState, useContext } from 'react';
import {   Box,   Flex,Icon,Text, Collapse,  VStack,  HStack,  Menu,  MenuButton,  MenuItem,  MenuList,  Tooltip,  useColorModeValue,  useColorMode,  Drawer,  DrawerBody,  DrawerOverlay,
  DrawerContent,  DrawerCloseButton,  IconButton,  useDisclosure,  Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import {  MoonIcon,  SunIcon,} from '@chakra-ui/icons';
import { useSwipeable } from 'react-swipeable'; 
import {  FiHome,  FiUser,  FiUsers,  FiClipboard,  FiShoppingCart,  FiSettings,  FiBell,  FiFile,  FiChevronDown,  FiChevronLeft,  FiChevronRight,  FiLogOut
} from 'react-icons/fi';
import { LuClipboardList } from "react-icons/lu";
import { BsClipboard2Pulse } from "react-icons/bs";
import { MdOutlineInventory2 } from "react-icons/md";
import { SiPetsathome } from "react-icons/si";
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { AuthContext } from '../modules/auth/context/AuthContext';

const menuSections = [
  {
    sectionName: 'Generales',
    allowedRoles: ['Cliente', 'Administrativo', 'Veterinario', 'Estilista', 'Administrador'],
    items: [
      { name: 'Dashboard', icon: FiHome, path: '/dashboard' },
      { name: 'Mi Perfil', icon: FiUser, path: '/dashboard/profile' },
      { name: 'Historial Médico', icon: BsClipboard2Pulse, path: '/dashboard/medical-history' },
      { name: 'Historial Compras', icon: FiShoppingCart, path: '/dashboard/purchase-history' },
      { name: 'Configuración', icon: FiSettings, path: '/dashboard/settings' },
    ],
  },
  {
    sectionName: 'Administrativo',
    allowedRoles: ['Administrativo', 'Veterinario', 'Administrador'],
    items: [
      { name: 'Catálogo', icon: MdOutlineInventory2, path: '/dashboard/catalog' },
      { name: 'Inventario', icon: FiShoppingCart, path: '/dashboard/inventory' },
      { name: 'Gestión de Citass', icon: LuClipboardList , path: '/dashboard/coming-soon' },
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

const SidebarContent = ({ userRole, isCollapsed, toggleCollapse, ...rest }) => {
  return (
    <Box
      transition="0.3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={isCollapsed ? 16 : { base: 16, md: 60 }}
      pos="fixed"
      h="full"
      overflowY="auto"
      {...rest}
    >
      <Flex
        h="20"
        alignItems="center"
        mx="4"
        justifyContent="space-between"
        position="relative"
      >
        {!isCollapsed && (
          <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold" ml="10">
             Menú
          </Text>
        )}
        <IconButton
          position="absolute"
          right={0}
          aria-label="Toggle sidebar"
          icon={isCollapsed ? <FiChevronRight /> : <FiChevronLeft />}
          onClick={toggleCollapse}
          variant="ghost"
          display={{ base: 'none', md: 'flex' }}
        />
      </Flex>
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
          <Icon as={FiChevronDown} />
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


const MobileNav = ({ user, logout, isCollapsed, ...rest }) => {
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode(); 
  const location = window.location.pathname;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navigateToHome = () => {
    navigate('/');
  };

  // Mapear rutas con títulos legibles
  const breadcrumbItems = {
    '/dashboard': 'Dashboard',
    '/dashboard/profile': 'Mi Perfil',
    '/dashboard/purchase-history': 'Historial de Compras',
    '/dashboard/settings': 'Configuración',
    '/dashboard/catalog': 'Catálogo',
    '/dashboard/inventory': 'Inventario',
    '/dashboard/reports': 'Reportes',
    '/dashboard/appointments': 'Citas',
    '/dashboard/coming-soon': 'Próximamente',
    '/dashboard/users': 'Usuarios',
    '/dashboard/roles': 'Roles',
    '/dashboard/notifications': 'Notificaciones',
  };

  // Obtener rutas segmentadas
  const segments = location.split('/').filter(Boolean);

  return (
    <Flex
      ml={{ base: 0, md: isCollapsed ? 16 : 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent="space-between"
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex="1000"
      {...rest}
    >
      {/* Breadcrumb */}
      <Breadcrumb>
        {segments.map((segment, index) => {
          const path = `/${segments.slice(0, index + 1).join('/')}`;
          return (
            <BreadcrumbItem key={path}>
              <BreadcrumbLink
                href={path}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(path);
                }}
              >
                {breadcrumbItems[path] || segment}
              </BreadcrumbLink>
            </BreadcrumbItem>
          );
        })}
      </Breadcrumb>

      <Flex alignItems="center">
        {/* Botón para Modo Claro/Oscuro */}
        <Tooltip label="Modo Claro/Oscuro">
          <IconButton
            onClick={toggleColorMode}
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            variant="ghost"
            aria-label="Toggle Color Mode"
            borderRadius="full"
            bg={useColorModeValue('gray.100', 'gray.800')}
            _hover={{ bg: useColorModeValue('gray.200', 'gray.700') }}
            mr="4"
          />
        </Tooltip>

        {/* Menú de Usuario */}
        <Menu>
          <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
            <HStack>
              <VStack alignItems="flex-start" spacing="1px" ml="2">
                <Text fontSize="sm" fontWeight="bold">{user.name}</Text>
                <Text fontSize="xs" color="gray.600" fontWeight="bold">{user.role}</Text>
              </VStack>
              <Box>
                <FiChevronDown />
              </Box>
            </HStack>
          </MenuButton>
          <MenuList
            bg={useColorModeValue('white', 'gray.900')}
            borderColor={useColorModeValue('gray.200', 'gray.700')}
          >
            <MenuItem onClick={() => navigate('/dashboard/notifications')}>
              <Icon as={FiBell} mr={2} />
              Notificaciones
              <Box as="span" ml="2" color="red.500" fontWeight="bold">
                (3)
              </Box>
            </MenuItem>
            <MenuItem icon={<SiPetsathome />} onClick={navigateToHome}>
              Volver a Inicio
            </MenuItem>
            <MenuItem icon={<FiLogOut />} onClick={handleLogout}>
              Cerrar Sesión
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};






const SidebarWithHeader = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, logout } = useContext(AuthContext);
  const swipeHandlers = useSwipeable({
    onSwipedLeft: onClose,
    onSwipedRight: onOpen,
    preventDefaultTouchmoveEvent: true,
  });
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return (
    <Box {...swipeHandlers} minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        userRole={user.role}
        isCollapsed={isCollapsed}
        toggleCollapse={() => setIsCollapsed(!isCollapsed)}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent
          maxW="4rem" 
          bg={useColorModeValue('gray.900', 'gray.800')}
        >
          <DrawerCloseButton mt="4" />
          <DrawerBody p={0}>
            <SidebarContent
              userRole={user.role}
              isCollapsed={true}
              toggleCollapse={() => {}}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <MobileNav user={user} logout={logout} isCollapsed={isCollapsed} />
      <Box
        ml={{ base: 0, md: isCollapsed ? 16 : 60 }} 
        transition="margin 0.3s ease"
      >
        <Box
          pt="20"
          p="4"
        >
          <Box mt={20}>    {children}</Box>
      
        </Box>
      </Box>
    </Box>
  );
};




export default SidebarWithHeader;
