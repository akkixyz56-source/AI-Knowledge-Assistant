from sentence_transformers import SentenceTransformer
import faiss
import numpy as np

model = SentenceTransformer("all-MiniLM-L6-v2")

documents = []
document_sources = []

embedding_dimension = 384
index = faiss.IndexFlatL2(embedding_dimension)


def add_document(text, source):
    embedding = model.encode([text])

    index.add(np.array(embedding).astype("float32"))

    documents.append(text)
    document_sources.append(source)


def search_documents(query, k=1):
    if len(documents) == 0:
        return None

    query_embedding = model.encode([query])

    distances, indices = index.search(
        np.array(query_embedding).astype("float32"),
        k
    )

    results = []

    for idx in indices[0]:
        if idx < len(documents):
            results.append({
                "content": documents[idx],
                "source": document_sources[idx]
            })

    return results