import React, { useEffect, useRef } from "react";
import "./Messages.css";

import Message from "./Message";

function Messages({ messages }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="Messages">
      {messages?.map((message) => {
        return <Message message={message} />;
      })}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default Messages;
