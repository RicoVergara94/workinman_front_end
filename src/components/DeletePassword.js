import React, { useState } from "react";

export default function DeletePassword(props) {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(props.usernameParent);

  const onPasswordChange = ({ target }) => {
    const { name, value } = target;
    setPassword(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await fetch("http://localhost:3232/delete/password", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (res.status === 200) {
      props.handlePasswordStatusCode(200);
    } else if (res.status === 404) {
      props.handlePasswordStatusCode(404);
      const error = document.getElementById("password-error");
      error.textContent = "password was wrong please try again";
      error.style.color = "red";
    }
  };
  return (
    <>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h2>Please enter your password</h2>
          <p className="error-message" id="username-error"></p>
          <input type="password" onChange={onPasswordChange} />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}
