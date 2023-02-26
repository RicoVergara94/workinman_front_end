import React, { useState, useEffect } from "react";
import AuthenticationForm from "../AuthenticationForm";
import UserProfile from "../UserProfile";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Switch,
  useNavigate,
} from "react-router-dom";

export default function HomePage() {
  const [username, setUsername] = useState("");
  const [accountStatusCode, setAccountStatusCode] = useState(null);
  const navigate = useNavigate();

  const handleAuthenticateAccount = (code) => {
    if (code === 200) {
      setAccountStatusCode(200);
      localStorage.setItem("isLoggedIn", true);
    }
  };

  const handleSettingUsername = (authUsername) => {
    setUsername(authUsername);
  };

  useEffect(() => {
    const userProfileState = localStorage.getItem("userProfileState");
    if (userProfileState) {
      setAccountStatusCode(200);
      setUsername(JSON.parse(userProfileState).username);
    }
  }, []);

  useEffect(() => {
    if (accountStatusCode === 200) {
      localStorage.setItem(
        "userProfileState",
        JSON.stringify({ username: username })
      );
    }
  }, [accountStatusCode, username]);

  const handleLogout = () => {
    setUsername("");
    setAccountStatusCode(null);
    navigate.push("/");
  };

  const userProfileComponent = (
    <UserProfile username={username} handleLogout={handleLogout} />
  );

  const authComponent = (
    <AuthenticationForm
      handleAuthenticateAccount={handleAuthenticateAccount}
      handleSettingUsername={handleSettingUsername}
    />
  );
  const [component, setComponent] = useState(
    accountStatusCode === 200 ? userProfileComponent : authComponent
  );
  // const isLoggedIn = localStorage.getItem("isLoggedIn");

  useEffect(() => {
    if (accountStatusCode === 200) {
      setComponent(userProfileComponent);
    } else {
      setComponent(authComponent);
    }
  }, [accountStatusCode]);

  return (
    <>
      <header>
        <h1 className="logo">HomePage</h1>
        {accountStatusCode && <button onClick={handleLogout}>Log Out</button>}
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
