import React, { useEffect } from "react";
import { socket } from "../../../app/socket";
import ChatBody from "./chat-body";
import ChatFooter from "./chat-footer";
import "./chat.css";

export default function Chat() {
  useEffect(() => {
    socket.connect();
    socket.on("connection", () => {
      console.log("Connected to socket");
    });
    socket.on("disconnect", () => {
      console.log("Disconnected from socket")
    });
    return () => {
      socket.disconnect();
      socket.off("connection", () => {
        console.log("Connected to socket");
      });
      socket.off("disconnected", () => {
        console.log("Disconnected from socket")
      });
    }
  }, []);
  return (
    <div id="chat">
      <div>Chat</div>
      <ChatBody socket={socket} />
      <ChatFooter socket={socket} />
    </div>
  )
}