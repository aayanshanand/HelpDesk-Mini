import React, { useEffect, useState } from "react";
import "./Profile.css";
import { getComments } from "../api"; // assumes getComments can get all for user, or demo data

export default function Profile({ user }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // TODO: update this to fetch user comments from API
    // For now, demo data:
    setComments([
      { id: 1, text: "This is my first comment.", ticketTitle: "login issue" },
      { id: 2, text: "Help needed here!", ticketTitle: "Sample Ticket 2" }
    ]);
  }, []);

  return (
    <div className="profile-page">
      <div className="profile-section">
        <h2>My Profile</h2>
        <div className="profile-card">
          <div className="profile-name">{user?.name || user?.username || "Anonymous"}</div>
          <div className="profile-email">{user?.email}</div>
        </div>
      </div>
      <div className="profile-section">
        <h2>My Comments</h2>
        <div className="comments-list">
          {comments.length === 0 && <div>No comments yet.</div>}
          {comments.map(c => (
            <div className="comment-card" key={c.id}>
              <div className="comment-ticket">{c.ticketTitle}</div>
              <div className="comment-text">{c.text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}