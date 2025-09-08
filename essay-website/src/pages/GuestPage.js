import React, { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import RequestForm from "../components/RequestForm";
import FeedbackForm from "../components/FeedbackForm";

export default function GuestPage() {
  const { login } = useAuth();
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const { username, password } = e.target;
    if (!login(username.value, password.value)) {
      setError("Invalid credentials!");
    }
  };

  return (
    <div>
      <h1>Alexander's Sanders Essay Typing Portal</h1>
      <RequestForm />
      <FeedbackForm />

      <h2>Admin/CEO Login</h2>
      <form onSubmit={handleLogin}>
        <input name="username" placeholder="Username (admin/ceo)" />
        <input name="password" type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
