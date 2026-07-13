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
    
    ENVIRONMENT: str = "development"
    DEBUG: bool = True
    
    # CORS Origins - parsed from JSON string if passed via env
    BACKEND_CORS_ORIGINS: list[str] = ["http://localhost:5173", "http://localhost:3000"]
    
    # Database Configuration
    DATABASE_URL: str
    
    @property
    def get_database_url(self) -> str:
        """
        Dynamically convert synchronous database URLs to their asynchronous equivalents.
        This enables developers to supply 'sqlite:///' or 'postgresql://' seamlessly.
        """
        url = self.DATABASE_URL
        if url.startswith("postgres://"):
            url = url.replace("postgres://", "postgresql://", 1)
        if url.startswith("sqlite://") and not url.startswith("sqlite+aiosqlite://"):
            url = url.replace("sqlite://", "sqlite+aiosqlite://", 1)
        elif url.startswith("postgresql://") and not url.startswith("postgresql+asyncpg://") and not url.startswith("postgresql+psycopg://"):
            url = url.replace("postgresql://", "postgresql+asyncpg://", 1)
        return url
    
    model_config = SettingsConfigDict(
        env_file=".env",
        case_sensitive=True,
        extra="ignore"
    )

settings = Settings()
