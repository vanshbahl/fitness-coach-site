"""fix_cloudinary_urls_real_assets

Revision ID: 555c9800770b
Revises: f42aee0b8c1d
Create Date: 2026-07-15 23:41:59.368951

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '555c9800770b'
down_revision: Union[str, Sequence[str], None] = 'f42aee0b8c1d'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    from app.core.config import settings
    from app.core.cloudinary import init_cloudinary
    import cloudinary.api

    init_cloudinary()

    # Map display_order to the actual Cloudinary public_ids
    public_ids = {
        1: "90-hold_viyzju",
        2: "handstand_usqcfy",
        3: "compression-strength_ptwpm5"
    }

    for order, pid in public_ids.items():
        # Fetch the exact asset from Cloudinary
        res = cloudinary.api.resource(pid, resource_type="video")
        exact_secure_url = res.get("secure_url")
        
        # Update both the public ID and the exact video URL without manual construction
        op.execute(
            f"UPDATE featured_media SET "
            f"cloudinary_public_id = '{pid}', "
            f"video_url = '{exact_secure_url}' "
            f"WHERE display_order = {order}"
        )


def downgrade() -> None:
    """Downgrade schema."""
    pass
