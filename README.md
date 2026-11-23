# Task Manager App

A full-stack task management application built with Python FastAPI, PostgreSQL, React, and Vite.

## Features
- JWT-based authentication
- User registration and login
- Create, read, update, and delete tasks
- User-specific task ownership and authorization
- PostgreSQL database with SQLAlchemy
- Alembic database migrations
- Pytest test suite
- React + Vite frontend

## Technology Stack

| Area | Technology |
|------|------------|
| Frontend | React, Vite |
| Backend | Python, FastAPI |
| Database | PostgreSQL |
| ORM | SQLAlchemy |
| Migrations | Alembic |
| Authentication | JWT |
| Testing | Pytest |
| CI | GitHub Actions |

## Project Structure

```text
task-manager-app/
+-- backend/          # FastAPI backend
|   +-- app/          # Application source code
|   +-- alembic/      # Database migrations
|   +-- requirements.txt
+-- frontend/         # React Vite frontend
|   +-- src/          # Source files
|   +-- package.json
|   +-- vite.config.js
+-- tests/            # Pytest test suite
+-- .gitignore
+-- README.md
```

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/parashbisht/task-manager-app.git
cd task-manager-app
```

### 2. Backend (.venv)

```bash
python -m venv .venv
. .venv\Scripts\activate
pip install -r backend/requirements.txt
cp backend/.env.example backend/.env
edit backend/.env if needed
python -m app.main
```

### 3. Frontend (Vite)

```bash
cd frontend
npm install
cp frontend/.env.example frontend/.env
npm run dev
```

### 4. Running tests

```bash
pytest
```

Tests use an in-memory SQLite database by default. To use a dedicated test database, set the TEST_DATABASE_URL environment variable.

## API Endpoints

All endpoints are under /api/v1:

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/v1/auth/signup | Register a new user |
| POST | /api/v1/auth/login | Authenticate and get access token |
| GET | /api/v1/auth/me | Get current user profile |

### Tasks

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/v1/tasks | List all tasks for the current user |
| POST | /api/v1/tasks | Create a new task |
| GET | /api/v1/tasks/{task_id} | Get a specific task |
| PUT | /api/v1/tasks/{task_id} | Update an existing task |
| PATCH | /api/v1/tasks/{task_id}/complete | Mark a task as completed |
| DELETE | /api/v1/tasks/{task_id} | Delete a task |

## Demo Credentials

- Email: `demo@taskflow.com`
- Password: `demo1234`

Use the Demo Login button on the login page to authenticate.

## Environment Variables

Backend (backend/.env):
- `DATABASE_URL` - PostgreSQL connection string
- `SECRET_KEY` - JWT signing key
- `DEBUG` - Enable debug mode
- `CORS_ORIGINS` - Comma-separated allowed frontend origins

Frontend (frontend/.env):
- `VITE_API_BASE_URL` - Backend API base URL (default: `http://localhost:8000`)

## License

This project is intended for learning, development, and portfolio purposes.