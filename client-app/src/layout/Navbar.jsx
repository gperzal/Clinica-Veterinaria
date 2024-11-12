// client-app/src/layout/Navbar.jsx
import React, { useContext } from 'react';
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
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  MoonIcon,
  SunIcon,
  QuestionIcon,
} from '@chakra-ui/icons';
import { FiBell, FiSettings, FiLogOut } from 'react-icons/fi';
import { PiShoppingCart, PiShoppingCartFill } from 'react-icons/pi';
import { RiCustomerService2Fill } from 'react-icons/ri';
import { AuthContext } from '../modules/auth/context/AuthContext';
import clinicLogo from '../assets/img/clinic-logo.png';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../modules/catalog/context/CartContext'; // Importa useCart

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();
  const { user, logout } = useContext(AuthContext);
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();

  const { getCartCount } = useCart(); // Obtén getCartCount del contexto del carrito
  const cartCount = getCartCount(); // Obtén el conteo actual de productos en el carrito

  // Determina el icono a usar según si el carrito está vacío o no
  const CartIcon = cartCount > 0 ? PiShoppingCartFill : PiShoppingCart;

  // Aplica un tope de 99 al contador y muestra '∞' si es 100 o más
  const displayCartCount =
    cartCount >= 100 ? '∞' : cartCount > 0 ? (cartCount > 99 ? '99+' : cartCount) : null;

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
            <DesktopNav />
          </Flex>
        </Flex>
        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={3}
        >
          {/* Carrito de Compras */}
          <Box position="relative">
            <Tooltip label="Ver carrito de compras" aria-label="Carrito">
              <IconButton
                icon={<CartIcon />}
                variant="ghost"
                aria-label="Carrito"
                onClick={() => navigate('/catalog/shopping-cart')}
                display={{ base: 'inline-flex', md: 'inline-flex' }}
                borderColor={useColorModeValue('gray.200', 'gray.700')}
                borderRadius="full"
                padding="8px"
                bg={useColorModeValue('gray.100', 'gray.800')}
                _hover={{ bg: useColorModeValue('gray.200', 'gray.700') }}
              />
            </Tooltip>
            {/* Badge de contador de productos */}
            {displayCartCount && (
              <Badge
                colorScheme="red"
                borderRadius="full"
                position="absolute"
                top="-1"
                right="-1"
                px={1}
                py={0.5}
                fontSize="0.7em"
              >
                {displayCartCount}
              </Badge>
            )}
          </Box>

          {/* Otros Iconos y Botones */}
          <Tooltip label="Danos tu opinión o reporta un problema">
            <IconButton
              icon={<RiCustomerService2Fill />}
              variant="ghost"
              aria-label="Feedback"
              onClick={() => {
                navigate('/feedback');
              }}
              display={{ base: 'none', md: 'inline-block' }}
              borderColor={useColorModeValue('gray.200', 'gray.700')}
              borderRadius="full"
              padding="12px"
              bg={useColorModeValue('gray.100', 'gray.800')}
              _hover={{
                bg: useColorModeValue('gray.200', 'gray.700'),
              }}
            />
          </Tooltip>

          <Tooltip label="Preguntas Frecuentes" aria-label="FAQ">
            <IconButton
              icon={<QuestionIcon />}
              variant="ghost"
              aria-label="Mesa de Ayuda"
              onClick={() => navigate('/faq')}
              display={{ base: 'none', md: 'inline-block' }}
              borderColor={useColorModeValue('gray.200', 'gray.700')}
              borderRadius="full"
              pb="3px"
              bg={useColorModeValue('gray.100', 'gray.800')}
              _hover={{
                bg: useColorModeValue('gray.200', 'gray.700'),
              }}
            />
          </Tooltip>

          <Button
            onClick={toggleColorMode}
            borderColor={useColorModeValue('gray.200', 'gray.700')}
            borderRadius="full"
            padding="6px"
            bg={useColorModeValue('gray.100', 'gray.800')}
            _hover={{
              bg: useColorModeValue('gray.200', 'gray.700'),
            }}
          >
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button>
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
                as={Link}
                fontSize={'sm'}
                display={{ base: 'none', md: 'inline-flex' }}
                fontWeight={600}
                color={'neutral.600'}
                borderRadius={'full'}
                _hover={{ bg: 'blue.900', color: 'white' }}
                href={'/login'}
              >
                Iniciar Sesión
              </Button>
              <Button
                as={Link}
                fontSize={'sm'}
                display={{ base: 'none', md: 'inline-flex' }}
                fontWeight={600}
                color={'white'}
                bg={'pink.200'}
                borderRadius={'full'}
                _hover={{ bg: 'pink.700', color: 'white' }}
                href={'/register'}
              >
                Registrarse
              </Button>
            </>
          )}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav user={user} logout={logout} />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');

  return (
    <Stack direction={'row'} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Link
            p={2}
            href={navItem.href ?? '#'}
            fontSize={'sm'}
            fontWeight={500}
            color={linkColor}
            _hover={{
              textDecoration: 'none',
              color: linkHoverColor,
            }}
          >
            {navItem.label}
          </Link>
        </Box>
      ))}
    </Stack>
  );
};

const MobileNav = ({ user, logout }) => {
  return (
    <Stack bg={useColorModeValue('white', 'gray.800')} p={4} display={{ md: 'none' }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
      {!user && (
        <>
          <Button as={Link} href={'/login'} w="full" mt={4} colorScheme="teal">
            Iniciar Sesión
          </Button>
          <Button as={Link} href={'/register'} w="full" mt={4} colorScheme="teal" variant="outline">
            Registrarse
          </Button>
        </>
      )}
    </Stack>
  );
};

const MobileNavItem = ({ label, href }) => {
  return (
    <Link
      py={2}
      href={href}
      display={'block'}
      _hover={{ textDecoration: 'none' }}
      fontWeight={600}
      color={useColorModeValue('gray.600', 'gray.200')}
    >
      {label}
    </Link>
  );
};

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Agendar', href: '/appointments' },
  { label: 'Catálogo', href: '/catalog' },
  { label: 'Blogs', href: '/coming-soon' },
  { label: 'Contacto', href: '/contact' },
];
