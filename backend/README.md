# HelpDesk Mini Backend

## API Summary

- POST `/api/users/login` — login, returns JWT
- POST `/api/tickets` — create ticket (idempotency-key supported)
- GET `/api/tickets?limit=&offset=&q=` — list/search tickets
- GET `/api/tickets/:id` — ticket detail
- PATCH `/api/tickets/:id` — update ticket (optimistic lock)
- POST `/api/tickets/:id/comments` — add comment
- GET `/api/tickets/:id/comments` — get comments
- GET `/api/health`, `/api/_meta`, `/.well-known/hackathon.json` — system info

## Example Requests

Login:
```bash
curl -X POST http://localhost:4000/api/users/login -H "Content-Type: application/json" -d '{"username":"alice","password":"password"}'
```

Create ticket (idempotent):
```bash
curl -X POST http://localhost:4000/api/tickets -H "Authorization: Bearer {token}" -H "Idempotency-Key: xyz" -d '{"title":"Test","description":"Details"}'
```

## Seed Data

- See `seed.sql` for users and ticket samples.

## Running Locally

```bash
cd backend
npm install
npm run seed
npm start
```

## Deployment

- Use Render for backend, Vercel/Netlify for frontend. Set JWT_SECRET env var.

## Architecture Note

Single Node.js Express backend with SQLite for relational storage, supporting RESTful APIs for ticketing and comments. JWT authentication enables RBAC, and endpoints enforce rate limits, idempotency, and optimistic locking. React frontend consumes the APIs and enables ticket creation, viewing, searching, and commenting.