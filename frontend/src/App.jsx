import { useState, useEffect } from "react";

const API = "http://127.0.0.1:8000";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [documents, setDocuments] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [file, setFile] = useState(null);

  const loadDocuments = async () => {
    try {
      const res = await fetch(`${API}/documents/`);
      const data = await res.json();
      setDocuments(data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadAnalytics = async () => {
    try {
      const res = await fetch(`${API}/analytics/`);
      const data = await res.json();
      setAnalytics(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadDocuments();
    loadAnalytics();
  }, []);

  const uploadDocument = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await fetch(`${API}/documents/upload`, {
        method: "POST",
        body: formData,
      });

      alert("✅ Document Uploaded Successfully");

      loadDocuments();
      loadAnalytics();
    } catch (error) {
      console.error(error);
    }
  };

  const askQuestion = async () => {
    if (!question) {
      alert("Enter a question");
      return;
    }

    try {
      const res = await fetch(`${API}/chat/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question,
        }),
      });

      const data = await res.json();

      setAnswer(data.answer);

      loadAnalytics();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteDocument = async (id) => {
    try {
      await fetch(`${API}/documents/${id}`, {
        method: "DELETE",
      });

      loadDocuments();
      loadAnalytics();
    } catch (error) {
      console.error(error);
    }
  };

  const styles = {
    page: {
      minHeight: "100vh",
      background:
        "linear-gradient(135deg,#0f172a,#1e293b,#334155)",
      color: "white",
      padding: "30px",
      fontFamily: "Segoe UI, sans-serif",
    },

    title: {
      textAlign: "center",
      fontSize: "48px",
      fontWeight: "700",
      marginBottom: "30px",
    },

    subtitle: {
      textAlign: "center",
      color: "#cbd5e1",
      marginBottom: "40px",
    },

    card: {
      background: "#1e293b",
      borderRadius: "16px",
      padding: "25px",
      marginBottom: "25px",
      boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
    },

    sectionTitle: {
      marginBottom: "15px",
      color: "#f8fafc",
    },

    input: {
      width: "100%",
      padding: "14px",
      borderRadius: "10px",
      border: "1px solid #475569",
      background: "#0f172a",
      color: "white",
      marginBottom: "15px",
      boxSizing: "border-box",
    },

    button: {
      background: "#3b82f6",
      color: "white",
      border: "none",
      padding: "12px 22px",
      borderRadius: "10px",
      cursor: "pointer",
      fontWeight: "bold",
      fontSize: "14px",
    },

    deleteButton: {
      background: "#ef4444",
      color: "white",
      border: "none",
      padding: "8px 14px",
      borderRadius: "8px",
      cursor: "pointer",
    },

    analyticsGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "20px",
    },

    analyticsCard: {
      background: "#334155",
      borderRadius: "12px",
      padding: "20px",
      textAlign: "center",
    },

    analyticsNumber: {
      fontSize: "36px",
      fontWeight: "bold",
      color: "#60a5fa",
    },

    answerBox: {
      background: "#0f172a",
      border: "1px solid #334155",
      borderRadius: "12px",
      padding: "15px",
      marginTop: "20px",
      whiteSpace: "pre-wrap",
      minHeight: "120px",
      color: "#e2e8f0",
    },

    documentRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      background: "#334155",
      padding: "12px",
      borderRadius: "10px",
      marginBottom: "10px",
    },
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>
        🤖 AI Knowledge Assistant
      </h1>

      <p style={styles.subtitle}>
        Upload documents and ask AI questions
      </p>

      {/* Upload Section */}
      <div style={styles.card}>
        <h2 style={styles.sectionTitle}>
          📄 Upload Document
        </h2>

        <input
          type="file"
          onChange={(e) =>
            setFile(e.target.files[0])
          }
        />

        <br />
        <br />

        <button
          style={styles.button}
          onClick={uploadDocument}
        >
          Upload Document
        </button>
      </div>

      {/* Ask Question */}
      <div style={styles.card}>
        <h2 style={styles.sectionTitle}>
          💬 Ask AI
        </h2>

        <input
          type="text"
          placeholder="Ask a question from uploaded documents..."
          value={question}
          onChange={(e) =>
            setQuestion(e.target.value)
          }
          style={styles.input}
        />

        <button
          style={styles.button}
          onClick={askQuestion}
        >
          Ask AI
        </button>

        {answer && (
          <div style={styles.answerBox}>
            {answer}
          </div>
        )}
      </div>

      {/* Analytics */}
      {analytics && (
        <div style={styles.card}>
          <h2 style={styles.sectionTitle}>
            📊 Analytics Dashboard
          </h2>

          <div style={styles.analyticsGrid}>
            <div style={styles.analyticsCard}>
              <h3>Total Documents</h3>

              <div style={styles.analyticsNumber}>
                {analytics.total_documents}
              </div>
            </div>

            <div style={styles.analyticsCard}>
              <h3>Total Questions</h3>

              <div style={styles.analyticsNumber}>
                {analytics.total_questions}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Documents */}
      <div style={styles.card}>
        <h2 style={styles.sectionTitle}>
          📚 Uploaded Documents
        </h2>

        {documents.length === 0 ? (
          <p>No documents uploaded.</p>
        ) : (
          documents.map((doc) => (
            <div
              key={doc.id}
              style={styles.documentRow}
            >
              <span>
                📄 {doc.filename}
              </span>

              <button
                style={styles.deleteButton}
                onClick={() =>
                  deleteDocument(doc.id)
                }
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;