// src/hooks/useToastNotification.jsx
import { useToast } from '@chakra-ui/react';

const useToastNotification = () => {
  const toast = useToast();

  const showToast = ({ title, description, status = 'info' }) => {
    toast({
      title,
      description,
      status,
      duration: 3000,
      isClosable: true,
    });
  };

  return showToast;
};

export default useToastNotification;
