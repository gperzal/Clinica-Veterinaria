import React, { useContext, useRef, useEffect } from 'react';
import {
  Box,
  Flex,
  Image,
  IconButton,
  Button,
  Stack,
  Collapse,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorMode,
  useDisclosure,
  Avatar,
  Center,
  useColorModeValue,
  Icon,
  Tooltip,
  Badge,
  useBreakpointValue,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  MoonIcon,
  SunIcon,
  QuestionIcon,
} from '@chakra-ui/icons';
import {
  FaHome,
  FaCalendarAlt,
  FaShoppingCart,
  FaBlog,
  FaEnvelope,
  FaSignInAlt,
  FaUserPlus,
} from 'react-icons/fa';
import { PiShoppingCart,PiShoppingCartFill  } from "react-icons/pi";
import { FiBell, FiSettings, FiLogOut } from 'react-icons/fi';
import { RiCustomerService2Fill } from 'react-icons/ri';
import { AuthContext } from '../modules/auth/context/AuthContext';
import clinicLogo from '../assets/img/clinic-logo.png';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../modules/catalog/context/CartContext';

export default function Navbar() {
  const { isOpen, onToggle, onClose } = useDisclosure(); 
  const { user, logout } = useContext(AuthContext);
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const menuRef = useRef(null); 

  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  const CartIcon = cartCount > 0 ? PiShoppingCartFill : PiShoppingCart;

  const displayCartCount =
    cartCount >= 100 ? '∞' : cartCount > 0 ? (cartCount > 99 ? '99+' : cartCount) : null;

  const linkHoverBg = useColorModeValue('red.100', 'gray.700');
  const linkHoverColor = useColorModeValue('red.500', 'red.300');


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
      >
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
      
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Link href="/" _hover={{ textDecoration: 'none' }}>
            <Image src={clinicLogo} alt="Clinica de Mascotas Logo" height="30px" />
          </Link>
       
          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav linkHoverBg={linkHoverBg} linkHoverColor={linkHoverColor} />
          </Flex>
        </Flex>
   
        <Stack flex={{ base: 1, md: 0 }} justify={'flex-end'} direction={'row'} >
          
            <Box position="relative">
              <Tooltip label="Ver carrito de compras">
                <IconButton
                  icon={<CartIcon />}
                  variant="ghost"
                  aria-label="Carrito"
                  onClick={() => navigate('/catalog/shopping-cart')}
                  borderRadius="full"
                  bg={useColorModeValue('gray.100', 'gray.800')}
                  _hover={{ bg: useColorModeValue('gray.200', 'gray.700') }}
                />
              </Tooltip>
              {displayCartCount && (
                <Badge
                  colorScheme="red"
                  borderRadius="full"
                  position="absolute"
                  top="-1.5"
                  right="-1.5" 
                  px={1}
                  py={0.5}
                  fontSize="0.7em"
                  zIndex={1} 
                >
                  {displayCartCount}
                </Badge>
              )}
       
            </Box>
  
          <Tooltip label="Modo Claro/Oscuro">
            <IconButton
              onClick={toggleColorMode}
              icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              variant="ghost"
              aria-label="Toggle Color Mode"
              borderRadius="full"
              bg={useColorModeValue('gray.100', 'gray.800')}
              _hover={{ bg: useColorModeValue('gray.200', 'gray.700') }}
            />
          </Tooltip>
    
          <Box display={useBreakpointValue({ base: 'none', md: 'flex' })}>

          <Tooltip label="Soporte Técnico" display={{ base: 'none', md: 'inline-flex' }}>
            <IconButton
              icon={<RiCustomerService2Fill />}
              variant="ghost"
              aria-label="Soporte Técnico"
              onClick={() => navigate('/feedback')}
              borderRadius="full"
              bg={useColorModeValue('gray.100', 'gray.800')}
              _hover={{ bg: useColorModeValue('gray.200', 'gray.700') }}
           
            />
          </Tooltip>

          <Tooltip label="Preguntas Frecuentes (FAQ)" display={{ base: 'none', md: 'inline-flex' }}>
            <IconButton
              icon={<QuestionIcon />}
              variant="ghost"
              aria-label="FAQ"
              onClick={() => navigate('/faq')}
              borderRadius="full"
              bg={useColorModeValue('gray.100', 'gray.800')}
              _hover={{ bg: useColorModeValue('gray.200', 'gray.700') }}
              mx={2}
            />
          </Tooltip>

          </Box>

          {user ? (
            <Menu>
              <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
                <Avatar size={'sm'} src={user.imageUrl} name={user.name} />
              </MenuButton>
              <MenuList>
                <br />
                <Center>
                  <Avatar size={'2xl'} src={user.imageUrl} name={user.name} />
                </Center>
                <br />
                <Center>
                  <p>Hola, {user.name}</p>
                </Center>
                <br />
                <MenuDivider />
                <MenuItem onClick={() => navigate('/dashboard/notifications')}>
                  <Icon as={FiBell} mr={2} />
                  Notificaciones
                  <Box as="span" ml="2" color="red.500" fontWeight="bold">
                    (3)
                  </Box>
                </MenuItem>
                <MenuItem onClick={() => navigate('/dashboard')}>
                  <Icon as={FiSettings} mr={2} />
                  Panel de Control
                </MenuItem>
                <MenuItem onClick={logout}>
                  <Icon as={FiLogOut} mr={2} />
                  Cerrar Sesión
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <>
              <Button
                display={{ base: 'none', md: 'inline-flex' }}
                as={Link}
                fontSize={'sm'}
                fontWeight={600}
                color={useColorModeValue('gray.700', 'white')}
                variant="outline"
                href={'/login'}
              >
                <Icon as={FaSignInAlt} mr={2} />
                Iniciar Sesión
              </Button>
              <Button
                display={{ base: 'none', md: 'inline-flex' }}
                as={Link}
                fontSize={'sm'}
                fontWeight={600}
                color={'white'}
                bg={'pink.500'}
                _hover={{ bg: 'pink.700' }}
                href={'/register'}
              >
                <Icon as={FaUserPlus} mr={2} />
                Registrarse
              </Button>
            </>
          )}
        </Stack>
      </Flex>
      <Collapse in={isOpen} animateOpacity>
      <Box ref={menuRef} bg={useColorModeValue('white', 'gray.800')} p={4}>
        <MobileNav
          user={user}
          linkHoverBg={linkHoverBg}
          linkHoverColor={linkHoverColor}
        />
      </Box>
      </Collapse>
    </Box>
  );
}

