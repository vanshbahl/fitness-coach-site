from pydantic import BaseModel, ConfigDict, AnyUrl
from uuid import UUID
from datetime import datetime
from typing import Optional
from app.models.enums import Platform, MediaType

class FeaturedMediaBase(BaseModel):
    title: str
    caption: Optional[str] = None
    instagram_url: Optional[str] = None
    video_url: Optional[str] = None
    cloudinary_public_id: Optional[str] = None
    display_order: int
    is_active: bool = True

class FeaturedMediaCreate(FeaturedMediaBase):
    platform: Platform = Platform.instagram
    media_type: MediaType = MediaType.reel

class FeaturedMediaUpdate(FeaturedMediaBase):
    title: Optional[str] = None
    display_order: Optional[int] = None
    is_active: Optional[bool] = None

class FeaturedMediaResponse(FeaturedMediaBase):
    id: UUID
    platform: Platform
    media_type: MediaType
    created_at: datetime
    updated_at: datetime
    
    model_config = ConfigDict(from_attributes=True)
