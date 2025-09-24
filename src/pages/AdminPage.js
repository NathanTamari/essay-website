import React from "react";
import { useAuth } from "../auth/AuthContext";
import AdminDashboard from "../components/AdminDashboard";

export default function AdminPage() {
  const { logout } = useAuth();
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <AdminDashboard />
      <button onClick={logout}>Logout</button>
    </div>
  );
}