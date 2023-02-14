import React, { useState } from "react";

export default function AuthenticationForm() {
  const [username, setUsername] = useState("");

  const handleSubmit = () => {};

  return (
    <div>
      <form>
        <input placeholder="username" />
        <input placeholder="password" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
