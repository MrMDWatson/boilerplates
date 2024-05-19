import React, {useState} from "react";

export default function ChatFooter({socket}) {
  const [messageToSend, setMessageToSend] = useState("");

  function sendMessage() {
    socket.emit("send_message", { message: messageToSend });
    setMessageToSend("");
  }
  
  return (
    <div>
      <input
        type="text"
        onChange={(e) => setMessageToSend(e.target.value)}
        value={messageToSend}
      />
      <button onClick={() => sendMessage()}>Send</button>
    </div>
  )
}