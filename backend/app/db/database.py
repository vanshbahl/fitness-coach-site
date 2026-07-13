from sqlalchemy.ext.asyncio import create_async_engine
from app.core.config import settings

url = settings.get_database_url
is_sqlite = url.startswith("sqlite")

connect_args = {}
if is_sqlite:
    # SQLite-specific connection arguments
    connect_args["check_same_thread"] = False

# Base engine configuration
engine_kwargs = {
    "echo": settings.DEBUG,
    "future": True,
    "connect_args": connect_args
}

# Connection pooling for PostgreSQL (SQLite doesn't use the same pooling)
if not is_sqlite:
    engine_kwargs["pool_pre_ping"] = True
    engine_kwargs["pool_size"] = 5
    engine_kwargs["max_overflow"] = 10

# Create the async engine
engine = create_async_engine(url, **engine_kwargs)
