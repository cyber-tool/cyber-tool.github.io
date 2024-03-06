import React, { useState } from 'react';
import { AppBar, Box, Button, Card, CardContent, Container, Grid, LinearProgress, Toolbar, Typography, IconButton } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import GetAppIcon from '@mui/icons-material/GetApp';

function BackgroundRemove() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [originalPreview, setOriginalPreview] = useState('');
  const [processedPreview, setProcessedPreview] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setOriginalPreview(URL.createObjectURL(file));
      setUploadProgress(0);
      setIsUploading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      alert('Please select an image file first.');
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append('file', selectedFile);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://' + process.env.REACT_APP_API_DOMAIN + '/rmbg', true);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentComplete = Math.round((event.loaded / event.total) * 100);
        setUploadProgress(percentComplete);
      }
    };

    xhr.onload = async () => {
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
    const link = document.createElement('a');
    link.href = processedPreview;
    link.download = 'processed-image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Background Removal Service</Typography>
        </Toolbar>
      </AppBar>
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
              <Button variant="contained" component="span" startIcon={<CloudUploadIcon />}>
                Upload Image
              </Button>
            </label>
            <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ ml: 2 }}>
              Remove Background
            </Button>
            {processedPreview && (
              <IconButton onClick={handleDownload} sx={{ ml: 2 }} color="primary" aria-label="download" component="span">
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
