import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip
} from '@mui/material';
import {
  CloudUpload,
  PictureAsPdf,
  CheckCircle,
  Error as ErrorIcon
} from '@mui/icons-material';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const PdfUpload = ({ onFileUploaded }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setUploading(true);
    setUploadStatus(null);

    const formData = new FormData();
    formData.append('pdf', file);

    try {
      const response = await axios.post(`${API_BASE_URL}/upload-pdf`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setUploadStatus({
        type: 'success',
        message: response.data.message,
        filename: response.data.filename,
        chunks: response.data.chunks
      });

      const fileInfo = {
        name: response.data.filename,
        chunks: response.data.chunks,
        uploadTime: new Date().toLocaleString()
      };

      setUploadedFiles([fileInfo]); // Replace previous file
      onFileUploaded(fileInfo);

    } catch (error) {
      setUploadStatus({
        type: 'error',
        message: error.response?.data?.error || 'Failed to upload PDF'
      });
    } finally {
      setUploading(false);
    }
  }, [onFileUploaded]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
    disabled: uploading
  });

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Upload Area */}
      <Paper
        {...getRootProps()}
        sx={{
          border: '2px dashed',
          borderColor: isDragActive ? 'primary.main' : 'grey.300',
          borderRadius: 2,
          p: 4,
          textAlign: 'center',
          cursor: uploading ? 'not-allowed' : 'pointer',
          backgroundColor: isDragActive ? 'action.hover' : 'background.paper',
          transition: 'all 0.3s ease',
          mb: 2,
          '&:hover': {
            borderColor: 'primary.main',
            backgroundColor: 'action.hover'
          }
        }}
      >
        <input {...getInputProps()} />
        
        {uploading ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <CircularProgress size={48} />
            <Typography variant="h6">Uploading and processing...</Typography>
            <Typography variant="body2" color="text.secondary">
              This may take a few moments
            </Typography>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <CloudUpload sx={{ fontSize: 48, color: 'primary.main' }} />
            <Typography variant="h6">
              {isDragActive ? 'Drop your PDF here' : 'Drag & drop a PDF file here'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              or click to select a file
            </Typography>
            <Button variant="contained" component="span" disabled={uploading}>
              Select PDF File
            </Button>
          </Box>
        )}
      </Paper>

      {/* Status Messages */}
      {uploadStatus && (
        <Alert 
          severity={uploadStatus.type} 
          sx={{ mb: 2 }}
          icon={uploadStatus.type === 'success' ? <CheckCircle /> : <ErrorIcon />}
        >
          {uploadStatus.message}
          {uploadStatus.chunks && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              Processed into {uploadStatus.chunks} chunks for better search
            </Typography>
          )}
        </Alert>
      )}

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" gutterBottom>
            Uploaded Files
          </Typography>
          <List>
            {uploadedFiles.map((file, index) => (
              <ListItem key={index} sx={{ px: 0 }}>
                <ListItemIcon>
                  <PictureAsPdf color="error" />
                </ListItemIcon>
                <ListItemText
                  primary={file.name}
                  secondary={
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mt: 0.5 }}>
                      <Typography variant="body2" color="text.secondary">
                        Uploaded: {file.uploadTime}
                      </Typography>
                      <Chip
                        label={`${file.chunks} chunks`}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      {/* Instructions */}
      <Box sx={{ mt: 'auto', pt: 2 }}>
        <Typography variant="body2" color="text.secondary">
          💡 <strong>Tips:</strong>
        </Typography>
        <Typography variant="body2" color="text.secondary" component="div">
          <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
            <li>Upload PDF documents up to 10MB</li>
            <li>The document will be processed and indexed for searching</li>
            <li>Once uploaded, you can chat with the content on the right</li>
          </ul>
        </Typography>
      </Box>
    </Box>
  );
};

export default PdfUpload;