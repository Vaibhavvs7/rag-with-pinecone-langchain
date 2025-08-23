# RAG Backend API

Express.js backend server for the RAG PDF Chat application.

## Features

- **PDF Upload & Processing**: Handles PDF file uploads and indexing
- **Vector Search**: Integrates with Pinecone for semantic search
- **AI Chat**: Uses Google Gemini for generating responses
- **RESTful API**: Clean API endpoints for frontend integration
- **Error Handling**: Comprehensive error handling and logging

## Technologies

- Express.js
- Multer (file uploads)
- LangChain (document processing)
- Google Gemini API (embeddings & text generation)
- Pinecone (vector database)

## API Endpoints

### GET /api/health
Health check endpoint
- Returns: `{ status: 'OK', message: 'Backend server is running' }`

### POST /api/upload-pdf
Upload and index a PDF document
- Body: FormData with 'pdf' file
- Returns: `{ message, filename, chunks }`

### POST /api/chat  
Send a chat message and get AI response
- Body: `{ message: string }`
- Returns: `{ response: string, context: string }`

### GET /api/chat-history
Get conversation history
- Returns: `{ history: array }`

### DELETE /api/chat-history
Clear conversation history
- Returns: `{ message: 'Chat history cleared' }`

## Environment Variables

Required environment variables (create .env in root directory):

```env
GEMINI_API_KEY=your_gemini_api_key
PINECONE_API_KEY=your_pinecone_api_key  
PINECONE_INDEX_NAME=your_pinecone_index_name
PORT=5000
```

## Running the Server

```bash
npm start
```

The server will start on port 5000 (or PORT environment variable).

## File Upload

- Accepts only PDF files
- Files are stored in `uploads/` directory
- Automatic file validation and error handling
- Files are processed and indexed into Pinecone vector database

## Error Handling

The API includes comprehensive error handling:
- File validation errors
- API key validation
- Vector database connection errors
- AI model errors
- General server errors