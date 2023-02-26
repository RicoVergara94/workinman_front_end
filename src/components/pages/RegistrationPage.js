import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function RegistrationPage() {
  const [accountStatusCode, setAccountStatusCode] = useState(null);

  const handleSettingAccountStatusCode = (code) => {
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
      const usernameAvailability = document.getElementById(
        "username-availability"
      );
      event.preventDefault();

      if (username.length < 10 || username.length > 30) {
        const error = document.getElementById("registration-username-error");
        error.innerText = "please choose a username with 10 to 29 characters";
        error.style.color = "red";
        return;
      }
      if (password.length < 5 || password.length > 12) {
        const error = document.getElementById("registration-password-error");
        error.innerText = "please choose a password with 5 to 12 characters";
        error.style.color = "red";
        return;
      }

      const res = await fetch("http://localhost:3232/register", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (res.status === 200) {
        props.handleSettingAccountStatusCode(200);
        // console.log("success");
      } else if (res.status === 409) {
        const data = await res.text();
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
            <p className="error-message" id="registration-username-error"></p>
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
            <p className="error-message" id="registration-password-error"></p>
          </div>
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
