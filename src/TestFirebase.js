import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

export default function TestFirebase() {
  const [essays, setEssays] = useState([]);

  useEffect(() => {
    const runTest = async () => {
      try {
        // ✅ write a test doc
        await addDoc(collection(db, "essays"), {
          topic: "Test Essay",
          words: 123,
          email: "test@example.com",
          status: "pending",
          createdAt: Date.now(),
        });

        // ✅ read all docs
        const snap = await getDocs(collection(db, "essays"));
        setEssays(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } catch (err) {
        console.error("Firebase test failed:", err);
      }
    };
    runTest();
  }, []);

  return (
    <div>
      <h2>Firebase Connection Test</h2>
      {essays.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {essays.map((e) => (
            <li key={e.id}>
              {e.topic} — {e.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
