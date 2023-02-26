import React, { useState } from "react";

export default function AuthenticationForm(props) {
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

    const res = await fetch("http://localhost:3232/", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (res.status === 200) {
      props.handleAuthenticateAccount(200);
      props.handleSettingUsername(username);
    } else {
      const error = document.getElementById("account-error");
      error.innerText = "Username or password are incorrect, please try again.";
      error.style.color = "red";
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <p>Please enter your username</p>
        </div>
        <input
          placeholder="username"
          name="username"
          type="text"
          value={username}
          onChange={handleUsernameChange}
        />
        <p>Please enter your password</p>
        <input
          placeholder="password"
          name="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button type="submit">Submit</button>
        <p className="error-message" id="account-error"></p>
      </form>
    </div>
  );
}
