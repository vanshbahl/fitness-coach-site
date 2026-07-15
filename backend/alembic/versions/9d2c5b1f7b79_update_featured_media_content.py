"""update_featured_media_content

Revision ID: 9d2c5b1f7b79
Revises: 555c9800770b
Create Date: 2026-07-15 23:44:27.727439

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '9d2c5b1f7b79'
down_revision: Union[str, Sequence[str], None] = '555c9800770b'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.execute(
        "UPDATE featured_media SET "
        "title = '90 Hold', "
        "instagram_url = 'https://www.instagram.com/reel/DZ_oo2avEVn/' "
        "WHERE display_order = 1"
    )
    op.execute(
        "UPDATE featured_media SET "
        "title = 'Handstand', "
        "instagram_url = 'https://www.instagram.com/reel/DJMVhcwCJTw/' "
        "WHERE display_order = 2"
    )
    op.execute(
        "UPDATE featured_media SET "
        "title = 'Compression Strength', "
        "instagram_url = 'https://www.instagram.com/reel/DOBEAGaEiWN/' "
        "WHERE display_order = 3"
    )


def downgrade() -> None:
    """Downgrade schema."""
    pass
