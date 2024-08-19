import React from 'react';
import { Flex, Icon, Link } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';


const NavItem = ({ icon, children, path, ...rest }) => {
  const navigate = useNavigate();

  return (
    <Link
      href={path}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
      onClick={(e) => {
        e.preventDefault();
        navigate(path);
      }}>
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

export default NavItem;
