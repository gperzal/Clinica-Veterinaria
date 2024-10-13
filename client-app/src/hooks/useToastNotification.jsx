// src/hooks/useToastNotification.jsx
import { useToast } from '@chakra-ui/react';

const useToastNotification = () => {
  const toast = useToast();

  const showInfoToast = ({ title, description }) => {
    toast({
      title,
      description,
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  }

  const showErrorToast = ({ title, error }) => {
    toast({
      title,
      description: error.message,
      status: 'error',
      duration: 3000,
      isClosable: true,
    });
  }

  const showSuccessToast = ({ title, description }) => {
    toast({
      title,
      description,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  }


  return { showInfoToast, showErrorToast, showSuccessToast };


};

export default useToastNotification;