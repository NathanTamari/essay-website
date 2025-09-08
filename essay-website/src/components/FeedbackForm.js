import React, { useState } from "react";
import Modal from "./Modal";

export default function FeedbackForm() {
  const [feedback, setFeedback] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setModalOpen(true);
    setFeedback("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Feedback</h2>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Leave your feedback..."
          rows={4}
        />
        <br />
        <button type="submit">Send Feedback</button>
      </form>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="✨ Feedback Submitted"
        message="Thank you for your feedback! Our team will review it soon."
      />
    </div>
  );
}
