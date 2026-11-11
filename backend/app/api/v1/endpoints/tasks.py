from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app import crud
from app.database import get_db
from app.deps import get_current_user
from app.models import User
from app.schemas import Message, TaskCreate, TaskResponse, TaskUpdate

router = APIRouter(prefix="/tasks", tags=["tasks"])


@router.get(
    "",
    response_model=list[TaskResponse],
    summary="List all tasks for the current user",
)
async def list_tasks(
    skip: int = Query(default=0, ge=0, description="Number of tasks to skip"),
    limit: int = Query(default=100, ge=1, le=100, description="Maximum tasks to return"),
    completed: bool | None = Query(
        default=None, description="Filter by completion status"
    ),
    search: str | None = Query(
        default=None, max_length=100, description="Search in title or description"
    ),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> list[TaskResponse]:
    return crud.get_all_tasks(
        db,
        owner_id=current_user.id,
        skip=skip,
        limit=limit,
        completed=completed,
        search=search,
    )


@router.get(
    "/{task_id}",
    response_model=TaskResponse,
    summary="Get a specific task by ID",
)
async def get_task(
    task_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> TaskResponse:
    task = crud.get_task_by_id(db, task_id, owner_id=current_user.id)
    if task is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Task with id {task_id} was not found",
        )
    return task


@router.post(
    "",
    response_model=TaskResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Create a new task",
)
async def create_task(
    task_data: TaskCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> TaskResponse:
    return crud.create_task(db, task_data, owner_id=current_user.id)


@router.put(
    "/{task_id}",
    response_model=TaskResponse,
    summary="Update an existing task",
)
async def update_task(
    task_id: int,
    task_data: TaskUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> TaskResponse:
    task = crud.get_task_by_id(db, task_id, owner_id=current_user.id)
    if task is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Task with id {task_id} was not found",
        )
    return crud.update_task(db, task, task_data)


@router.patch(
    "/{task_id}/complete",
    response_model=TaskResponse,
    summary="Mark a task as completed",
)
async def complete_task(
    task_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> TaskResponse:
    task = crud.get_task_by_id(db, task_id, owner_id=current_user.id)
    if task is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Task with id {task_id} was not found",
        )
    if task.completed:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Task with id {task_id} is already completed",
        )
    return crud.mark_task_completed(db, task)


@router.delete(
    "/{task_id}",
    response_model=Message,
    summary="Delete a task",
)
async def delete_task(
    task_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> Message:
    task = crud.get_task_by_id(db, task_id, owner_id=current_user.id)
    if task is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Task with id {task_id} was not found",
        )
    crud.delete_task(db, task)
    return Message(message=f"Task with id {task_id} was deleted successfully")
