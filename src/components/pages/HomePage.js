import React from "react";
import AuthenticationForm from "../AuthenticationForm";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Switch,
} from "react-router-dom";

export default function HomePage() {
  return (
    <>
      <header>
        <h1 className="logo">HomePage</h1>
        <nav>
          <ul>
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
        <div>
          <AuthenticationForm />
        </div>
      </main>
    </>
  );
}
