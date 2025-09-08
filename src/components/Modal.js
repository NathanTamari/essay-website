import React from "react";

export default function Modal({ isOpen, onClose, title, message }) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "rgba(10, 10, 20, 0.95)",
          border: "2px solid #00f6ff",
          boxShadow: "0 0 30px #00f6ff",
          borderRadius: "12px",
          padding: "2rem",
          textAlign: "center",
          maxWidth: "400px",
          width: "90%",
          color: "#e0e0e0",
        }}
      >
        <h2 style={{ marginBottom: "1rem", color: "#00f6ff" }}>{title}</h2>
        <p style={{ marginBottom: "1.5rem" }}>{message}</p>
        <button className="btn-primary" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
