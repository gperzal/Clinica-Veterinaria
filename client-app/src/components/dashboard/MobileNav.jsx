// src/components/dashboard/MobileNav.jsx
import React from 'react';
import {
  Flex,
  IconButton,
  HStack,
  VStack,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Avatar,
  Box,
  Text,
} from '@chakra-ui/react';
import { FiMenu, FiBell, FiChevronDown, FiSettings, FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';



const MobileNav = ({ onOpen }) => {
  const navigate = useNavigate();
 
  return (
    <Flex
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}>
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
                <Avatar size={'sm'} />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2">
                  <Text fontSize="sm">Usuario</Text>
                  <Text fontSize="xs" color="gray.600">
                    Cliente
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
              <MenuItem icon={<FiSettings />} onClick={() => navigate('/dashboard/settings')}>
                Configuración
              </MenuItem>
              <MenuDivider />
              <MenuItem icon={<FiLogOut />} onClick={() => navigate('/logout')}>
                Cerrar Sesión
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

export default MobileNav;
