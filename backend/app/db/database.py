from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from app.core.config import settings

# Create async engine for PostgreSQL using SQLAlchemy 2.0
engine = create_async_engine(
    settings.DATABASE_URL,
    echo=False,
    future=True,
    pool_pre_ping=True
)

# Async session factory
AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autoflush=False
)

async def get_db():
    """
    FastAPI Dependency that provides an active database session per request.
    Yields an AsyncSession and ensures it is safely closed afterward.
    """
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()
