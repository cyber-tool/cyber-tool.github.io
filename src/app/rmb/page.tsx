'use client'
import React, { useState } from 'react';
import { Box, Button, Card, CardContent, Container, Grid, LinearProgress, Typography, IconButton } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import GetAppIcon from '@mui/icons-material/GetApp';

function BackgroundRemove() {
 const [selectedFile, setSelectedFile] = useState<File | null>(null);
 const [originalPreview, setOriginalPreview] = useState<string>('');
 const [processedPreview, setProcessedPreview] = useState<string>('');
 const [uploadProgress, setUploadProgress] = useState<number>(0);
 const [isUploading, setIsUploading] = useState<boolean>(false);

 const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setSelectedFile(file);
      setOriginalPreview(URL.createObjectURL(file));
      setUploadProgress(0);
      setIsUploading(false);
    }
 };

 const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!selectedFile) {
      alert('Please select an image file first.');
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append('file', selectedFile);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://' + process.env.NEXT_PUBLIC_API_DOMAIN + '/rmbg', true);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentComplete = Math.round((event.loaded / event.total) * 100);
        setUploadProgress(percentComplete);
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        const blob = new Blob([xhr.response], { type: 'image/png' });
        setProcessedPreview(URL.createObjectURL(blob));
        setIsUploading(false);
      } else {
        alert('An error occurred while processing the image.');
        setIsUploading(false);
      }
      setUploadProgress(0);
    };

    xhr.onerror = () => {
      console.error('Error during the upload process.');
      alert('An error occurred while uploading the image.');
      setIsUploading(false);
      setUploadProgress(0);
    };

    xhr.responseType = 'blob';
    xhr.send(formData);
 };

 const handleDownload = () => {
    if (processedPreview) {
      const link = document.createElement('a');
      link.href = processedPreview;
      link.download = 'processed-image.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
 };

 return (
    <Box>
      <hr/>
      <Typography align='center' sx={{ color: 'primary.main' }} variant="h3">Image Background Remove</Typography>
      <hr/>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Upload your image
            </Typography>
            <Box sx={{ mb: 2 }}>
              {isUploading && (
                <LinearProgress variant={uploadProgress > 0 ? "determinate" : "indeterminate"} value={uploadProgress} />
              )}
            </Box>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="upload-image"
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="upload-image">
              <Button variant="contained" component="span" color="secondary" startIcon={<CloudUploadIcon />}>
                Upload Image
              </Button>
            </label>
            <Button variant="contained" color="secondary" onClick={handleSubmit} sx={{ ml: 2 }}>
              Remove Background
            </Button>
            {processedPreview && (
              <IconButton onClick={handleDownload} sx={{ ml: 2 }} color="secondary" aria-label="download" component="span">
                <GetAppIcon />
              </IconButton>
            )}
            <Grid container spacing={2} sx={{ mt: 2 }}>
              {originalPreview && (
                <Grid item xs={12} md={6}>
                 <Typography>Original Image</Typography>
                 <img src={originalPreview} alt="Original" style={{ width: '100%' }} />
                </Grid>
              )}
              {processedPreview && (
                <Grid item xs={12} md={6}>
                 <Typography>Processed Image</Typography>
                 <img src={processedPreview} alt="Processed" style={{ width: '100%' }} />
                </Grid>
              )}
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Box>
 );
}

export default BackgroundRemove;
