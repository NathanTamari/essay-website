import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useAuth } from "../auth/AuthContext";

export default function CeoControlCenter() {
  const { addUser, removeUser } = useAuth();
  const [admins, setAdmins] = useState([]);
  const [ceos, setCeos] = useState([]);
  const [form, setForm] = useState({ username: "", password: "", role: "admin" });

  useEffect(() => {
    const qAdmins = query(collection(db, "users"), where("role", "==", "admin"));
    const qCeos = query(collection(db, "users"), where("role", "==", "ceo"));
    const unsubA = onSnapshot(qAdmins, (s) => setAdmins(s.docs.map((d) => d.data())));
    const unsubC = onSnapshot(qCeos, (s) => setCeos(s.docs.map((d) => d.data())));
    return () => { unsubA(); unsubC(); };
  }, []);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const onAdd = async (e) => {
    e.preventDefault();
    try {
      await addUser(form);
      setForm({ username: "", password: "", role: "admin" });
      alert("User added.");
    } catch (err) {
      alert(err.message);
    }
  };

  const onRemove = async (username) => {
    if (!window.confirm(`Remove ${username}?`)) return;
    try {
      await removeUser(username);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={{ border: "2px solid cyan", padding: "1rem", borderRadius: "8px", background: "black", color: "cyan", boxShadow: "0 0 20px cyan" }}>
      <h2>🚀 CEO Control Center</h2>
      <p>Manage admins & CEOs.</p>

      <form onSubmit={onAdd} style={{ marginBottom: "1rem" }}>
        <input name="username" placeholder="username" value={form.username} onChange={onChange} required />
        <input type="password" name="password" placeholder="password" value={form.password} onChange={onChange} required />
        <select name="role" value={form.role} onChange={onChange}>
          <option value="admin">admin</option>
          <option value="ceo">ceo</option>
        </select>
        <button type="submit" style={{ marginLeft: "0.5rem" }}>Add User</button>
      </form>

      <h3>Admins</h3>
      {admins.length === 0 ? <p>None.</p> : (
        <ul>
          {admins.map((u) => (
            <li key={u.username}>
              {u.username}
              <button style={{ marginLeft: "0.5rem" }} onClick={() => onRemove(u.username)}>Remove</button>
            </li>
          ))}
        </ul>
      )}

      <h3>CEOs</h3>
      <ul>
        {ceos.map((u) => (
          <li key={u.username}>{u.username}</li>
        ))}
      </ul>
    </div>
  );
}