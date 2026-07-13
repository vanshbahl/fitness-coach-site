from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import AnyHttpUrl, parse_obj_as
import json

class Settings(BaseSettings):
    """
    Application settings managed via pydantic-settings.
    Values can be loaded from environment variables or a .env file.
    """
    PROJECT_NAME: str = "Quick Strength API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    # CORS Origins - parsed from JSON string if passed via env
    BACKEND_CORS_ORIGINS: list[str] = ["http://localhost:5173", "http://localhost:3000"]
    
    # Database Configuration
    # Uses asyncpg driver for asynchronous database access
    DATABASE_URL: str
    
    model_config = SettingsConfigDict(
        env_file=".env",
        case_sensitive=True,
        extra="ignore"
    )

settings = Settings()
