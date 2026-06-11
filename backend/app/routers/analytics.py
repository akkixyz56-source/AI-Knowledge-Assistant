from fastapi import APIRouter

from app.routers.chat import chat_history

router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"]
)

@router.get("/")
def analytics():

    return {
        "total_documents": 1,
        "total_questions": len(chat_history),
        "recent_conversations": chat_history[-5:]
    }