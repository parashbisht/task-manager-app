"""Seed script to create a demo user with sample tasks.

Run with: python backend/seed.py
"""
from sqlalchemy.orm import Session
from app.database import engine, Base
from app.crud import create_user, create_task
from app.schemas import UserCreate, TaskCreate
from app.security import hash_password
from datetime import datetime, timedelta


def seed_demo_data() -> None:
    """Create demo user and sample tasks."""
    # Create all tables
    Base.metadata.create_all(bind=engine)

    db: Session = Session(bind=engine, autoflush=False, autocommit=False)

    try:
        # Demo user credentials
        demo_email = "demo@taskflow.com"
        demo_password = "demo1234"

        # Check if user already exists
        from app.crud import get_user_by_email
        existing_user = get_user_by_email(db, demo_email)
        if existing_user:
            print(f"User {demo_email} already exists, skipping creation.")
        else:
            user_data = UserCreate(email=demo_email, password=demo_password)
            user = create_user(db, user_data)
            print(f"Created user: {demo_email} (id={user.id})")

        # Create 5–6 realistic sample tasks
        tasks = [
            TaskCreate(
                title="Finish FastAPI authentication module",
                description="Implement JWT auth with refresh tokens and password reset",
                owner_id=1,
            ),
            TaskCreate(
                title="Design PostgreSQL schema for task ownership",
                description="Set up users table with email uniqueness and tasks with foreign key",
                owner_id=1,
            ),
            TaskCreate(
                title="Write Pytest test suite for task CRUD",
                description="Cover create, read, update, delete operations with edge cases",
                owner_id=1,
            ),
            TaskCreate(
                title="Configure CI/CD with GitHub Actions",
                description="Add pytest workflow and Docker build/push steps",
                owner_id=1,
            ),
            TaskCreate(
                title="Integrate Tailwind CSS into React Vite frontend",
                description="Set up responsive design and component library",
                owner_id=1,
            ),
            TaskCreate(
                title="Deploy backend to Render.com",
                description="Configure PostgreSQL database and environment variables",
                owner_id=1,
            ),
        ]

        for task_data in tasks:
            # Set owner_id=1 for the demo user
            task = create_task(db, task_data, owner_id=1)
            print(f"Created task: {task.title}")

        db.commit()
        print("\nSeed data created successfully!")
        print(f"Login with: demo@taskflow.com / demo1234")

    finally:
        db.close()


if __name__ == "__main__":
    seed_demo_data()