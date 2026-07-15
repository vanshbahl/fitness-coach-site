import cloudinary
from app.core.config import settings

def init_cloudinary():
    """
    Initializes the Cloudinary SDK using credentials from the configuration.
    Raises ValueError if Cloudinary is not properly configured.
    """
    if not settings.CLOUDINARY_CLOUD_NAME or not settings.CLOUDINARY_API_KEY or not settings.CLOUDINARY_API_SECRET:
        raise ValueError("Cloudinary credentials are not set. Media uploads will fail.")
        
    cloudinary.config(
        cloud_name=settings.CLOUDINARY_CLOUD_NAME,
        api_key=settings.CLOUDINARY_API_KEY,
        api_secret=settings.CLOUDINARY_API_SECRET,
        secure=True
    )
