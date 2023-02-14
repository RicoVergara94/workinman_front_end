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

  //   fetch("http://localhost:3232")
  //     .then((res) => res.json())
  //     .then((data) => console.log(data));

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="username"
          name="username"
          value={username}
          onChange={handleUsernameChange}
        />
        <input
          placeholder="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
