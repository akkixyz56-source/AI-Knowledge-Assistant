from fastapi import APIRouter, UploadFile, File
import os

from app.services.document_service import extract_text
from app.services.vector_service import add_document

router = APIRouter(
    prefix="/documents",
    tags=["Documents"]
)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@router.post("/upload")
async def upload_document(file: UploadFile = File(...)):

    file_path = os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )

    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    text = extract_text(file_path)

    # Add document to vector database
    add_document(
        text,
        file.filename
    )

    return {
        "filename": file.filename,
        "message": "Uploaded successfully",
        "text_preview": text[:500]
    }


@router.get("/")
def get_documents():

    files = os.listdir(UPLOAD_FOLDER)

    documents = []

    for index, filename in enumerate(files, start=1):
        documents.append(
            {
                "id": index,
                "filename": filename
            }
        )

    return documents


@router.delete("/{document_id}")
def delete_document(document_id: int):

    files = os.listdir(UPLOAD_FOLDER)

    if document_id < 1 or document_id > len(files):
        return {
            "error": "Document not found"
        }

    filename = files[document_id - 1]

    os.remove(
        os.path.join(
            UPLOAD_FOLDER,
            filename
        )
    )

    return {
        "message": f"{filename} deleted successfully"
    }