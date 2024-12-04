import React, { useState } from "react";
import ChatBubble from "./chatbot/ChatBubble";
import ChatWindow from "./chatbot/ChatWindow";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(0);

  return (
    <>
      <ChatBubble
        onClick={() => {
          setIsOpen(true);
          setUnreadMessages(0); // Resetear notificaciones al abrir
        }}
        unreadMessages={unreadMessages}
      />
      <ChatWindow
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onNewMessage={() => setUnreadMessages((prev) => prev + 1)} // Incrementar contador
      />
    </>
  );
};

export default Chatbot;
