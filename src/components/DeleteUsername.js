import React, { useState } from "react";

export default function DeleteUsername() {
  const [username, setUsername] = useState("");
  const onUsernameChange = ({ target }) => {
    const { name, value } = target;
    setUsername(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const res = await fetch("http://localhost:3232/delete/username", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(username),
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input onChange={onUsernameChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

// create a component that reaches out to the server and checks if username exists
