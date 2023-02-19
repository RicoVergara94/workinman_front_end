import React, { useState } from "react";

export default function AuthenticationForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = ({ target }) => {
    const { name, value } = target;
    setUsername(value);
  };
  const handlePasswordChange = ({ target }) => {
    const { name, value } = target;
    setPassword(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log({ username, password });

    const res = await fetch("http://localhost:3232/", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    console.log(data);
  };
  // TODO: Need to alert user is the username or password is wrong

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <span>Please enter your username and password</span>
        </div>
        <input
          placeholder="username"
          name="username"
          type="text"
          value={username}
          onChange={handleUsernameChange}
        />
        <input
          placeholder="password"
          name="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
