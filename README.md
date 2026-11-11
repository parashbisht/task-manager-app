# Task Manager App

A full-stack task management application built with **FastAPI, PostgreSQL, React, and Vite**.

It provides user authentication, task CRUD operations, ownership-based authorization, database migrations, Docker support, and automated CI testing.

## ✨ Features

* 🔐 JWT-based authentication
* 👤 User registration and login
* ✅ Create, read, update, and delete tasks
* 🔒 User-specific task ownership and authorization
* 🗄️ PostgreSQL database with SQLAlchemy
* 🔄 Alembic database migrations
* 🐳 Docker & Docker Compose backend
* 🧪 Pytest test suite
* ⚡ React + Vite frontend
* 🔁 GitHub Actions CI

## 🛠️ Tech Stack

| Area             | Technology      |
| ---------------- | --------------- |
| Frontend         | React, Vite     |
| Backend          | Python, FastAPI |
| Database         | PostgreSQL      |
| ORM              | SQLAlchemy      |
| Migrations       | Alembic         |
| Authentication   | JWT             |
| Testing          | Pytest          |
| Containerization | Docker          |
| CI               | GitHub Actions  |

## 📁 Project Structure

```text
task-manager-app/
├── .github/
│   └── workflows/
│       └── tests.yml
├── backend/
│   ├── alembic/
│   ├── app/
│   ├── .env.example
│   ├── Dockerfile
│   ├── alembic.ini
│   ├── docker-compose.yml
│   └── requirements.txt
├── frontend/
│   ├── public/
│   ├── src/
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
├── tests/
├── .gitignore
└── README.md
```

## 🚀 Getting Started

### 1. Clone

```bash
git clone https://github.com/parashbisht/task-manager-app.git
cd task-manager-app
```

### 2. Start the Backend

```bash
cd backend
cp .env.example .env
docker compose up
```

Backend:

```text
http://localhost:8000
```

API documentation:

```text
http://localhost:8000/docs
```

API endpoints are available under `/api/v1` (for example, `/api/v1/tasks`). The
original unversioned paths remain available for existing clients.

### 3. Start the Frontend

Open a new terminal:

```bash
cd task-manager-app/frontend
npm install
cp .env.example .env
npm run dev
```

Frontend:

```text
http://localhost:5173
```

## 🧪 Testing

Run the test suite from the project root:

```bash
pytest -v
```

Tests are also automatically executed through **GitHub Actions** on pushes and pull requests targeting `main`.

## 🗄️ Database Migrations

From the `backend` directory:

```bash
alembic upgrade head
```

Create a new migration:

```bash
alembic revision --autogenerate -m "describe change"
```

## 🔐 Environment Variables

Environment files are not committed to Git.

Use the provided examples:

```text
backend/.env.example
frontend/.env.example
```

Create local `.env` files and configure them for your environment. The backend
uses `CORS_ORIGINS` as a comma-separated list of allowed frontend origins.

## 🐳 Docker

From `backend/`:

```bash
docker compose up
```

Stop services:

```bash
docker compose down
```

Rebuild:

```bash
docker compose up --build
```

## 📌 Status

* ✅ Full-stack application
* ✅ Authentication & authorization
* ✅ Task CRUD
* ✅ PostgreSQL integration
* ✅ Database migrations
* ✅ Dockerized backend
* ✅ Automated testing
* ✅ GitHub Actions CI

## 📄 License

This project is intended for learning, development, and portfolio purposes.
