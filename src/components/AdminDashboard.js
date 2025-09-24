import React, { useEffect, useMemo, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  doc,
} from "firebase/firestore";
import { sendFulfilledEmail } from "../utils/email";
import { useAuth } from "../auth/AuthContext";

export default function AdminDashboard() {
  const [essays, setEssays] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const q = query(collection(db, "essays"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setEssays(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, []);

  const pending = useMemo(() => essays.filter((e) => e.status === "pending"), [essays]);
  const reviewed = useMemo(() => essays.filter((e) => e.status === "reviewed"), [essays]);

  const markReviewed = async (e) => {
    const note = prompt("Optional note to include in the email:", "Your order was fulfilled!");
    try {
      await updateDoc(doc(db, "essays", e.id), {
        status: "reviewed",
        reviewedAt: Date.now(),
        reviewer: user?.name ?? "admin",
      });
      await sendFulfilledEmail({ to: e.email, topic: e.topic, words: e.words, note });
      alert("Marked reviewed and email sent.");
    } catch (err) {
      console.error(err);
      alert("Failed to mark reviewed or send email.");
    }
  };

  return (
    <div>
      <h2>Review Essays</h2>

      <section style={{ marginBottom: "1rem" }}>
        <h3>Unreviewed Essays</h3>
        {pending.length === 0 ? <p>All caught up! 🎉</p> : (
          <ul>
            {pending.map((e) => (
              <li key={e.id} style={{ marginBottom: "0.5rem" }}>
                <strong>{e.topic}</strong> — {e.words} words — {e.email}
                <button style={{ marginLeft: "1rem" }} onClick={() => markReviewed(e)}>Mark Reviewed & Email</button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h3>Reviewed Essays</h3>
        {reviewed.length === 0 ? <p>None yet.</p> : (
          <ul>
            {reviewed.map((e) => (
              <li key={e.id}>
                <strong>{e.topic}</strong> — reviewed by {e.reviewer ?? "admin"} on {new Date(e.reviewedAt).toLocaleString()}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}