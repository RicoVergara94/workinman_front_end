import React, { useState } from "react";

export default function AuthenticationForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await fetch("http://localhost:3232/");
    const data = await res.json();
    console.log(data);
  };
  console.log("here");

  //   fetch("http://localhost:3232")
  //     .then((res) => res.json())
  //     .then((data) => console.log(data));

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input placeholder="username" />
        <input placeholder="password" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
