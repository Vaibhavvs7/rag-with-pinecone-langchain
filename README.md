# RAG with Pinecone & LangChain (JavaScript + Gemini) 🚀

A minimal, practical guide to Retrieval-Augmented Generation (RAG) using Pinecone for vector search and LangChain (JS) to orchestrate embeddings → retrieval → Gemini-powered generation. Short, focused, and ready to slot into your repo.

---

## ✨Features

- **Fast semantic search** with Pinecone
- **LangChain JS** to build retrieval + generation chains
- **Google Gemini** for embeddings and text generation
- **Simple provenance:** returns sources & chunk references

---

## 🧰Tech Stack

- **Node.js (JavaScript)**
- **LangChain (JS)**
- **Google Gemini** (embeddings + text)
- **Pinecone** (vector DB)
- _Optional:_ S3 / local storage for raw docs

---

## Small Example (Conceptual)

**CONTEXT:**

- Chunk 1: “Employees may work remotely up to 3 days/week (HR-Policy-2025.pdf, p.4).”
- Chunk 2: “Manager approval required for remote arrangements (HR-Policy-2025.pdf, p.5).”

**QUESTION:**
> What are the 2025 remote-work rules?

**AUGMENTED PROMPT** (sent to Gemini):  
“Using only the context above, answer: What are the 2025 remote-work rules?”

**EXPECTED OUTPUT:**  
“Employees may work remotely up to three days per week and must obtain manager approval. [source: HR-Policy-2025.pdf p.4–5]”

---

## ⚡Quick Usage (3 Steps)

1. **Index documents:** chunk → embed (Gemini) → upsert into Pinecone.
2. **Query:** embed user query → nearest-neighbor search in Pinecone → build prompt with top-K chunks.
3. **Generate:** call Gemini with the augmented prompt and return answer + sources.

---

## 🔑 Important Environment Variables

- `GEMINI_API_KEY`
- `GEMINI_EMBEDDING_MODEL`
- `GEMINI_TEXT_MODEL`
- `PINECONE_API_KEY`
- `PINECONE_INDEX_NAME`

---

## Tips

- Keep temperature low (`0–0.3`) for factual answers.
- Use explicit instruction: “Answer only using the context.”
- Tune chunk size (200–800 tokens) and overlap for better retrieval.

---



---

Happy building — give the model a textbook and it’ll stop guessing.
