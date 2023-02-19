import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DeleteUsername from "../DeleteUsername";
import DeletePassword from "../DeletePassword";

export default function DeleteAccountPage() {
  const [usernameStatusCode, setUsernameStatusCode] = useState(null);
  const [usernameParent, setUsernameParent] = useState("");

  const handleSetUsernameParent = (username) => {
    setUsernameParent(username);
  };

  const handleUsernameStatusCode = (code) => {
    setUsernameStatusCode(code);
  };
  const [component, setComponent] = useState(
    <DeleteUsername
      handleSetUsernameParent={handleSetUsernameParent}
      handleUsernameStatusCode={handleUsernameStatusCode}
    />
  );
  useEffect(() => {
    if (usernameStatusCode === 200) {
      console.log("this is username: " + usernameParent);
      setComponent(<DeletePassword usernameParent={usernameParent} />);
    }
  }, [usernameStatusCode]);
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
