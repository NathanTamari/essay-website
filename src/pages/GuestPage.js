import React, { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import RequestForm from "../components/RequestForm";
import FeedbackForm from "../components/FeedbackForm";

export default function GuestPage() {
  const { login, error } = useAuth();
  const [localError, setLocalError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const { username, password } = e.target;
    if (!login(username.value, password.value)) {
      setLocalError("Login failed: Invalid username or password.");
    } else {
      setLocalError("");
    }
  };

  return (
    <div>
      <h2>Guest Portal</h2>
      <RequestForm />
      <FeedbackForm />

      <h3>Admin Login</h3>
      <form onSubmit={handleLogin}>
        <input name="username" placeholder="Admin Username" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit" className="btn-primary">Login</button>
      </form>

      {(error || localError) && <p className="error">{error || localError}</p>}
    </div>
  );
}
