# RAG with Pinecone & LangChain (JavaScript + Gemini) 🚀

A minimal, practical guide to Retrieval-Augmented Generation (RAG) using Pinecone for vector search and LangChain (JS) to orchestrate embeddings → retrieval → Gemini-powered generation. Short, focused, and ready to adapt.

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

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Vaibhavvs7/rag-with-pinecone-langchain.git
cd rag-with-pinecone-langchain
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set up Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
GEMINI_API_KEY=your_gemini_api_key
GEMINI_EMBEDDING_MODEL=your_gemini_embedding_model
GEMINI_TEXT_MODEL=your_gemini_text_model
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_INDEX_NAME=your_pinecone_index_name
```

> See [🔑 Important Environment Variables](#-important-environment-variables) for details.

### 4. Run the Project

To start the project (adjust the entry file as needed):

```bash
node index.js
```
_or, if using a script defined in `package.json`:_

```bash
npm run start
```

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

- Use explicit instruction: “Answer only using the context.”
- Tune chunk size (200–800 tokens) and overlap for better retrieval.

---

Happy building — give the model a textbook and it’ll stop guessing.
