import React from "react";

export default function AdminDashboard() {
  // Later this could fetch essay submissions
  const dummyEssays = [
    { id: 1, topic: "AI Ethics", status: "Pending" },
    { id: 2, topic: "Climate Change", status: "Reviewed" }
  ];

  return (
    <div>
      <h2>Review Essays</h2>
      <ul>
        {dummyEssays.map((essay) => (
          <li key={essay.id}>
            {essay.topic} — {essay.status}
            <button style={{ marginLeft: "1rem" }}>Open</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
