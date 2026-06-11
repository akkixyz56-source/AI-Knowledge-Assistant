# AI-Powered Knowledge Assistant

## Project Overview

AI-Powered Knowledge Assistant is a web application that allows users to upload documents and ask questions about their content using AI. The system processes uploaded documents, stores embeddings in a FAISS vector database, retrieves relevant document sections, and provides answers based on the uploaded content.

---

## Features

### Document Management
- Upload PDF, DOCX, and TXT documents
- View uploaded documents
- Delete uploaded documents
- Process and store document content

### AI Question Answering
- Ask questions about uploaded documents
- Retrieve relevant document sections using semantic search
- Generate answers based only on uploaded documents
- Display source references

### Search & Retrieval
- Semantic document search using embeddings
- FAISS vector database for similarity search
- Context retrieval for accurate answers

### Analytics Dashboard
- Total uploaded documents
- Total questions asked
- Activity tracking

### Frontend
- Modern React UI
- Document upload interface
- AI chat interface
- Analytics section
- Responsive design

---

# Technology Stack

## Backend
- Python
- FastAPI
- FAISS
- Sentence Transformers
- Uvicorn

## Frontend
- React
- JavaScript
- CSS

## AI & Search
- Hugging Face Sentence Transformers
- all-MiniLM-L6-v2 Model
- FAISS Vector Search

---

# Project Structure

```text
ai-knowledge-assistant/
│
├── backend/
│   ├── main.py
│   ├── documents.py
│   ├── vector_service.py
│   ├── uploads/
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# System Architecture

1. User uploads a document.
2. Backend extracts document text.
3. Sentence Transformer generates embeddings.
4. Embeddings are stored in FAISS.
5. User asks a question.
6. Question embedding is generated.
7. FAISS retrieves the most relevant document content.
8. Retrieved content is used to generate the response.
9. Answer is displayed in the frontend.

---

# AI Workflow

## Step 1: Upload Document

User uploads a PDF, DOCX, or TXT file.

## Step 2: Text Extraction

The backend extracts text content from the document.

## Step 3: Generate Embeddings

```python
model = SentenceTransformer("all-MiniLM-L6-v2")
embedding = model.encode([text])
```

## Step 4: Store in FAISS

```python
index.add(embedding)
```

## Step 5: User Asks Question

Example:

```text
What is the notice period?
```

## Step 6: Semantic Search

```python
query_embedding = model.encode([query])
distances, indices = index.search(query_embedding, 1)
```

## Step 7: Retrieve Context

Most relevant document content is retrieved.

## Step 8: Generate Response

The answer is generated using retrieved document information.

---

# API Documentation

## Upload Document

### POST /documents/upload

Uploads a document.

Request:

```text
multipart/form-data
file
```

Response:

```json
{
  "message": "Document uploaded successfully"
}
```

---

## Get Documents

### GET /documents

Response:

```json
[
  {
    "id": 1,
    "filename": "policy.pdf"
  }
]
```

---

## Delete Document

### DELETE /documents/{id}

Response:

```json
{
  "message": "Document deleted successfully"
}
```

---

## Ask Question

### POST /chat

Request:

```json
{
  "question": "What is the notice period?"
}
```

Response:

```json
{
  "answer": "The notice period is 60 days."
}
```

---

## Analytics

### GET /analytics

Response:

```json
{
  "total_documents": 5,
  "total_questions": 12
}
```

---

# Installation Guide

## Backend Setup

Install dependencies:

```bash
pip install -r requirements.txt
```

Run FastAPI server:

```bash
uvicorn main:app --reload
```

Backend URL:

```text
http://127.0.0.1:8000
```

Swagger API Documentation:

```text
http://127.0.0.1:8000/docs
```

---

## Frontend Setup

Install dependencies:

```bash
npm install
```

Run React application:

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

---

# Example Usage

### Example Document

Company Leave Policy

- Employees are entitled to 12 paid leaves per year.
- Notice period is 60 days.

### Example Question

```text
What is the notice period?
```

### Example Response

```text
The notice period is 60 days.
```

---

# Current Implemented Features

✅ Upload Documents

✅ View Documents

✅ Delete Documents

✅ AI Question Answering

✅ Semantic Search with FAISS

✅ Source Retrieval

✅ Analytics Dashboard

✅ React Frontend

✅ FastAPI Backend

---

# Future Enhancements

- User Registration
- Login System
- JWT Authentication
- Multi-user Support
- Conversation History
- OpenAI Integration
- Gemini Integration
- OCR for Scanned PDFs
- Streaming AI Responses
- Docker Deployment
- Role-Based Access Control

---

# Deliverables

This repository contains:

- Backend Source Code
- Frontend Source Code
- README Documentation
- API Documentation
- AI Workflow Explanation
- Project Architecture Overview

---

# Conclusion

The AI-Powered Knowledge Assistant demonstrates the implementation of document management, semantic search, vector databases, and AI-powered question answering using FastAPI, React, Sentence Transformers, and FAISS. The application enables users to upload documents, retrieve relevant information efficiently, and receive accurate answers based on uploaded content.
