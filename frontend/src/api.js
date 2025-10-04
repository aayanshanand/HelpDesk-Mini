import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:4000" || "https://helpdesk-mini-q1x1.onrender.com",
});

export function setToken(token) {
  API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export async function login(username, password) {
  const res = await API.post("/users/login", { username, password });
  return res.data;
}

export async function listTickets(q = "", limit = 10, offset = 0) {
  const res = await API.get("/tickets", { params: { q, limit, offset } });
  return res.data;
}

export async function getTicket(id) {
  const res = await API.get(`/tickets/${id}`);
  return res.data;
}

export async function createTicket(data, idemKey = null) {
  const headers = {};
  if (idemKey) headers["Idempotency-Key"] = idemKey;
  const res = await API.post("/tickets", data, { headers });
  return res.data;
}

export async function patchTicket(id, data) {
  const res = await API.patch(`/tickets/${id}`, data);
  return res.data;
}

export async function getComments(ticketId) {
  const res = await API.get(`/tickets/${ticketId}/comments`);
  return res.data;
}

export async function addComment(ticketId, text, parent_id = null) {
  const res = await API.post(`/tickets/${ticketId}/comments`, { text, parent_id });
  return res.data;
}
