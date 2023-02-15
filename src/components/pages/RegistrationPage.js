import React, { useState } from "react";

export default function RegistrationPage() {
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

    const res = await fetch("http://localhost:3232/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
  };

  return (
    <div>
      <h1>Registration Page</h1>
      <form onSubmit={handleSubmit}>
        <div>Please enter your username</div>
        <input
          placeholder="username"
          name="username"
          value={username}
          onChange={handleUsernameChange}
        />
        <div>Please enter your password</div>
        <input
          placeholder="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
