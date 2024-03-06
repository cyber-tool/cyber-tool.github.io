import React, { useState } from 'react';
import { AppBar, Box, Button, Card, CardContent, Container, Grid, Toolbar, Typography, IconButton } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import GetAppIcon from '@mui/icons-material/GetApp';

function BackgroundRemove() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [originalPreview, setOriginalPreview] = useState('');
  const [processedPreview, setProcessedPreview] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setOriginalPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      alert('Please select an image file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('https://' + process.env.REACT_APP_API_DOMAIN + '/rmbg', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const blob = await response.blob();
      setProcessedPreview(URL.createObjectURL(blob));
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while processing the image.');
    }
  };

  // Function to handle the download of the processed image
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = processedPreview;
    link.download = 'processed-image.png'; // Or any name you want
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
            {/* Conditionally rendering the download button only if there's a processed image */}
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
