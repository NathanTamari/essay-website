import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

const USERS = {
  admin: { password: "admin123", role: "admin" },
  ceo: { password: "ceopower", role: "ceo" },
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ role: "guest" });
  const [error, setError] = useState("");

  const login = (username, password) => {
    if (USERS[username] && USERS[username].password === password) {
      setUser({ role: USERS[username].role, name: username });
      setError("");
      return true;
    }
    setError("Login failed: Invalid username or password.");
    return false;
  };

  const logout = () => {
    setUser({ role: "guest" });
    setError("");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
