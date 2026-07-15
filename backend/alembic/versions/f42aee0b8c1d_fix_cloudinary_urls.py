"""fix_cloudinary_urls

Revision ID: f42aee0b8c1d
Revises: 4ed5e9b5f8fd
Create Date: 2026-07-15 23:20:16.238642

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'f42aee0b8c1d'
down_revision: Union[str, Sequence[str], None] = '4ed5e9b5f8fd'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    from app.core.config import settings
    from app.core.cloudinary import init_cloudinary
    import cloudinary.utils

    # Ensure Cloudinary is initialized so the SDK knows the cloud_name
    init_cloudinary()

    public_ids = [
        (1, "quick-strength/reels/90-hold"),
        (2, "quick-strength/reels/handstand"),
        (3, "quick-strength/reels/compression-strength")
    ]

    for order, pid in public_ids:
        # Generate the secure URL dynamically
        url, _ = cloudinary.utils.cloudinary_url(pid, resource_type="video", format="mp4", secure=True)
        
        op.execute(
            f"UPDATE featured_media SET "
            f"video_url = '{url}' "
            f"WHERE display_order = {order}"
        )


def downgrade() -> None:
    """Downgrade schema."""
    pass
