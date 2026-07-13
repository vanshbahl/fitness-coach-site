from fastapi import APIRouter

router = APIRouter()

@router.get("", response_model=dict)
async def health_check():
    """
    Health check endpoint to ensure the API is running and responsive.
    Useful for uptime monitoring and container orchestration (e.g., Kubernetes).
    """
    return {
        "status": "ok",
        "message": "Quick Strength API is healthy"
    }
