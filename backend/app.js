require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const app = express();

// Import routers
const users = require('./routes/users');
const tickets = require('./routes/tickets');

app.use(cors());
app.use(express.json());

// Rate limit: 60 req/min/user
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  keyGenerator: (req) => req.user?.id || req.ip,
  handler: (req, res) => res.status(429).json({ error: { code: "RATE_LIMIT" } })
});
app.use(limiter);

// Health & meta
app.get('/api/health', (req, res) => res.json({ status: "ok" }));
app.get('/api/_meta', (req, res) => res.json({ name: "HelpDesk Mini", version: "1.0.0" }));

// Well-known hackathon manifest
app.get('/.well-known/hackathon.json', (req, res) => res.json({
  name: "HelpDesk Mini",
  api: [
    "/api/tickets",
    "/api/tickets/:id",
    "/api/tickets/:id/comments"
  ],
  auth: "JWT Bearer",
  users: ["alice", "bob", "admin"]
}));

// Mount routers
app.use('/api/users', users);
app.use('/api/tickets', tickets); // Comments are nested inside tickets.js

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));