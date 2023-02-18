import React from "react";

export default function DeletePassword() {
  const [password, setPassword] = useState("");
  const onPasswordChange = ({ target }) => {
    const { name, value } = target;
    setPassword(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const res = await fetch("http://localhost:3232/delete/password", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(password),
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input onChange={onPasswordChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
