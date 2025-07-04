'use client'
import React, { useState } from 'react';
import { Box, Button, Card, CardContent, Container, LinearProgress, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useSnackbar } from '../../components/SnackbarProvider';

function PDFToWord() {
 const [file, setFile] = useState<File | null>(null);
 const [uploading, setUploading] = useState<boolean>(false);
 const [dragActive, setDragActive] = useState(false);
 const { showMessage } = useSnackbar();

 const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setFile(file);
    if (file) {
      showMessage(`Selected file: ${file.name} (${file.type})`, 'info');
    }
 };

 const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(true);
 };

 const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(false);
 };

 const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(false);
    const file = event.dataTransfer.files && event.dataTransfer.files[0];
    setFile(file);
    if (file) {
      showMessage(`Selected file: ${file.name} (${file.type})`, 'info');
    }
 };

 const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUploading(true);

    if (!file) {
      showMessage('Please select a PDF file first.', 'warning');
      setUploading(false);
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('https://' + process.env.NEXT_PUBLIC_API_DOMAIN + '/p2w', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = file.name.replace(/\.[^/.]+$/, ".docx"); // Change the file extension to .docx
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        const error = await response.json();
        showMessage(error.error || 'An error occurred while converting the file.', 'error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      showMessage('An error occurred while submitting the form.', 'error');
    } finally {
      setUploading(false);
    }
 };

 return (
    <Box>
      <br/>
      <hr/>
      <Typography align='center' sx={{ color: 'primary.main' }} variant="h3">PDF To Word</Typography>
      <hr/>
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Convert Your PDF to Word Document
            </Typography>
            {uploading && <LinearProgress />}
            <form onSubmit={handleSubmit} noValidate autoComplete="off">
              <Box
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                sx={{
                  border: dragActive ? '2px dashed #fab505' : '2px dashed #ccc',
                  borderRadius: 2,
                  p: 2,
                  mb: 2,
                  textAlign: 'center',
                  background: dragActive ? '#fffbe6' : 'transparent',
                  transition: 'background 0.2s',
                  cursor: 'pointer',
                }}
              >
                <input
                  accept=".pdf"
                  style={{ display: 'none' }}
                  id="raised-button-file"
                  type="file"
                  onChange={handleFileChange}
                />
                <label htmlFor="raised-button-file">
                  <Button variant="contained" component="span" color="secondary" startIcon={<CloudUploadIcon />} sx={{ mt: 2, mb: 2 }}>
                   Upload PDF
                  </Button>
                </label>
                <Typography variant="body2" sx={{ mt: 1 }}>{file ? `File: ${file.name} (${file.type})` : 'Drag and drop a PDF here, or click to select.'}</Typography>
              </Box>
              <Button type="submit" variant="contained" color="secondary" sx={{ mt: 2, display: 'block' }} disabled={uploading}>
                Convert to Word
              </Button>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Box>
 );
}

export default PDFToWord;
