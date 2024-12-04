import React from "react";
import { IconButton, Badge, Box } from "@chakra-ui/react";
import { FaCommentDots } from "react-icons/fa";

const ChatBubble = ({ onClick, unreadMessages }) => {
  return (
    <Box position="fixed" bottom="1.5rem" right="1.5rem" zIndex="1000">
      <IconButton
        icon={<FaCommentDots />}
        onClick={onClick}
        colorScheme="blue"
        size="lg"
        isRound
        boxShadow="lg"
        aria-label="Abrir chatbot"
      />
      {unreadMessages > 0 && (
        <Badge
          colorScheme="red"
          position="absolute"
          top="-0.25rem"
          right="-0.25rem"
          borderRadius="full"
          px={2}
        >
          {unreadMessages}
        </Badge>
      )}
    </Box>
  );
};

export default ChatBubble;
