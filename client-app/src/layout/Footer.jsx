import React from 'react';
import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
  Link,
  Icon,
} from '@chakra-ui/react';
import { FaInstagram, FaFacebook, FaTiktok, FaTwitter } from 'react-icons/fa';
import { RiCustomerService2Fill } from 'react-icons/ri';
import { QuestionIcon } from '@chakra-ui/icons';

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
    >
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
      >
        <Text textAlign={{ base: 'center', md: 'left' }}>
          © 2024 Clinica Veterinaria. Todos los derechos reservados
        </Text>
        <Stack direction={'row'} spacing={6}>
          <SocialButton label={'Facebook'} href={'#'}>
            <FaFacebook />
          </SocialButton>
          <SocialButton label={'Instagram'} href={'#'}>
            <FaInstagram />
          </SocialButton>
          <SocialButton label={'TikTok'} href={'#'}>
            <FaTiktok />
          </SocialButton>
          <SocialButton label={'X (Twitter)'} href={'#'}>
            <FaTwitter />
          </SocialButton>
        </Stack>
        <Stack
          direction={'row'}
          spacing={6}
          display={{ base: 'flex', md: 'none' }}
        >
          <Link href="/faq" display="flex" alignItems="center">
            <Icon as={QuestionIcon} mr={2} />
            <Text>FAQ</Text>
          </Link>
          <Link href="/feedback" display="flex" alignItems="center">
            <Icon as={RiCustomerService2Fill} mr={2} />
            <Text>Feedback</Text>
          </Link>
        </Stack>
      </Container>
    </Box>
  );
}
