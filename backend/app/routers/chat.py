from datetime import datetime

from fastapi import APIRouter
from pydantic import BaseModel

from app.services.ai_service import ask_ai
from app.services.vector_service import search_documents

router = APIRouter(
    prefix="/chat",
    tags=["Chat"]
)

# Store conversation history
chat_history = []


class ChatRequest(BaseModel):
    question: str


@router.post("/")
def chat(request: ChatRequest):

    results = search_documents(request.question)

    if results:
        context = results[0]["content"]
        source = results[0]["source"]
    else:
        context = "No relevant document found."
        source = "N/A"

    answer = ask_ai(
        request.question,
        context
    )

    # Save conversation history
    chat_history.append({
        "question": request.question,
        "answer": answer,
        "source": source,
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    })

    return {
        "question": request.question,
        "answer": answer,
        "source": source
    }


@router.get("/history")
def get_history():
    return {
        "total_conversations": len(chat_history),
        "history": chat_history
    }