# RAG PDF Chat Frontend

A React.js frontend for the RAG (Retrieval-Augmented Generation) PDF Chat application.

## Features

- **PDF Upload**: Drag and drop interface for uploading PDF documents
- **Real-time Chat**: Interactive chat interface to ask questions about uploaded PDFs
- **Material-UI Design**: Modern, responsive user interface
- **Two-Panel Layout**: 
  - Left panel: PDF upload and management
  - Right panel: Chat interface with the uploaded document
- **File Status**: Shows upload progress and processing status
- **Chat History**: Maintains conversation history during the session

## Technologies Used

- React.js 18
- Material-UI (MUI)
- Axios for API communication
- React Dropzone for file uploads

## Getting Started

### Prerequisites

- Node.js 16+ 
- Backend server running on http://localhost:5000

### Installation

```bash
# Install dependencies
npm install

# Start the development server
npm start
```

The application will open at http://localhost:3000

## Usage

1. **Upload a PDF**: 
   - Drag and drop a PDF file into the left panel
   - Or click to select a file
   - Wait for the file to be processed and indexed

2. **Start Chatting**:
   - Once the PDF is uploaded, the chat interface becomes active
   - Type questions about the document content
   - Get AI-powered responses based on the document

3. **Example Questions**:
   - "What is this document about?"
   - "Summarize the main points"
   - "Explain [specific topic] from the document"

## API Integration

The frontend communicates with the backend API at `http://localhost:5000/api` for:

- `/upload-pdf` - Upload and index PDF documents
- `/chat` - Send questions and receive AI responses
- `/chat-history` - Manage conversation history

## File Structure

```
src/
├── components/
│   ├── PdfUpload.js      # PDF upload component
│   └── ChatInterface.js  # Chat interface component
├── App.js                # Main application component
├── App.css               # Application styles
├── index.js              # Application entry point
└── index.css             # Global styles
```

## Features in Detail

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

## Environment Variables

No frontend-specific environment variables are required. The backend API URL is configured in the components.

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
