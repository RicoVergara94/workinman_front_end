import React, { useState, useEffect } from "react";

export default function ChatBoxComponent(props) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3232/ws");

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log(message);
      setMessages((messages) => [...messages, message]);
    };

    return () => {
      ws.close();
    };
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const ws = new WebSocket("ws://localhost:3232/ws");
    const messageWithUsername = {
      username: props.username,
      message: inputValue,
    };
    ws.onopen = () => {
      //   ws.send(JSON.stringify({ message: inputValue }));
      ws.send(JSON.stringify(messageWithUsername));
    };
    setInputValue("");
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="chat-box-container">
      <div className="message-window">
        {messages.map((message, index) => (
          <div key={index}>{message.username + ": " + message.message}</div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={inputValue} onChange={handleChange} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
