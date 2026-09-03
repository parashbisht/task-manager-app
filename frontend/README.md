# Task Manager — Frontend

A React frontend for the [Task Manager API](https://github.com/parashbisht/task_manager_api) — a JWT-authenticated task management app with a dashboard, search, and full task CRUD.

## Features

- Email/password signup and login (JWT-based)
- Protected dashboard route — redirects to login if not authenticated
- Full task CRUD: create, edit, complete, delete
- Live search/filter across tasks
- Task stats (total, pending, completed)
- Loading, empty, and error states on every major action
- Fully responsive — tested down to 320px wide

## Tech Stack

React · Vite · React Router · Axios · Tailwind CSS

## Project Structure
src/
├── components/ # Reusable UI pieces (Button, Modal, TaskCard, etc.)
├── pages/ # Login, Register, Dashboard
├── layouts/ # DashboardLayout (Navbar wrapper)
├── services/ # api.js (axios instance), authService.js, taskService.js
├── hooks/ # useAuth.jsx (auth context)
├── App.jsx
└── main.jsx


## Running Locally

### 1. Install dependencies

```bash
npm install
```

### 2. Configure the API URL

```bash
cp .env.example .env
```

Edit `.env` to point at your backend:
VITE_API_URL=http://127.0.0.1:8000



### 3. Make sure the backend allows this frontend's origin (CORS)

The backend needs `CORSMiddleware` configured to allow `http://localhost:5173`. See the [backend repo](https://github.com/parashbisht/task_manager_api) for details.

### 4. Run the dev server

```bash
npm run dev
```

Visit `http://localhost:5173`.

## Building for Production

```bash
npm run build
```

Outputs a static build to `dist/`.

## Deployment

Configured for [Vercel](https://vercel.com) — `vercel.json` handles SPA routing so client-side routes (like `/dashboard`) work correctly on page refresh/direct navigation.

**Environment variable to set on Vercel:**
VITE_API_URL=https://your-backend-url.onrender.com


Don't forget to add your deployed frontend's URL to the backend's CORS `allow_origins` list once deployed.

## API Reference

This frontend consumes the following backend endpoints:

| Action | Method | Endpoint |
|---|---|---|
| Register | POST | `/auth/signup` |
| Login | POST | `/auth/login` |
| Current user | GET | `/auth/me` |
| List tasks | GET | `/tasks` |
| Create task | POST | `/tasks` |
| Update task | PUT | `/tasks/{id}` |
| Complete task | PATCH | `/tasks/{id}/complete` |
| Delete task | DELETE | `/tasks/{id}` |

Full backend details: [task_manager_api](https://github.com/parashbisht/task_manager_api)