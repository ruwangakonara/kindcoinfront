import React from "react";

const Message = ({ text, sender }) => {
  return (
    <div
      style={{
        margin: "10px 0",
        display: "flex",
        justifyContent: sender === "user" ? "flex-end" : "flex-start",
      }}
    >
      <div
        style={{
          backgroundColor: sender === "user" ? "#007bff" : "#f1f0f0",
          color: sender === "user" ? "#fff" : "#000",
          padding: "10px",
          borderRadius: "10px",
          maxWidth: "60%",
        }}
      >
        {text}
      </div>
    </div>
  );
};

export default Message;
