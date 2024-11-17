// src/components/ui/timeline.jsx
import React from 'react';
import { Box, Flex, Text, VStack } from '@chakra-ui/react';

export const TimelineRoot = ({ children, ...props }) => (
  <VStack spacing={4} align="stretch" {...props}>
    {children}
  </VStack>
);

export const TimelineItem = ({ children }) => (
  <Flex>
    {children}
  </Flex>
);

export const TimelineConnector = ({ children }) => (
  <Flex flexDirection="column" alignItems="center" mr={4}>
    <Box
      w="40px"
      h="40px"
      borderRadius="full"
      bg="blue.500"
      color="white"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {children}
    </Box>
    <Box w="2px" h="full" bg="gray.200" my={2} />
  </Flex>
);

export const TimelineContent = ({ children }) => (
  <Box flex={1}>
    {children}
  </Box>
);

export const TimelineTitle = ({ children, ...props }) => (
  <Text fontWeight="bold" {...props}>{children}</Text>
);

export const TimelineDescription = ({ children, ...props }) => (
  <Text color="gray.600" fontSize="sm" {...props}>{children}</Text>
);