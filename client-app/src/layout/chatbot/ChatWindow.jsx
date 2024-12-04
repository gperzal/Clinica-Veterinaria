import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Text,
  HStack,
  Input,
  Button,
  VStack,
  IconButton,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FaTimes, FaPaperPlane } from "react-icons/fa";
import { processUserMessage } from "./data/chatLogic";

const ChatWindow = ({ isOpen, onClose, onNewMessage }) => {
  // Hooks
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: `
        <b>¡Hola!</b> Soy PawBot, tu asistente virtual veterinario.<br />
        ¿En qué puedo ayudarte?<br />
        <ul>
          <li>Productos disponibles en nuestra tienda.</li>
          <li>Horarios de atención.</li>
          <li>Servicios ofrecidos.</li>
          <li>Información de citas médicas.</li>
        </ul>
      `,
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Calcular estilos responsivos
  const chatWidth = useBreakpointValue({ base: "90%", sm: "25rem" });
  const chatHeight = useBreakpointValue({ base: "90vh", sm: "45rem" });

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { id: messages.length + 1, text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    const botResponse = await processUserMessage(input);
    const botMessage = { id: messages.length + 2, text: botResponse, sender: "bot" };
    setMessages((prev) => [...prev, botMessage]);

    if (onNewMessage) onNewMessage(); // Incrementar contador de mensajes
  };

  if (!isOpen) return null;

  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");

  return (
    <Box
      position="fixed"
      bottom="2rem"
      right="2rem"
      width={chatWidth} // Ajuste dinámico de ancho
      maxH={chatHeight} // Ajuste dinámico de altura
      bg={bgColor}
      color={textColor}
      borderRadius="lg"
      boxShadow="lg"
      overflow="hidden"
      zIndex="1000"
      display="flex"
      flexDirection="column"
    >
      {/* Header */}
      <HStack justify="space-between" p={3} bg="blue.600" color="white">
        <Text fontWeight="bold">PawBot Asistente Virtual</Text>
        <IconButton
          icon={<FaTimes />}
          size="sm"
          onClick={onClose}
          variant="ghost"
          colorScheme="whiteAlpha"
          aria-label="Cerrar chatbot"
        />
      </HStack>

      {/* Chat Messages */}
      <VStack
        p={3}
        spacing={4}
        overflowY="auto"
        flex="1"
        bg={useColorModeValue("gray.50", "gray.700")}
        align="stretch"
      >
        {messages.map((message) => (
          <Box
            key={message.id}
            alignSelf={message.sender === "user" ? "flex-end" : "flex-start"}
            bg={message.sender === "user" ? "blue.500" : "gray.500"}
            color="white"
            px={4}
            py={2}
            borderRadius="lg"
            maxW="90%"
            wordBreak="break-word"
          >
            {message.sender === "bot" ? (
              <div
                dangerouslySetInnerHTML={{ __html: message.text }}
                style={{
                  whiteSpace: "normal",
                  margin: "0 auto",
                  padding: "5px 10px",
                }}
              />
            ) : (
              <Text>{message.text}</Text>
            )}
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </VStack>

      {/* Input */}
      <HStack p={3} borderTop="1px solid" borderColor="gray.200">
        <Input
          placeholder="Escribe un mensaje..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          bg={useColorModeValue("gray.100", "gray.600")}
        />
        <Button
          onClick={handleSend}
          colorScheme="blue"
          rightIcon={<FaPaperPlane />}
        >
          Enviar
        </Button>
      </HStack>
    </Box>
  );
};

export default ChatWindow;
