'use client'
import React, { useState } from 'react';
import { Box, Button, Card, CardContent, Container, LinearProgress, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

function PDFToWord() {
 const [file, setFile] = useState<File | null>(null);
 const [uploading, setUploading] = useState<boolean>(false);

 const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files ? event.target.files[0] : null);
 };

 const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUploading(true);

    if (!file) {
      alert('Please select a PDF file first.');
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
        alert(error.error || 'An error occurred while converting the file.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the form.');
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
              <Typography variant="body2">{file ? `File: ${file.name}` : 'No file selected'}</Typography>
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
