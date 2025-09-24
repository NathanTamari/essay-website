// src/auth/AuthContext.jsx
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const AuthContext = createContext();

const DEFAULT_CEO = { username: "ceo", password: "ceopower", role: "ceo" };

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ role: "guest" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Seed a default CEO if users is empty
  useEffect(() => {
    (async () => {
      const snap = await getDocs(collection(db, "users"));
      if (snap.empty) {
        await addDoc(collection(db, "users"), DEFAULT_CEO);
      }
      setLoading(false);
    })();
  }, []);

  const login = async (usernameRaw, passwordRaw) => {
    try {
      const username = String(usernameRaw || "").trim();
      const password = String(passwordRaw || "").trim();

      // Query only by username (more reliable), then compare password in code
      const qUser = query(collection(db, "users"), where("username", "==", username));
      const res = await getDocs(qUser);

      if (res.empty) {
        setError("Login failed: Invalid username or password.");
        return false;
      }

      const docData = res.docs[0].data();
      if (docData.password !== password) {
        setError("Login failed: Invalid username or password.");
        return false;
      }

      setUser({ name: docData.username, role: docData.role });
      setError("");
      return true;
    } catch (e) {
      console.error("Login error:", e);
      setError("Login error – check console.");
      return false;
    }
  };

  const logout = () => {
    setUser({ role: "guest" });
    setError("");
  };

  // CEO-only helpers (unchanged)
  const addUser = async ({ username, password, role }) => {
    if (user.role !== "ceo") throw new Error("Only CEO can add users.");
    await addDoc(collection(db, "users"), {
      username: String(username).trim(),
      password: String(password).trim(),
      role,
    });
  };

  const removeUser = async (username) => {
    if (user.role !== "ceo") throw new Error("Only CEO can remove users.");
    const ceoQ = query(collection(db, "users"), where("role", "==", "ceo"));
    const ceoSnap = await getDocs(ceoQ);

    const targetQ = query(collection(db, "users"), where("username", "==", String(username).trim()));
    const targetSnap = await getDocs(targetQ);
    if (targetSnap.empty) return;

    const target = targetSnap.docs[0];
    const role = target.data().role;
    if (role === "ceo" && ceoSnap.size <= 1) {
      throw new Error("Cannot remove the last CEO account.");
    }
    await deleteDoc(doc(db, "users", target.id));
  };

  const value = useMemo(
    () => ({ user, error, login, logout, addUser, removeUser, loading }),
    [user, error, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
