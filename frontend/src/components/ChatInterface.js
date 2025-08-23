import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  List,
  ListItem,
  Avatar,
  Chip,
  CircularProgress,
  Alert,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Send,
  Person,
  SmartToy,
  Clear,
  Info
} from '@mui/icons-material';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const ChatInterface = ({ enabled, uploadedFile }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Clear chat when new file is uploaded
  useEffect(() => {
    if (uploadedFile) {
      setMessages([]);
      setError(null);
    }
  }, [uploadedFile]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading || !enabled) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage.trim(),
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${API_BASE_URL}/chat`, {
        message: userMessage.content
      });

      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: response.data.response,
        timestamp: new Date().toLocaleTimeString(),
        context: response.data.context
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to get response');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/chat-history`);
      setMessages([]);
      setError(null);
    } catch (error) {
      console.error('Failed to clear chat history:', error);
    }
  };

  const MessageItem = ({ message }) => (
    <ListItem
      sx={{
        display: 'flex',
        flexDirection: message.type === 'user' ? 'row-reverse' : 'row',
        alignItems: 'flex-start',
        gap: 1,
        px: 1,
        py: 0.5
      }}
    >
      <Avatar
        sx={{
          bgcolor: message.type === 'user' ? 'primary.main' : 'secondary.main',
          width: 32,
          height: 32
        }}
      >
        {message.type === 'user' ? <Person /> : <SmartToy />}
      </Avatar>
      
      <Box sx={{ maxWidth: '80%' }}>
        <Paper
          sx={{
            p: 2,
            backgroundColor: message.type === 'user' ? 'primary.light' : 'grey.100',
            color: message.type === 'user' ? 'white' : 'text.primary',
          }}
        >
          <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
            {message.content}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              display: 'block',
              mt: 1,
              opacity: 0.7,
              textAlign: message.type === 'user' ? 'right' : 'left'
            }}
          >
            {message.timestamp}
          </Typography>
        </Paper>
        
        {message.context && (
          <Tooltip title="Context from PDF used for this response">
            <Chip
              icon={<Info />}
              label="Context available"
              size="small"
              variant="outlined"
              sx={{ mt: 0.5 }}
            />
          </Tooltip>
        )}
      </Box>
    </ListItem>
  );

  if (!enabled) {
    return (
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'text.secondary'
        }}
      >
        <SmartToy sx={{ fontSize: 64, mb: 2, opacity: 0.5 }} />
        <Typography variant="h6" gutterBottom>
          Upload a PDF to start chatting
        </Typography>
        <Typography variant="body2" textAlign="center">
          Once you upload a PDF document on the left, you'll be able to ask questions about its content here.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box>
          <Typography variant="body2" color="text.secondary">
            Chat with: <strong>{uploadedFile?.name}</strong>
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Processed into {uploadedFile?.chunks} searchable chunks
          </Typography>
        </Box>
        <Button
          startIcon={<Clear />}
          onClick={clearChat}
          size="small"
          variant="outlined"
          disabled={messages.length === 0}
        >
          Clear Chat
        </Button>
      </Box>

      {/* Messages Area */}
      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 1,
          backgroundColor: 'background.paper'
        }}
      >
        {messages.length === 0 ? (
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              p: 3,
              color: 'text.secondary'
            }}
          >
            <Typography variant="h6" gutterBottom>
              Start a conversation
            </Typography>
            <Typography variant="body2" textAlign="center">
              Ask questions about the uploaded PDF. For example:
            </Typography>
            <Box component="ul" sx={{ mt: 1, textAlign: 'left' }}>
              <li>"What is this document about?"</li>
              <li>"Summarize the main points"</li>
              <li>"Explain [specific topic] from the document"</li>
            </Box>
          </Box>
        ) : (
          <List sx={{ p: 0 }}>
            {messages.map((message) => (
              <MessageItem key={message.id} message={message} />
            ))}
            {isLoading && (
              <ListItem sx={{ justifyContent: 'center' }}>
                <CircularProgress size={24} />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  AI is thinking...
                </Typography>
              </ListItem>
            )}
            <div ref={messagesEndRef} />
          </List>
        )}
      </Box>

      {/* Error Message */}
      {error && (
        <Alert severity="error" sx={{ mt: 1 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Input Area */}
      <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
        <TextField
          fullWidth
          multiline
          maxRows={3}
          placeholder="Ask a question about your PDF..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
          variant="outlined"
          size="small"
        />
        <Button
          variant="contained"
          endIcon={<Send />}
          onClick={handleSendMessage}
          disabled={!inputMessage.trim() || isLoading}
          sx={{ minWidth: 'auto', px: 2 }}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default ChatInterface;