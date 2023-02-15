import "./App.css";

import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import RegistrationPage from "./components/pages/RegistrationPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegistrationPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
