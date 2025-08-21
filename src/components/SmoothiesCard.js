import React from "react";

export default function SmoothiesCard({ smoothe }) {
  // Format the created_at date
  const createdDate = new Date(smoothe.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="smoothie-card">
      <div className="smoothie-content">
        <h3 className="smoothie-title">{smoothe.title}</h3>
        <p className="smoothie-method">{smoothe.method}</p>
      </div>
      
      <div className="smoothie-footer">
        <div className="rating">{smoothe.rating} ⭐</div>
        <span className="created-at">Created on {createdDate}</span>
      </div>
    </div>
  );
}
