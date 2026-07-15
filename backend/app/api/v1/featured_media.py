from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List

from app.db.session import get_db
from app.models.featured_media import FeaturedMedia
from app.schemas.featured_media import FeaturedMediaResponse

router = APIRouter()

@router.get("", response_model=List[FeaturedMediaResponse])
async def get_featured_media(db: AsyncSession = Depends(get_db)):
    """
    Get active featured media, ordered by display_order.
    """
    stmt = (
        select(FeaturedMedia)
        .where(FeaturedMedia.is_active == True)
        .order_by(FeaturedMedia.display_order.asc())
    )
    result = await db.execute(stmt)
    return result.scalars().all()
