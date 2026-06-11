def ask_ai(question, context):
    """
    Simple AI service without transformers.
    Returns a response using uploaded document context.
    """

    if not context:
        context = "No document uploaded."

    response = f"""
Question:
{question}

Context:
{context}

Answer:
Based on the uploaded document, this is the available information.
"""

    return response