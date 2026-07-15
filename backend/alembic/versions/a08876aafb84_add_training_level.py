"""add_training_level

Revision ID: a08876aafb84
Revises: c6c868746967
Create Date: 2026-07-14 23:11:52.670418

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'a08876aafb84'
down_revision: Union[str, Sequence[str], None] = 'c6c868746967'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # Explicitly create the PostgreSQL enum type first.
    # SQLite doesn't need this — PostgreSQL does.
    op.execute(
        "CREATE TYPE traininglevel AS ENUM ("
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
            create_type=False  # We created it manually above
        ),
        server_default="'advanced_beginner'",  # Must be a valid enum value
        nullable=False
    ))


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_column('bookings', 'training_level')
    op.execute("DROP TYPE IF EXISTS traininglevel")