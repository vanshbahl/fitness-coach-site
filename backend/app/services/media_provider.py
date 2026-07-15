from abc import ABC, abstractmethod
from typing import Optional
import cloudinary.uploader
import cloudinary.api

from app.schemas.media import MediaUploadResult

class MediaProvider(ABC):
    """
    Abstract Base Class for all Media Providers.
    Ensures vendor independence (Cloudinary, S3, R2).
    """
    @abstractmethod
    async def upload_video(self, file_content: bytes, folder: str) -> MediaUploadResult:
        pass
    
    @abstractmethod
    async def delete_asset(self, public_id: str, resource_type: str = "video") -> bool:
        pass


class CloudinaryProvider(MediaProvider):
    """
    Cloudinary-specific implementation of the MediaProvider interface.
    """
    async def upload_video(self, file_content: bytes, folder: str) -> MediaUploadResult:
        # Note: cloudinary.uploader.upload accepts file paths, urls, or file-like objects (bytes)
        # To avoid blocking the event loop on large uploads, this should ideally be run in a threadpool,
        # but for now we wrap it synchronously or use standard async-to-sync wrapping if needed.
        # Since cloudinary SDK is sync, we execute it directly here for the prototype.
        
        response = cloudinary.uploader.upload(
            file_content,
            resource_type="video",
            folder=folder,
            chunk_size=6000000, # 6MB chunk size for large videos
        )
        
        return MediaUploadResult(
            public_id=response.get("public_id"),
            secure_url=response.get("secure_url"),
            width=response.get("width"),
            height=response.get("height"),
            duration=response.get("duration"),
            bytes=response.get("bytes"),
            format=response.get("format"),
            resource_type=response.get("resource_type")
        )
        
    async def delete_asset(self, public_id: str, resource_type: str = "video") -> bool:
        response = cloudinary.uploader.destroy(
            public_id=public_id,
            resource_type=resource_type
        )
        return response.get("result") == "ok"
