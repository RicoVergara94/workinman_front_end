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
    console.log("in the handleSubmit method");
    const usernameAvailability = document.getElementById(
      "username-availability"
    );
    event.preventDefault();

    const res = await fetch("http://localhost:3232/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    if (res.status === 409) {
      const data = await res.text();
      console.log(data);
      // alert(data);
      // const data = await res.json();
      usernameAvailability.textContent = "Username is already taken";
      usernameAvailability.style.color = "red";
    }
  };

  return (
    <>
      <header>
        <h1>Registration Page</h1>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <div>Please enter your username</div>
          <input
            placeholder="username"
            name="username"
            value={username}
            onChange={handleUsernameChange}
          />
          <div>
            <span id="username-availability"></span>
          </div>

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
      </main>
    </>
  );
}
