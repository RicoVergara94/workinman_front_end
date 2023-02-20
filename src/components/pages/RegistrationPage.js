import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function RegistrationPage() {
  const [accountStatusCode, setAccountStatusCode] = useState(null);

  const handleSettingAccountStatusCode = (code) => {
    console.log("we are inside the handleSettingAccountStatusCode");
    setAccountStatusCode(code);
  };

  const SuccesfulRegistrationComponent = () => {
    return (
      <>
        <div class="alert alert-success" role="alert">
          Congratulations! Your account has been successfully registered.
        </div>
      </>
    );
  };

  const RegistrationFormComponent = (props) => {
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
      if (res.status === 200) {
        props.handleSettingAccountStatusCode(200);
        console.log("success");
      } else if (res.status === 409) {
        // const data = await res.text();
        // console.log(data);
        // alert(data);
        // const data = await res.json();
        const data = await res.text();
        console.log(data);
        usernameAvailability.textContent = "Username is already taken";
        usernameAvailability.style.color = "red";
      }
    };
    return (
      <>
        <form onSubmit={handleSubmit}>
          <div>Please choose a username</div>
          <input
            placeholder="username"
            name="username"
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />
          <div>
            <span id="username-availability"></span>
          </div>

          <div>Please choose a password</div>
          <input
            placeholder="password"
            name="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </>
    );
  };

  const [component, setComponent] = useState(
    <RegistrationFormComponent
      handleSettingAccountStatusCode={handleSettingAccountStatusCode}
    />
  );

  useEffect(() => {
    if (accountStatusCode === 200) {
      setComponent(<SuccesfulRegistrationComponent />);
    }
  }, [accountStatusCode]);

  return (
    <>
      <header>
        <h1 className="logo">Registration Page</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/delete">Delete Account</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>{component}</main>
    </>
  );
}
