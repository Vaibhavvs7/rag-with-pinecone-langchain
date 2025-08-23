# RAG with Pinecone & LangChain (JavaScript + Gemini) 🚀

A complete RAG (Retrieval-Augmented Generation) application with a modern React.js frontend and Express.js backend for uploading PDFs and chatting with their content.

## ✨ Features

- **Modern Web UI**: React.js frontend with Material-UI design
- **Two-Panel Layout**: Left panel for PDF upload, right panel for chat
- **Fast semantic search** with Pinecone
- **LangChain JS** to build retrieval + generation chains
- **Google Gemini** for embeddings and text generation
- **Simple provenance:** returns sources & chunk references
- **Drag & Drop Upload**: Easy PDF file upload interface
- **Real-time Chat**: Interactive chat with your PDF documents

---

## 🧰 Tech Stack

### Frontend
- **React.js 18**
- **Material-UI (MUI)**
- **Axios** for API communication
- **React Dropzone** for file uploads

### Backend
- **Node.js (JavaScript)**
- **Express.js** API server
- **LangChain (JS)**
- **Google Gemini** (embeddings + text)
- **Pinecone** (vector DB)
- **Multer** for file uploads

---

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- Google Gemini API key
- Pinecone account and API key

### 1. Clone the Repository

```bash
git clone https://github.com/Vaibhavvs7/rag-with-pinecone-langchain.git
cd rag-with-pinecone-langchain
```

### 2. Install Dependencies

```bash
# Install all dependencies (root, backend, frontend)
npm run install-all
```

Or install manually:
```bash
# Root dependencies
npm install --legacy-peer-deps

# Backend dependencies  
cd backend && npm install --legacy-peer-deps

# Frontend dependencies
cd ../frontend && npm install
```

### 3. Set up Environment Variables

Create a `.env` file in the root directory:

```env
GEMINI_API_KEY=your_gemini_api_key_here
PINECONE_API_KEY=your_pinecone_api_key_here
PINECONE_INDEX_NAME=your_pinecone_index_name_here
PORT=5000
```

> Get your API keys:
> - **Gemini API**: https://makersuite.google.com/app/apikey
> - **Pinecone**: https://pinecone.io/

### 4. Run the Application

#### Option 1: Run both frontend and backend together
```bash
npm run dev
```

#### Option 2: Run separately
```bash
# Terminal 1 - Backend
npm run backend

# Terminal 2 - Frontend  
npm run frontend
```

### 5. Open the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

---

## 📖 Usage

1. **Upload a PDF**: 
   - Drag and drop a PDF file into the left panel
   - Or click to select a file from your computer
   - Wait for the file to be processed and indexed

2. **Start Chatting**:
   - Once the PDF is uploaded, the chat interface becomes active
   - Type questions about the document content in the right panel
   - Get AI-powered responses based on the document

3. **Example Questions**:
   - "What is this document about?"
   - "Summarize the main points"
   - "Explain [specific topic] from the document"

---

## 🏗️ Project Structure

```
├── frontend/                 # React.js frontend application
│   ├── src/
│   │   ├── components/
│   │   │   ├── PdfUpload.js     # PDF upload component
│   │   │   └── ChatInterface.js # Chat interface component
│   │   ├── App.js               # Main application component
│   │   └── ...
│   └── package.json
├── backend/                  # Express.js backend API
│   ├── server.js                # Main server file
│   ├── uploads/                 # Uploaded PDF files (auto-created)
│   └── package.json
├── index.js                  # Original CLI indexing script
├── query.js                  # Original CLI query script
├── package.json              # Root package.json with scripts
└── .env.example              # Environment variables template
```

---

## 🔧 API Endpoints

### Backend API (`http://localhost:5000/api`)

- `GET /health` - Health check
- `POST /upload-pdf` - Upload and index PDF document
- `POST /chat` - Send chat message and get AI response
- `GET /chat-history` - Get conversation history
- `DELETE /chat-history` - Clear conversation history

---

## ⚡ Quick Usage (3 Steps)

1. **Index documents:** Upload PDF → chunk → embed (Gemini) → upsert into Pinecone
2. **Query:** User question → embed query → nearest-neighbor search in Pinecone → build prompt with top-K chunks
3. **Generate:** Call Gemini with the augmented prompt and return answer + sources

---

## 🔑 Important Environment Variables

- `GEMINI_API_KEY` - Your Google Gemini API key
- `PINECONE_API_KEY` - Your Pinecone API key  
- `PINECONE_INDEX_NAME` - Your Pinecone index name
- `PORT` - Backend server port (default: 5000)

---

## 🎯 Features in Detail

### PDF Upload Component
- Drag & drop interface
- File validation (PDF only)
- Upload progress indication
- Processing status updates
- File information display

### Chat Interface Component
- Real-time messaging
- Message history
- AI response handling
- Error handling
- Context indicators

---

## 💡 Tips

- Use explicit instruction: "Answer only using the context."
- Tune chunk size (200–800 tokens) and overlap for better retrieval
- Larger PDFs will take longer to process initially
- Chat history is maintained during the session

---

## 📱 Screenshots

The application features a clean, two-panel interface:
- **Left Panel**: PDF upload with drag & drop functionality
- **Right Panel**: Chat interface for asking questions about your PDF

---

## 🛠️ Development

### Available Scripts (Root)
- `npm run dev` - Run both frontend and backend
- `npm run frontend` - Run only frontend
- `npm run backend` - Run only backend  
- `npm run install-all` - Install all dependencies

### Available Scripts (Frontend)
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests

### Available Scripts (Backend)
- `npm start` - Start server
- `npm run dev` - Start with nodemon (auto-restart)

---

## 🚧 Original CLI Version

The original CLI scripts are still available:
- `index.js` - Index a PDF document
- `query.js` - Query via command line

---

Happy building — give the model a textbook and it'll stop guessing! 🎉