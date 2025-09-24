// src/App.jsx
import React from "react";
import { AuthProvider, useAuth } from "./auth/AuthContext";
import GuestPage from "./pages/GuestPage";
import AdminPage from "./pages/AdminPage";
import CeoPage from "./pages/CeoPage";

function MainApp() {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (user.role === "admin") return <AdminPage />;
  if (user.role === "ceo") return <CeoPage />;
  return <GuestPage />;
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
