import React, { useState } from 'react';
import { Container, Grid, Box, Typography, AppBar, Toolbar } from '@mui/material';
import PdfUpload from './components/PdfUpload';
import ChatInterface from './components/ChatInterface';
import './App.css';

function App() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [chatEnabled, setChatEnabled] = useState(false);

  const handleFileUploaded = (fileInfo) => {
    setUploadedFile(fileInfo);
    setChatEnabled(true);
  };

  return (
    <div className="App">
      <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            RAG PDF Chat - Upload & Chat with your PDF
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="xl" sx={{ mt: 3, height: 'calc(100vh - 100px)' }}>
        <Grid container spacing={2} sx={{ height: '100%' }}>
          {/* Left Section - PDF Upload */}
          <Grid item xs={12} md={5}>
            <Box 
              sx={{ 
                height: '100%',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                p: 2,
                backgroundColor: '#f9f9f9'
              }}
            >
              <Typography variant="h5" gutterBottom color="primary">
                📄 Upload PDF Document
              </Typography>
              <PdfUpload onFileUploaded={handleFileUploaded} />
            </Box>
          </Grid>

          {/* Right Section - Chat Interface */}
          <Grid item xs={12} md={7}>
            <Box 
              sx={{ 
                height: '100%',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                p: 2,
                backgroundColor: '#f9f9f9'
              }}
            >
              <Typography variant="h5" gutterBottom color="primary">
                💬 Chat with your PDF
              </Typography>
              <ChatInterface 
                enabled={chatEnabled} 
                uploadedFile={uploadedFile}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
