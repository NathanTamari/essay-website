import React from "react";

export default function CeoControlCenter() {
  return (
    <div
      style={{
        border: "2px solid cyan",
        padding: "1rem",
        borderRadius: "8px",
        background: "black",
        color: "cyan",
        boxShadow: "0 0 20px cyan"
      }}
    >
      <h2>🚀 CEO Control Center</h2>
      <p>Ultimate Power: Manage agents, finances, and system settings.</p>
      <button style={{ margin: "0.5rem" }}>View Reports</button>
      <button style={{ margin: "0.5rem" }}>Manage Users</button>
      <button style={{ margin: "0.5rem" }}>System Settings</button>
    </div>
  );
}