const DesktopNav = ({ linkHoverBg, linkHoverColor }) => (
  <Stack direction={'row'} spacing={4}>
    {NAV_ITEMS.map((navItem) => (
      <Link
        key={navItem.label}
        p={2}
        href={navItem.href ?? '#'}
        fontSize={'sm'}
        fontWeight={500}
        rounded={'md'}
        _hover={{ bg: linkHoverBg, color: linkHoverColor }}
        display="flex"
        alignItems="center"
      >
        <Icon as={navItem.icon} mr={2} />
        {navItem.label}
      </Link>
    ))}
  </Stack>
);

const MobileNav = ({ user, linkHoverBg, linkHoverColor }) => (
  <Stack bg={useColorModeValue('white', 'gray.800')} p={4} display={{ md: 'none' }}>
    {NAV_ITEMS.map((navItem) => (
      <Link
        key={navItem.label}
        py={2}
        href={navItem.href}
        fontSize={'md'}
        fontWeight={500}
        rounded={'md'}
        display="flex"
        alignItems="center"
        _hover={{
          textDecoration: 'none',
          bg: linkHoverBg,
          color: linkHoverColor,
        }}
      >
        <Icon as={navItem.icon} mr={2} />
        {navItem.label}
      </Link>
    ))}
    <Stack mt={4}>
      {!user && (
        <>
          <Button as={Link} href={'/login'} w="full" colorScheme="teal" leftIcon={<FaSignInAlt />}>
            Iniciar Sesión
          </Button>
          <Button
            as={Link}
            href={'/register'}
            w="full"
            colorScheme="teal"
            variant="outline"
            leftIcon={<FaUserPlus />}
          >
            Registrarse
          </Button>
        </>
      )}
    </Stack>
  </Stack>
);

const NAV_ITEMS = [
  { label: 'Home', href: '/', icon: FaHome },
  { label: 'Agendar', href: '/appointments', icon: FaCalendarAlt },
  { label: 'Catálogo', href: '/catalog', icon: FaShoppingCart },
  { label: 'Blogs', href: '/blog', icon: FaBlog },
  { label: 'Contacto', href: '/contact', icon: FaEnvelope },
];
