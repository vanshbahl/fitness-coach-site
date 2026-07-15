"""add_training_level

Revision ID: a08876aafb84
Revises: c6c868746967
Create Date: 2026-07-14 23:11:52.670418

"""
from typing import Sequence, Union
from alembic import op

revision: str = 'a08876aafb84'
down_revision: Union[str, Sequence[str], None] = 'c6c868746967'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # IF NOT EXISTS handles partial previous runs where type was created but column wasn't
    op.execute("""
        DO $$
        BEGIN
            IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'traininglevel') THEN
                CREATE TYPE traininglevel AS ENUM (
                    'complete_beginner',
                    'basic_beginner', 
                    'advanced_beginner',
                    'intermediate',
                    'advanced'
                );
            END IF;
        END
        $$;
    """)

    op.execute("""
        ALTER TABLE bookings 
        ADD COLUMN IF NOT EXISTS training_level traininglevel 
        NOT NULL DEFAULT 'advanced_beginner'
    """)


def downgrade() -> None:
    op.execute("ALTER TABLE bookings DROP COLUMN IF EXISTS training_level")
    op.execute("DROP TYPE IF EXISTS traininglevel")