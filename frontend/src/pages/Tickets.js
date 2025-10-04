import React, { useState } from "react";
import './Tickets.css';
import { Link } from "react-router-dom";

export default function Tickets({ tickets = [] }) {
  const [query, setQuery] = useState("");
  const filtered = tickets.filter(t => t.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="tickets-page">
      <h2 className="tickets-title">Tickets</h2>
      <input className="tickets-search" type="text" placeholder="Search tickets" value={query} onChange={e => setQuery(e.target.value)} />
      <ul className="tickets-list">
        {filtered.map(ticket => (
          <li key={ticket.id}>
            <Link className="ticket-link" to={`/tickets/${ticket.id}`}>{ticket.title}</Link>
            <span className={`ticket-status ${ticket.status}`}>({ticket.status})</span>
          </li>
        ))}
      </ul>
    </div>
  );
}