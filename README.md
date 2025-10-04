# HelpDesk Mini

**HelpDesk Mini** is a full-stack web-based help desk ticketing system. It allows users to log in, create and track support tickets, add comments, and manage their profile. The project is built with React (frontend), Express/Node.js (backend), and SQLite (database).

---

## Features

- **Authentication**: Secure login using JWT tokens.
- **Ticket Management**: Create, view, search, and update support tickets.
- **Comments**: Add comments to tickets; view all your comments in your profile.
- **Profile Page**: See your user info and comment history.
- **Modern UI**: Clean navigation bar, styled pages, responsive design.
- **Rate Limiting**: Protects API from abuse.
- **REST API**: Well-structured endpoints for integration.
- **SQLite Database**: Lightweight and easy to set up.

---

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/aayanshanand/HelpDesk-Mini.git
   cd HelpDesk-Mini
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Database Setup**
   - The SQLite file (`helpdesk.sqlite`) and seed script (`seed.sql`) are provided in `/backend`.
   - To seed the database, run:
     ```bash
     sqlite3 helpdesk.sqlite < seed.sql
     ```

---

## Running the Application

### **Start the Backend**

```bash
cd backend
npm start
# or
node app.js
```
- The backend runs on [http://localhost:4000](http://localhost:4000)

### **Start the Frontend**

```bash
cd frontend
npm start
```
- The frontend runs on [http://localhost:3000](http://localhost:3000)

---

## Directory Structure

```
HelpDesk-Mini/
├── backend/
│   ├── routes/
│   │   ├── tickets.js
│   │   ├── comments.js
│   │   └── users.js
│   ├── app.js
│   ├── auth.js
│   ├── db.js
│   ├── models.js
│   ├── helpdesk.sqlite
│   ├── seed.sql
│   └── ...other files
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Tickets.js
│   │   │   ├── NewTicket.js
│   │   │   ├── TicketDetail.js
│   │   │   └── Profile.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── ...other files
│   └── ...other files
├── README.md
└── ...other files
```

---

## API Endpoints

- `POST   /api/users/login` — User login
- `GET    /api/tickets` — List/search tickets
- `POST   /api/tickets` — Create ticket
- `GET    /api/tickets/:id` — Ticket detail
- `PATCH  /api/tickets/:id` — Update ticket
- `GET    /api/tickets/:id/comments` — List comments for ticket
- `POST   /api/tickets/:id/comments` — Add comment to ticket
- `GET    /api/health` — Health check
- `GET    /api/_meta` — Metadata

All API requests require a valid JWT token except `/api/health` and `/api/_meta`.

---

## Usage

1. **Login**
   - Use one of the seeded users (e.g., `bob`, `alice`, `admin`).
2. **Create & Manage Tickets**
   - Use the navigation bar to create new tickets, view all tickets, and see ticket details.
3. **Profile**
   - View your username and your comments.
4. **Log Out**
   - Use the "Log Out" nav link in the top bar.

---

## Customization

- **Styling**: Edit `frontend/src/App.css` and page-specific CSS files.
- **Database**: Add more fields or relationships in `seed.sql` and backend models.
- **API**: Expand endpoints in `/backend/routes`.

---

## License

MIT License

---

## Author

- [aayanshanand](https://github.com/aayanshanand)

---

## Screenshots

<details>
  <summary>Navigation Bar</summary>
  <img src="https://user-images.githubusercontent.com/placeholder/nav-bar.png" alt="Navigation Bar" width="600"/>
</details>
<details>
  <summary>Tickets Page</summary>
  <img src="https://user-images.githubusercontent.com/placeholder/tickets-page.png" alt="Tickets Page" width="600"/>
</details>
<details>
  <summary>Profile Page</summary>
  <img src="https://user-images.githubusercontent.com/placeholder/profile-page.png" alt="Profile Page" width="600"/>
</details>

---

## Contribution

Feel free to fork this repo, open issues, or submit pull requests!
