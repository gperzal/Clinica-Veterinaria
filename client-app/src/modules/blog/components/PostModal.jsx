import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Image,
  Text,
  VStack,
  HStack,
  IconButton,
  Button,
  Textarea,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaHeart, FaShare } from "react-icons/fa";

const PostModal = ({
  isOpen,
  onClose,
  title,
  content,
  image,
  author,
  date,
  likes,
  comments = [],
}) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  const commentBgColor = useColorModeValue("gray.100", "gray.700");
  const replyBgColor = useColorModeValue("gray.200", "gray.600");
  const borderColor = useColorModeValue("gray.300", "gray.600");

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl">
      <ModalOverlay />
      <ModalContent bg={bgColor} color={textColor}>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Image src={image} alt={title} borderRadius="md" mb={4} />
          <HStack justifyContent="space-between" mb={4}>
            <VStack align="start">
              <Text fontWeight="bold">{author}</Text>
              <Text fontSize="sm" color="gray.500">
                {date}
              </Text>
            </VStack>
            <HStack spacing={4}>
              <IconButton aria-label="Me gusta" icon={<FaHeart />} colorScheme="red" />
              <Text>{likes}</Text>
              <IconButton aria-label="Compartir" icon={<FaShare />} />
            </HStack>
          </HStack>
          <Text mb={6}>{content}</Text>

          {/* Comentarios */}
          <VStack align="start" spacing={4}>
            {Array.isArray(comments) && comments.length > 0 ? (
              comments.map((comment) => (
                <Box
                  key={comment.id}
                  bg={commentBgColor}
                  p={4}
                  borderRadius="md"
                  w="full"
                  border="1px solid"
                  borderColor={borderColor}
                >
                  <HStack justifyContent="space-between">
                    <Text fontWeight="bold">{comment.author}</Text>
                    <Text fontSize="sm" color="gray.500">
                      {comment.date}
                    </Text>
                  </HStack>
                  <Text mt={2}>{comment.content}</Text>

                  {/* Respuestas (replies) */}
                  {Array.isArray(comment.replies) && comment.replies.length > 0 && (
                    <VStack
                      align="start"
                      spacing={2}
                      mt={4}
                      pl={4}
                      borderLeft="2px solid"
                      borderColor={borderColor}
                    >
                      {comment.replies.map((reply) => (
                        <Box
                          key={reply.id}
                          bg={replyBgColor}
                          p={2}
                          borderRadius="md"
                          w="full"
                          border="1px solid"
                          borderColor={borderColor}
                        >
                          <HStack justifyContent="space-between">
                            <Text fontWeight="bold">{reply.author}</Text>
                            <Text fontSize="sm" color="gray.500">
                              {reply.date}
                            </Text>
                          </HStack>
                          <Text mt={1}>{reply.content}</Text>
                        </Box>
                      ))}
                    </VStack>
                  )}
                </Box>
              ))
            ) : (
              <Text color="gray.500">No hay comentarios aún.</Text>
            )}
          </VStack>

          <Textarea placeholder="Escribe un comentario..." mt={6} />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3}>
            Publicar comentario
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PostModal;
