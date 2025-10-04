import React, { useState } from "react";
import './NewTicket.css';
import { useNavigate } from "react-router-dom";

export default function NewTicket({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (title && desc && onSubmit) {
      await onSubmit({ title, description: desc });
      setTitle("");
      setDesc("");
      navigate("/tickets"); // Now you can navigate here!
    }
  }

  return (
    <div className="new-ticket-page">
      <h2 className="new-ticket-title">New Ticket</h2>
      <form className="new-ticket-form" onSubmit={handleSubmit}>
        <input className="new-ticket-input" type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <textarea className="new-ticket-textarea" placeholder="Description" value={desc} onChange={e => setDesc(e.target.value)} />
        <button className="new-ticket-button" type="submit">Submit</button>
      </form>
    </div>
  );
}