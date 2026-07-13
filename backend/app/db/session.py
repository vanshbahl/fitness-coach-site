from sqlalchemy.ext.asyncio import async_sessionmaker, AsyncSession
from typing import AsyncGenerator
from app.db.database import engine

# Async session factory
SessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autoflush=False
)

async def get_db() -> AsyncGenerator[AsyncSession, None]:
    """
    FastAPI Dependency to get the database session.
    Yields an AsyncSession and ensures it is safely closed after the request.
    """
    async with SessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()
