import React, { useState, useEffect } from "react";
import "./chat.css";

export default function ChatBody({socket}) {
  const [messagesReceived, setMessagesReceived] = useState([]);

  useEffect(() => {
    socket.on("last_messages", (data) => {
      setMessagesReceived(data.messageList);
    });
    socket.on('message_received', (data) => {
      setMessagesReceived(data.messageList);
    });
    return () => {
      socket.off("last_messages", (data) => {
        setMessagesReceived(data.messageList);
      })
      socket.off("message_received", (data) => {
        setMessagesReceived(data.messageList);
      });
    }
  }, []);

  return (
    <div className="chat-body">{messagesReceived ? messagesReceived.map((message, msgIndex) => (
      <div key={msgIndex}>
        <p>{message.username}</p><br />
        <p>{message.messageText}</p>
      </div>
    )) : "No messages"}
    </div>
  )
}