"""add task owner id index

Revision ID: 7f49c8d42e11
Revises: 5dd27e3db5da
Create Date: 2026-11-12 04:16:00.000000

"""
from typing import Sequence, Union

from alembic import op


revision: str = "7f49c8d42e11"
down_revision: Union[str, Sequence[str], None] = "5dd27e3db5da"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_index("ix_tasks_owner_id", "tasks", ["owner_id"], unique=False)


def downgrade() -> None:
    op.drop_index("ix_tasks_owner_id", table_name="tasks")
