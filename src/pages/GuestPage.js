// src/pages/GuestPage.jsx
import React, { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import RequestForm from "../components/RequestForm";
import FeedbackForm from "../components/FeedbackForm";

export default function GuestPage() {
  const { login, error } = useAuth();
  const [localError, setLocalError] = useState("");

// inside src/pages/GuestPage.jsx
const handleLogin = async (e) => {
  e.preventDefault();
  const username = e.target.username.value.trim();
  const password = e.target.password.value.trim();
  const ok = await login(username, password);
  setLocalError(ok ? "" : "Login failed: Invalid username or password.");
  // No manual navigation needed — App re-renders based on user.role
};


  return (
    <div>
      <h2>Guest Portal</h2>
      {/* 👇 This is the essay request form you’re missing */}
      <RequestForm />

      <h2>Feedback</h2>
      <FeedbackForm />

      <h3>Admin/CEO Login</h3>
      <form onSubmit={handleLogin}>
        <input name="username" placeholder="Username" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit" className="btn-primary">Login</button>
      </form>

      {(error || localError) && <p className="error">{error || localError}</p>}
    </div>
  );
}
