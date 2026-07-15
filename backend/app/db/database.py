from sqlalchemy.ext.asyncio import create_async_engine
from app.core.config import settings

url = settings.get_database_url

# PostgreSQL Connection pooling
engine_kwargs = {
    "echo": settings.DEBUG,
    "future": True,
    "pool_pre_ping": True,
    "pool_size": 5,
    "max_overflow": 10
}

# Create the async engine
engine = create_async_engine(url, **engine_kwargs)
