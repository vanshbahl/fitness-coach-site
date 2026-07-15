"""swap_instagram_urls

Revision ID: acbe68a28975
Revises: 9d2c5b1f7b79
Create Date: 2026-07-15 23:46:13.154096

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'acbe68a28975'
down_revision: Union[str, Sequence[str], None] = '9d2c5b1f7b79'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.execute(
        "UPDATE featured_media SET "
        "instagram_url = 'https://www.instagram.com/reel/DOBEAGaEiWN/' "
        "WHERE display_order = 1"
    )
    op.execute(
        "UPDATE featured_media SET "
        "instagram_url = 'https://www.instagram.com/reel/DZ_oo2avEVn/' "
        "WHERE display_order = 3"
    )


def downgrade() -> None:
    """Downgrade schema."""
    pass
