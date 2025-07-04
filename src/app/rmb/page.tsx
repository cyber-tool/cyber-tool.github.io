'use client'
import React, { useState } from 'react';
import { Box, Button, Card, CardContent, Container, Grid, LinearProgress, Typography, IconButton } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import GetAppIcon from '@mui/icons-material/GetApp';
import Image from 'next/image';
import { useSnackbar } from '../../components/SnackbarProvider';

function BackgroundRemove() {
 const [selectedFile, setSelectedFile] = useState<File | null>(null);
 const [originalPreview, setOriginalPreview] = useState<string>('');
 const [processedPreview, setProcessedPreview] = useState<string>('');
 const [uploadProgress, setUploadProgress] = useState<number>(0);
 const [isUploading, setIsUploading] = useState<boolean>(false);
 const [dragActive, setDragActive] = useState(false);
 const { showMessage } = useSnackbar();

 const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setSelectedFile(file);
      setOriginalPreview(URL.createObjectURL(file));
      setUploadProgress(0);
      setIsUploading(false);
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
    if (file) {
      setSelectedFile(file);
      setOriginalPreview(URL.createObjectURL(file));
      setUploadProgress(0);
      setIsUploading(false);
      showMessage(`Selected file: ${file.name} (${file.type})`, 'info');
    }
 };

 const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!selectedFile) {
      showMessage('Please select an image file first.', 'warning');
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
        showMessage('An error occurred while processing the image.', 'error');
        setIsUploading(false);
      }
      setUploadProgress(0);
    };

    xhr.onerror = () => {
      console.error('Error during the upload process.');
      showMessage('An error occurred while uploading the image.', 'error');
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
      <br/>
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
              <Typography variant="body2" sx={{ mt: 1 }}>
                {selectedFile ? `File: ${selectedFile.name} (${selectedFile.type})` : 'Drag and drop an image here, or click to select.'}
              </Typography>
            </Box>
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
                 <Image src={originalPreview} alt="Original" width={500} height={500} style={{ width: '100%', height: 'auto' }} />
                </Grid>
              )}
              {processedPreview && (
                <Grid item xs={12} md={6}>
                 <Typography>Processed Image</Typography>
                 <Image src={processedPreview} alt="Processed" width={500} height={500} style={{ width: '100%', height: 'auto' }} />
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
