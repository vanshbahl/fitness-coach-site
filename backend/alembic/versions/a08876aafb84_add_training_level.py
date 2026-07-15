"""add_training_level

Revision ID: a08876aafb84
Revises: c6c868746967
Create Date: 2026-07-14 23:11:52.670418

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = 'a08876aafb84'
down_revision: Union[str, Sequence[str], None] = 'c6c868746967'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # IF NOT EXISTS handles the case where a previous
    # partial migration already created the type before crashing
    op.execute(
        "CREATE TYPE IF NOT EXISTS traininglevel AS ENUM ("
        "'complete_beginner', 'basic_beginner', 'advanced_beginner', "
        "'intermediate', 'advanced'"
        ")"
    )

    op.add_column('bookings', sa.Column(
        'training_level',
        sa.Enum(
            'complete_beginner', 'basic_beginner', 'advanced_beginner',
            'intermediate', 'advanced',
            name='traininglevel',
            create_type=False
        ),
        server_default=sa.text("'advanced_beginner'"),  # ← sa.text() prevents double-quoting
        nullable=False
    ))


def downgrade() -> None:
    op.drop_column('bookings', 'training_level')
    op.execute("DROP TYPE IF EXISTS traininglevel")