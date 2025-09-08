import React from "react";
import { useAuth } from "../auth/AuthContext";
import CeoControlCenter from "../components/CeoControlCenter";

export default function CeoPage() {
  const { logout } = useAuth();
  return (
    <div>
      <h1>CEO Control Center 🚀</h1>
      <CeoControlCenter />
      <button onClick={logout}>Logout</button>
    </div>
  );
}
