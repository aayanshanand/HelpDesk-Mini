import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Tickets from "./pages/Tickets";
import NewTicket from "./pages/NewTicket";
import TicketDetail from "./pages/TicketDetail";
import Profile from "./pages/Profile";
import { login, setToken, listTickets, createTicket } from "./api";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      listTickets().then(data => setTickets(data.tickets));
    }
  }, [user]);

  async function handleAddTicket(ticket) {
    await createTicket(ticket);
    const data = await listTickets();
    setTickets(data.tickets);
  }

  function handleLogout(e) {
    e.preventDefault();
    setUser(null);
    setToken(null);
    navigate("/");
  }

  if (!user) return <Login setUser={setUser} />;

  return (
    <>
      <nav className="main-nav">
        <Link className="nav-link" to="/tickets">Tickets</Link>
        <span className="nav-sep">|</span>
        <Link className="nav-link" to="/tickets/new">New Ticket</Link>
        <span className="nav-sep">|</span>
        <Link className="nav-link" to="/profile">Profile</Link>
        <span className="nav-sep">|</span>
        <a href="#" className="nav-link" onClick={handleLogout}>Log Out</a>
      </nav>
      <Routes>
        {/* Redirect root path to /tickets/new so it shows after login */}
        <Route path="/" element={<Navigate to="/tickets/new" />} />
        <Route path="/tickets" element={<Tickets tickets={tickets} />} />
        <Route path="/tickets/new" element={<NewTicket onSubmit={handleAddTicket} />} />
        <Route path="/tickets/:id" element={<TicketDetail />} />
        <Route path="/profile" element={<Profile user={user} />} />
      </Routes>
    </>
  );
}

export default function Root() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}