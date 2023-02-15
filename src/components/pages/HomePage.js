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
    <div>
      HomePage
      <div>
        <AuthenticationForm />
        <Link to="/register">Register</Link>
        Dolore nostrud exercitation cillum aliqua.
      </div>
    </div>
  );
}
