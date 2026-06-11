from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers.auth import router as auth_router
from app.routers.documents import router as documents_router
from app.routers.chat import router as chat_router
from app.routers.analytics import router as analytics_router

app = FastAPI(
    title="AI Knowledge Assistant"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {
        "message": "AI Knowledge Assistant API Running"
    }

app.include_router(auth_router)
app.include_router(documents_router)
app.include_router(chat_router)
app.include_router(analytics_router)