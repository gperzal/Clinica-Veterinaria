import React, { useState } from 'react';
import {
  Box, Text, Button, VStack, IconButton, useColorModeValue,
  Input, Divider, Stack, useToast, Grid, Flex, Center
} from '@chakra-ui/react';
import { FaUpload, FaDownload, FaTrashAlt, FaFilePdf, FaFileImage } from 'react-icons/fa';

const Documents = () => {
  const [documents, setDocuments] = useState([
    { id: 1, name: "Examen de Sangre.pdf", type: "pdf" },
    { id: 2, name: "Radiografía.jpg", type: "image" },
  ]);
  const [file, setFile] = useState(null);
  const toast = useToast();
  const bgColor = useColorModeValue("gray.50", "gray.800");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    const validTypes = ["image/jpeg", "image/png", "application/pdf", "image/tiff"];
    if (selectedFile && validTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
    } else {
      toast({
        title: "Formato no válido",
        description: "Solo se permiten archivos JPEG, PNG, PDF o TIFF.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleUpload = () => {
    if (file) {
      const fileType = file.type.includes("image") ? "image" : "pdf";
      setDocuments([...documents, { id: Date.now(), name: file.name, type: fileType }]);
      setFile(null);
      toast({
        title: "Documento subido",
        description: `El documento ${file.name} se ha subido con éxito.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Seleccione un archivo",
        description: "Debe seleccionar un archivo antes de subir.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDownload = (document) => {
    toast({
      title: `Descargando ${document.name}`,
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleDelete = (documentId) => {
    setDocuments(documents.filter((doc) => doc.id !== documentId));
    toast({
      title: "Documento eliminado",
      status: "error",
      duration: 2000,
      isClosable: true,
    });
  };

  const renderFileIcon = (type) => {
    return type === "pdf" ? (
      <FaFilePdf size="3em" color="red" />
    ) : (
      <FaFileImage size="3em" color="teal" />
    );
  };

  return (
    <Box p={6} bg={bgColor} borderRadius="lg" shadow="md">
      <Flex justify="space-between" align="center" mb={4}>
        <Text fontSize="xl" fontWeight="bold" color="teal.500">
          Gestión de Documentos
        </Text>
        <Text fontSize="sm" color="gray.500">Total: {documents.length}</Text>
      </Flex>

      {/* Carga de Nuevo Documento */}
      <VStack align="start" spacing={4} mb={6}>
        <Stack direction={{ base: "column", md: "row" }} spacing={4} w="full">
          <Input
            type="file"
            variant="outline"
            onChange={handleFileChange}
            placeholder="Seleccionar archivo"
            accept="image/jpeg, image/png, application/pdf, image/tiff"
          />
          <Button leftIcon={<FaUpload />} colorScheme="teal" onClick={handleUpload}>
            Subir Documento
          </Button>
        </Stack>
        <Divider />
      </VStack>

      {/* Vista en Tarjetas de Documentos */}
      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr", lg: "repeat(6, 1fr)" }} gap={4}>
        {documents.map((document) => (
          <Box key={document.id} p={4} borderWidth="1px" borderRadius="lg" shadow="md" bg={useColorModeValue("white", "gray.700")}>
            <Center mb={3}>
              {renderFileIcon(document.type)}
            </Center>
            <Text fontWeight="bold" textAlign="center" isTruncated mb={2}>{document.name}</Text>
            <Stack direction="row" spacing={3} justify="center" mt={2}>
              <IconButton
                icon={<FaDownload />}
                colorScheme="green"
                variant="outline"
                aria-label="Descargar"
                onClick={() => handleDownload(document)}
              />
              <IconButton
                icon={<FaTrashAlt />}
                colorScheme="red"
                variant="outline"
                aria-label="Eliminar"
                onClick={() => handleDelete(document.id)}
              />
            </Stack>
          </Box>
        ))}
        
      </Grid>

    </Box>
  );
};

export default Documents;
