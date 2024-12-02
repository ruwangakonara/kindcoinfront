import React, { useState } from "react";
import Message from "./Message"; // Assuming Message component is in the same directory

const ChatWindow = () => {
  const [messages, setMessages] = useState([
    { text: "Admin1: what is this Issue?", sender: "bot" },
  ]);
  const [inputText, setInputText] = useState("Admin 2:");

  const handleSend = () => {
    if (inputText.trim() !== "") {
      // Add user message
      setMessages([...messages, { text: inputText, sender: "user" }]);

      // You can also simulate bot responses here
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "Do you think is it a major issue!", sender: "bot" },
        ]);
      }, 1000);

      setInputText("");
    }
  };

  return (
    <div
      style={{
        width: "400px",
        height: "500px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Chat Messages */}
      <div
        style={{
          padding: "10px",
          overflowY: "scroll",
          height: "80%",
        }}
      >
        {messages.map((message, index) => (
          <Message key={index} text={message.text} sender={message.sender} />
        ))}
      </div>

      {/* Input Field */}
      <div
        style={{
          display: "flex",
          borderTop: "1px solid #ccc",
          padding: "10px",
        }}
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your message..."
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={handleSend}
          style={{
            marginLeft: "10px",
            backgroundColor: "#007bff",
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
