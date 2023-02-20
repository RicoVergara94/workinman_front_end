import React, { useState, useEffect } from "react";
import AuthenticationForm from "../AuthenticationForm";
import UserProfile from "../UserProfile";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Switch,
} from "react-router-dom";

export default function HomePage() {
  const [username, setUsername] = useState("");
  const [accountStatusCode, setAccountStatusCode] = useState(null);
  const handleAuthenticateAccount = (code) => {
    if (code === 200) {
      setAccountStatusCode(200);
    }
  };

  const [component, setComponent] = useState(
    <AuthenticationForm handleAuthenticateAccount={handleAuthenticateAccount} />
  );

  useEffect(() => {
    if (accountStatusCode === 200) {
      setComponent(<UserProfile />);
      setUsername();
    }
  }, [accountStatusCode]);

  return (
    <>
      <header>
        <h1 className="logo">HomePage</h1>
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
      <main>
        <div>{component}</div>
      </main>
    </>
  );
}
