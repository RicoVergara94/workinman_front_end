import React, { useState } from "react";

export default function DeleteUsername(props) {
  const [username, setUsername] = useState("");
  const onUsernameChange = ({ target }) => {
    const { name, value } = target;
    setUsername(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("this is username: " + username);
    const res = await fetch("http://localhost:3232/delete/username", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    });

    if (res.status === 404) {
      console.log("username does not exist");
      props.handleUsernameStatusCode(res.status);
      const error = document.getElementById("username-error");
      error.textContent = "Username is either wrong or does not exist";
      error.style.color = "red";
    } else if (res.status === 200) {
      console.log("Unto the delete password component");
      props.handleSetUsernameParent(username);
      props.handleUsernameStatusCode(res.status);
    }
  };
  // TODO: once the username is submitted and verified change the form-container to deletepassword component
  return (
    <>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h2>Please enter your username</h2>
          <p className="error-message" id="username-error"></p>
          <input type="text" onChange={onUsernameChange} />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

// create a component that reaches out to the server and checks if username exists
