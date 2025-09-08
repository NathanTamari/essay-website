import React, { useState } from "react";
import { useAuth } from "../auth/AuthContext";

export default function Header() {
  const { user, logout, login, error } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  const handleCeoLogin = (e) => {
    e.preventDefault();
    const { username, password } = e.target;
    login(username.value, password.value);
  };

  return (
    <header className="navbar">
      <h1 className="logo">EssayForge</h1>
      <div>
        {user.role !== "guest" ? (
          <button onClick={logout} className="btn-secondary">Logout</button>
        ) : (
          <button onClick={() => setShowLogin(!showLogin)} className="btn-primary">
            CEO Login
          </button>
        )}
      </div>

      {showLogin && user.role === "guest" && (
        <form onSubmit={handleCeoLogin} className="login-form">
          <input name="username" placeholder="CEO Username" />
          <input type="password" name="password" placeholder="Password" />
          <button type="submit" className="btn-primary">Login</button>
          {error && <p className="error">{error}</p>}
        </form>
      )}
    </header>
  );
}
