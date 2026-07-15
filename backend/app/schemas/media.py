from pydantic import BaseModel, HttpUrl
from typing import Optional

class MediaUploadResult(BaseModel):
    """
    Normalized response structure for any media provider (Cloudinary, S3, R2).
    """
    public_id: str
    secure_url: str
    width: Optional[int] = None
    height: Optional[int] = None
    duration: Optional[float] = None
    bytes: int
    format: str
    resource_type: str
