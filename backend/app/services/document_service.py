from PyPDF2 import PdfReader
from docx import Document


def extract_text(file_path):
    text = ""

    if file_path.endswith(".txt"):
        with open(file_path, "r", encoding="utf-8") as f:
            text = f.read()

    elif file_path.endswith(".pdf"):
        pdf = PdfReader(file_path)
        for page in pdf.pages:
            text += page.extract_text() or ""

    elif file_path.endswith(".docx"):
        doc = Document(file_path)
        for para in doc.paragraphs:
            text += para.text + "\n"

    return text