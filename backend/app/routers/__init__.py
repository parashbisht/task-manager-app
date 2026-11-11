from app.api.v1.endpoints.auth import router as auth_router
from app.api.v1.endpoints.health import router as health_router
from app.api.v1.endpoints.tasks import router as tasks_router

__all__ = ["auth_router", "health_router", "tasks_router"]
