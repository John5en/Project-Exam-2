import "./index.css";
import React from "react";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/Profile";
import ManagerPage from "./pages/Manager";
import LoginPage from "./pages/LogIn";
import SignUpPage from "./pages/SignUp";
import VenuePage from "./pages/VenuePage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/venuepage/:id" element={<VenuePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/manager" element={<ManagerPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
