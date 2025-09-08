import React, { useState } from "react";
import Modal from "./Modal";

export default function RequestForm() {
  const [form, setForm] = useState({
    topic: "",
    difficulty: "1",
    words: 500,
    email: ""
  });
  const [modalOpen, setModalOpen] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setModalOpen(true);
    // later: send to backend/email service
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Request an Essay</h2>
        <input
          name="topic"
          placeholder="Essay Topic"
          value={form.topic}
          onChange={handleChange}
          required
        />
        <br />
        <label>Difficulty (1-5): </label>
        <select
          name="difficulty"
          value={form.difficulty}
          onChange={handleChange}
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
        <br />
        <label>Word Count: </label>
        <input
          type="number"
          name="words"
          value={form.words}
          onChange={handleChange}
        />
        <br />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Submit Request</button>
      </form>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="✅ Request Sent"
        message={`Your essay request has been submitted!\n\nTopic: ${form.topic}\nDifficulty: ${form.difficulty}\nWords: ${form.words}\nEmail: ${form.email}`}
      />
    </div>
  );
}
