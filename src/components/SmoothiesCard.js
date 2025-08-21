import React from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../config/supabaseclient";

export default function SmoothiesCard({ smoothe }) {
  const navigate = useNavigate();

  const createdDate = new Date(smoothe.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const deletesmoothe = async () => {
    const { error } = await supabase
      .from("smoothe")
      .delete()
      .eq("id", smoothe.id);

    if (error) {
      console.error("Delete failed:", error.message);
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="smoothie-card">
      <div className="smoothie-content">
        <h3 className="smoothie-title">{smoothe.title}</h3>
        <p className="smoothie-method">{smoothe.method}</p>

        <div className="button-group">
          <Link to={`/${smoothe.id}`} className="edit-btn">
            <i className="material-icons">edit</i>
          </Link>
          <button onClick={deletesmoothe} className="delete-btn">
            Delete
          </button>
        </div>
      </div>

      <div className="smoothie-footer">
        <div className="rating">{smoothe.rating} ⭐</div>
        <span className="created-at">Created on {createdDate}</span>
      </div>
    </div>
  );
}
