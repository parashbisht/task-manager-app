from fastapi import APIRouter, Depends
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.config import settings
from app.database import get_db

router = APIRouter(tags=["health"])


@router.get("/", summary="Root welcome endpoint")
async def root() -> dict[str, str]:
    return {"message": f"Welcome to {settings.APP_NAME}"}


@router.get("/health", summary="Health check endpoint")
async def health(db: Session = Depends(get_db)) -> dict[str, str]:
    try:
        db.execute(text("SELECT 1"))
        db_status = "healthy"
    except Exception:
        db_status = "unhealthy"
    return {
        "status": "ok" if db_status == "healthy" else "degraded",
        "database": db_status,
        "version": settings.APP_VERSION,
    }
