import React from "react";
import {
  Box,
  Image,
  Text,
  Heading,
  HStack,
  IconButton,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaHeart, FaComment, FaShare } from "react-icons/fa";

const BlogCard = ({ title, excerpt, image, date, likes, commentsList, author, onOpenPost }) => {
  // Colores dinámicos para modo claro/oscuro
  const bgCard = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");
  const excerptColor = useColorModeValue("gray.600", "gray.300");
  const dateColor = useColorModeValue("gray.500", "gray.400");

  // Contar comentarios principales y respuestas
  const totalComments =
    commentsList?.reduce(
      (count, comment) => count + (comment.replies ? comment.replies.length : 0) + 1,
      0
    ) || 0;

  return (
    <Box
      bg={bgCard}
      borderRadius="lg"
      boxShadow="md"
      overflow="hidden"
      _hover={{ boxShadow: "xl", transform: "scale(1.02)", transition: "0.2s" }}
      width="400px" 
      height="500px" 
      display="flex"
      flexDirection="column" 
      justifyContent="space-between" 
    >

      <Image
        src={image}
        alt={title}
        width="100%"
        height="250px"
        objectFit="cover"
        fallbackSrc="https://via.placeholder.com/300x150"
      />
      <Box p={4} flex="1">
        <Heading as="h3" size="md" mb={2} color={textColor} noOfLines={2}>
          {title}
        </Heading>
        <Text fontSize="sm" color={excerptColor} noOfLines={3}>
          {excerpt}
        </Text>
      </Box>
      <Box p={4}>
        <HStack justifyContent="space-between" mt={4}>
          <HStack spacing={4}>
            <IconButton
              aria-label="Me gusta"
              icon={<FaHeart />}
              variant="ghost"
              colorScheme="red"
            />
            <Text color={textColor}>{likes}</Text>
            <IconButton
              aria-label="Comentarios"
              icon={<FaComment />}
              variant="ghost"
              colorScheme="blue"
            />
            <Text color={textColor}>{totalComments}</Text>
            <IconButton
              aria-label="Compartir"
              icon={<FaShare />}
              variant="ghost"
            />
          </HStack>
          <Text fontSize="xs" color={dateColor}>
            {date}
          </Text>
        </HStack>
        <HStack justifyContent="space-between" mt={4}>
          <Text fontSize="sm" color={excerptColor}>
            Por {author}
          </Text>
          <Button colorScheme="blue" size="sm" onClick={onOpenPost}>
            Leer más
          </Button>
        </HStack>
      </Box>
    </Box>
  );
};

export default BlogCard;
