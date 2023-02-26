import React, { useState, useEffect } from "react";

export default function ChatBoxComponent(props) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3232/ws");

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      //   console.log(message);
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
    if (event.target.value.length > 48) {
      //   console.log("greater than 42");
      const lengthError = document.getElementById("length-warning-div");
      lengthError.innerHTML = "<p>Message is too long<p>";
      lengthError.style.color = "red";
      const chatButton = document.getElementById("chat-submit-button");
      chatButton.disabled = true;
    } else {
      const chatButton = document.getElementById("chat-submit-button");
      chatButton.disabled = false;
      const lengthError = document.getElementById("length-warning-div");
      lengthError.innerHTML = "";
      setInputValue(event.target.value);
    }
  };

  const handleMinimize = () => {
    const chatBox = document.querySelector(".chat-box-container");

    const minimizeButton = document.querySelector(".minimize-icon");

    minimizeButton.addEventListener("click", function () {
      chatBox.classList.toggle("minimized");
    });
    // const chatboxLabel = document.querySelector("#chatbox-label");
  };

  return (
    <div className="chat-box-container">
      <div id="minimize-icon-container">
        <div onClick={handleMinimize} class="minimize-icon">
          &#8722;
        </div>
      </div>

      <div id="chatbox-label"></div>
      <div className="message-window">
        {messages.map((message, index) => (
          <div key={index}>{message.username + ": " + message.message}</div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          id="chat-input"
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Chat with other online users!"
        />
        <div id="length-warning-div"></div>
        <button id="chat-submit-button" type="submit">
          Send
        </button>
      </form>
    </div>
  );
}
