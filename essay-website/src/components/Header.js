import React from "react";
import { useAuth } from "../auth/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header style={{ padding: "1rem", background: "#111", color: "white" }}>
      <h1>EssayForge</h1>
      <p>Current role: {user.role}</p>
      {user.role !== "guest" && (
        <button onClick={logout} style={{ marginLeft: "1rem" }}>
          Logout
        </button>
      )}
    </header>
  );
}
