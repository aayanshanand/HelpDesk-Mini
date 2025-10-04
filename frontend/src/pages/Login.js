import React, { useState } from "react";
import "./Login.css";
import { login, setToken } from "../api";

export default function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await login(username, password);
      setToken(res.token);
      setUser(res.user);
    } catch (e) {
      alert("Login failed");
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>HelpDesk Login</h2>
        <form onSubmit={handleLogin}>
          <input
            className="login-input"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Username"
            type="text"
          />
          <input
            className="login-input"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
          />
          <button className="login-button" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}