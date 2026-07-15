"""Refactor phone number architecture

Revision ID: d7c9d9d9d9d9
Revises: a08876aafb84
Create Date: 2026-07-15 12:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

revision: str = 'd7c9d9d9d9d9'
down_revision: Union[str, Sequence[str], None] = 'a08876aafb84'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column('bookings', sa.Column('country', sa.String(length=2), server_default='IN', nullable=False))
    op.add_column('bookings', sa.Column('country_code', sa.String(), server_default='+91', nullable=False))
    op.add_column('bookings', sa.Column('national_number', sa.String(), nullable=True))

    op.drop_column('bookings', 'whatsapp_number')

    op.alter_column('bookings', 'national_number', nullable=False, server_default='0000000000')
    op.create_index(op.f('ix_bookings_national_number'), 'bookings', ['national_number'], unique=False)


def downgrade() -> None:
    op.add_column('bookings', sa.Column('whatsapp_number', sa.String(), server_default='+910000000000', nullable=False))

    op.drop_index(op.f('ix_bookings_national_number'), table_name='bookings')
    op.drop_column('bookings', 'national_number')
    op.drop_column('bookings', 'country_code')
    op.drop_column('bookings', 'country')