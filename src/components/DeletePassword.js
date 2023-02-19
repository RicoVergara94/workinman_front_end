import React, { useState } from "react";

export default function DeletePassword(props) {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(props.usernameParent);

  const onPasswordChange = ({ target }) => {
    const { name, value } = target;
    setPassword(value);
  };

  const handleSubmit = async (event) => {
    console.log(username);
    event.preventDefault();
    const res = await fetch("http://localhost:3232/delete/password", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
  };
  return (
    <>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h2>Please enter your password</h2>
          <input type="text" onChange={onPasswordChange} />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}
