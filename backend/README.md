# Quick Strength Backend

This is the FastAPI backend for the Quick Strength MVP.

## Setup Instructions

1. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Setup environment variables:
   ```bash
   cp .env.example .env
   ```
   *Edit `.env` with your actual database URL and configuration.*

4. Run database migrations:
   ```bash
   alembic upgrade head
   ```

5. Start the server:
   ```bash
   uvicorn app.main:app --reload
   ```

## Architecture
The application follows a layered architecture:
- `app/api/`: API Routers and Endpoints
- `app/core/`: Application core configuration (settings, security)
- `app/db/`: Database configuration, sessions, and base classes
- `app/models/`: SQLAlchemy ORM models
- `app/schemas/`: Pydantic models for data validation
- `app/services/`: Business logic
- `app/utils/`: Shared utilities

## API Documentation
Once running, interactive API documentation is available at:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`
