import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DeleteUsername from "../DeleteUsername";
import DeletePassword from "../DeletePassword";
import AccountWasDeleted from "../AccountWasDeleted";

export default function DeleteAccountPage() {
  const [usernameStatusCode, setUsernameStatusCode] = useState(null);
  const [passwordStatusCode, setPasswordStatusCode] = useState(null);
  const [usernameParent, setUsernameParent] = useState("");

  const handleSetUsernameParent = (username) => {
    setUsernameParent(username);
  };

  const handleUsernameStatusCode = (code) => {
    setUsernameStatusCode(code);
  };
  const handlePasswordStatusCode = (code) => {
    setPasswordStatusCode(code);
  };
  const [component, setComponent] = useState(
    <DeleteUsername
      handleSetUsernameParent={handleSetUsernameParent}
      handleUsernameStatusCode={handleUsernameStatusCode}
    />
  );
  useEffect(() => {
    if (usernameStatusCode === 200) {
      setComponent(
        <DeletePassword
          handlePasswordStatusCode={handlePasswordStatusCode}
          usernameParent={usernameParent}
        />
      );
    }
  }, [usernameStatusCode]);

  useEffect(() => {
    if (passwordStatusCode === 200) {
      localStorage.removeItem("userProfileState");
      setComponent(<AccountWasDeleted />);
    }
  }, [passwordStatusCode]);
  return (
    <>
      <header>
        <h1>Delete Account</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/register">Registration</Link>
            </li>
            <li>
              <Link to="/delete">Delete Account</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <div>{component}</div>
      </main>
    </>
  );
}
