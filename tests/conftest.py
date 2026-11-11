import os
import warnings

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.engine import Engine
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.database import Base, get_db
from app.main import app


def create_test_engine(database_url: str) -> Engine:
    engine_kwargs = {}
    if database_url.startswith("sqlite"):
        engine_kwargs["connect_args"] = {"check_same_thread": False}
        engine_kwargs["poolclass"] = StaticPool
    return create_engine(database_url, **engine_kwargs)


test_database_url = os.getenv("TEST_DATABASE_URL")
database_url = test_database_url or os.getenv("DATABASE_URL")

if database_url:
    engine = create_test_engine(database_url)
    try:
        with engine.connect():
            pass
    except SQLAlchemyError:
        engine.dispose()
        if test_database_url:
            raise
        warnings.warn(
            "DATABASE_URL is unavailable for tests; falling back to in-memory SQLite.",
            RuntimeWarning,
            stacklevel=2,
        )
        engine = create_test_engine("sqlite:///:memory:")
else:
    engine = create_test_engine("sqlite:///:memory:")

TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


@pytest.fixture(scope="function")
def db_session():
    Base.metadata.create_all(bind=engine)
    session = TestingSessionLocal()
    try:
        yield session
    finally:
        session.close()
        Base.metadata.drop_all(bind=engine)


@pytest.fixture(scope="function")
def client(db_session):
    def override_get_db():
        try:
            yield db_session
        finally:
            pass

    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app) as test_client:
        yield test_client
    app.dependency_overrides.clear()


@pytest.fixture(scope="function")
def auth_headers(client):
    client.post(
        "/auth/signup",
        json={"email": "test@example.com", "password": "mypassword123"},
    )
    login_response = client.post(
        "/auth/login",
        data={"username": "test@example.com", "password": "mypassword123"},
    )
    token = login_response.json()["access_token"]
    return {"Authorization": f"Bearer {token}"}
