import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTicket, getComments, addComment } from "../api";
import './TicketDetail.css';

export default function TicketDetail() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    getTicket(id).then((data) => setTicket(data.ticket));
    getComments(id).then((data) => setComments(data.comments));
  }, [id]);

  async function handleComment(e) {
    e.preventDefault();
    if (!text.trim()) return;
    await addComment(id, text);
    setText("");
    const data = await getComments(id);
    setComments(data.comments);
  }

  if (!ticket) return <div className="ticket-page">Loading...</div>;

  return (
    <div className="ticket-page">
      <div className="ticket-title">{ticket.title}</div>
      <div className="ticket-status">Status: {ticket.status}</div>
      <div className="ticket-desc">{ticket.description}</div>
      <div className="ticket-comments">
        <h3>Comments</h3>
        {comments.map((c) => (
          <div className="comment" key={c.id}>
            <b>{c.user_id}</b>: {c.text}
          </div>
        ))}
        <form className="comment-form" onSubmit={handleComment}>
          <input value={text} onChange={e => setText(e.target.value)} placeholder="Add a comment" />
          <button type="submit">Comment</button>
        </form>
      </div>
    </div>
  );
}