from fastapi import UploadFile
from app.schemas.media import MediaUploadResult
from app.services.media_provider import MediaProvider, CloudinaryProvider
from app.core.exceptions import QuickStrengthException

class MediaService:
    """
    Central service for handling all media uploads and validation.
    Delegates the actual storage to the injected MediaProvider.
    """
    def __init__(self, provider: MediaProvider = None):
        # Default to Cloudinary Provider for now, but can be swapped (e.g. S3Provider)
        self.provider = provider or CloudinaryProvider()
        
    async def upload_reel_video(self, file: UploadFile) -> MediaUploadResult:
        """
        Validates and uploads a video to the reels folder.
        """
        # Validation 1: File size (40 MB limit)
        # Note: We read the file into memory to check size and pass to provider.
        # For extremely large files, streaming is preferred, but 40MB fits in memory safely.
        file_bytes = await file.read()
        max_size = 40 * 1024 * 1024 # 40 MB
        
        if len(file_bytes) > max_size:
            raise QuickStrengthException(
                status_code=400,
                detail="File size exceeds the 40MB limit."
            )
            
        # Validation 2: File type (MP4 and Video)
        if file.content_type not in ["video/mp4", "video/quicktime"]:
            raise QuickStrengthException(
                status_code=400,
                detail="Only MP4 or MOV video formats are supported."
            )
            
        # If we need deeper validation (like actual codec inspection), we would do it here
        # using a library like python-magic or ffmpeg-python.
            
        # Upload using the provider
        # Step 5: Uploads should go into "quick-strength/reels"
        folder = "quick-strength/reels"
        
        try:
            # We pass the raw bytes directly to the provider
            result = await self.provider.upload_video(file_bytes, folder=folder)
            return result
        except Exception as e:
            # Catch raw provider errors and normalize them for the application
            raise QuickStrengthException(
                status_code=500,
                detail=f"Media upload failed: {str(e)}"
            )
            
    async def delete_reel_video(self, public_id: str) -> bool:
        """
        Deletes a video from the provider.
        """
        try:
            return await self.provider.delete_asset(public_id=public_id, resource_type="video")
        except Exception as e:
            raise QuickStrengthException(
                status_code=500,
                detail=f"Media deletion failed: {str(e)}"
            )
