import React, { useState } from "react";
import { Box, SimpleGrid, Heading, Button, HStack, useColorModeValue } from "@chakra-ui/react";
import BlogCard from "../components/BlogCard";
import PostModal from "../components/PostModal";

// Importar datos del archivo JSON
import samplePosts from "../data/samplePosts.json";

const BlogPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activePost, setActivePost] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;

  const bgColor = useColorModeValue("gray.100", "gray.900");
  const textColor = useColorModeValue("gray.800", "white");

  const openPostModal = (post) => {
    setActivePost(post);
    setIsModalOpen(true);
  };

  const closePostModal = () => {
    setIsModalOpen(false);
    setActivePost(null);
  };

  // Calcular las páginas
  const totalPages = Math.ceil(samplePosts.length / postsPerPage);
  const paginatedPosts = samplePosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  return (
    <Box bg={bgColor} color={textColor} minH="100vh" p={6}>
      <Heading as="h1" size="lg" mb={6} textAlign="center" color="teal.400">
        Blog Veterinario
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} justifyItems="center">
        {paginatedPosts.map((post) => (
          <BlogCard
            key={post.id}
            title={post.title}
            excerpt={post.excerpt}
            image={post.image}
            date={post.date}
            likes={post.likes}
            commentsList={post.commentsList}
            author={post.author}
            onOpenPost={() => openPostModal(post)}
          />
        ))}
      </SimpleGrid>

      {/* Paginador */}
      <HStack justify="center" mt={8} spacing={4}>
        <Button
          colorScheme="teal"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          isDisabled={currentPage === 1}
        >
          Anterior
        </Button>
        <Box fontWeight="bold" fontSize="lg">
          Página {currentPage} de {totalPages}
        </Box>
        <Button
          colorScheme="teal"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          isDisabled={currentPage === totalPages}
        >
          Siguiente
        </Button>
      </HStack>

      {activePost && (
        <PostModal
          isOpen={isModalOpen}
          onClose={closePostModal}
          title={activePost.title}
          content={activePost.content}
          image={activePost.image}
          author={activePost.author}
          date={activePost.date}
          likes={activePost.likes}
          comments={activePost.commentsList}
        />
      )}
    </Box>
  );
};

export default BlogPage;
