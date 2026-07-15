from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List
from uuid import UUID

from app.db.session import get_db
from app.models.featured_media import FeaturedMedia
from app.schemas.featured_media import FeaturedMediaResponse, FeaturedMediaCreate, FeaturedMediaUpdate

router = APIRouter()

@router.get("/featured-media", response_model=List[FeaturedMediaResponse])
async def get_all_featured_media(db: AsyncSession = Depends(get_db)):
    stmt = select(FeaturedMedia).order_by(FeaturedMedia.display_order.asc())
    result = await db.execute(stmt)
    return result.scalars().all()

@router.post("/featured-media", response_model=FeaturedMediaResponse)
async def create_featured_media(media_in: FeaturedMediaCreate, db: AsyncSession = Depends(get_db)):
    db_media = FeaturedMedia(**media_in.model_dump())
    db.add(db_media)
    await db.commit()
    await db.refresh(db_media)
    return db_media

@router.put("/featured-media/{media_id}", response_model=FeaturedMediaResponse)
async def update_featured_media(media_id: UUID, media_in: FeaturedMediaUpdate, db: AsyncSession = Depends(get_db)):
    stmt = select(FeaturedMedia).where(FeaturedMedia.id == media_id)
    result = await db.execute(stmt)
    db_media = result.scalar_one_or_none()
    
    if not db_media:
        raise HTTPException(status_code=404, detail="Media not found")
        
    update_data = media_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_media, field, value)
        
    await db.commit()
    await db.refresh(db_media)
    return db_media

@router.delete("/featured-media/{media_id}")
async def delete_featured_media(media_id: UUID, db: AsyncSession = Depends(get_db)):
    stmt = select(FeaturedMedia).where(FeaturedMedia.id == media_id)
    result = await db.execute(stmt)
    db_media = result.scalar_one_or_none()
    
    if not db_media:
        raise HTTPException(status_code=404, detail="Media not found")
        
    await db.delete(db_media)
    await db.commit()
    return {"success": True, "message": "Media deleted successfully"}
