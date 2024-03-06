import React, { useState } from 'react';
import { AppBar, Box, Button, Card, CardContent, Container, LinearProgress, Toolbar, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

function TorrentToMagnet() {
  const [file, setFile] = useState(null);
  const [magnetLink, setMagnetLink] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setUploading(true);

    if (!file) {
      alert('Please select a file first.');
      setUploading(false);
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('https://' + process.env.REACT_APP_API_DOMAIN + '/t2m', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setMagnetLink(result.magnet_link);
      } else {
        alert(result.error || 'An error occurred while converting the file.');
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
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Torrent to Magnet</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Convert Torrent to Magnet
            </Typography>
            {uploading && <LinearProgress />}
            <form onSubmit={handleSubmit} noValidate autoComplete="off">
              <input
                accept=".torrent"
                style={{ display: 'none' }}
                id="raised-button-file"
                multiple
                type="file"
                onChange={handleFileChange}
              />
              <label htmlFor="raised-button-file">
                <Button variant="contained" component="span" startIcon={<CloudUploadIcon />} sx={{ mt: 2, mb: 2 }}>
                  Upload Torrent
                </Button>
              </label>
              <Typography variant="body2">{file ? `File: ${file.name}` : 'No file selected'}</Typography>
              <Button type="submit" variant="contained" color="primary" sx={{ mt: 2, display: 'block' }}>
                Convert
              </Button>
            </form>
          </CardContent>
        </Card>
        {magnetLink && (
          <Typography variant="body1" gutterBottom sx={{ mt: 2 }}>
            Magnet Link: <a href={magnetLink}>{magnetLink}</a>
          </Typography>
        )}
      </Container>
    </Box>
  );
}

export default TorrentToMagnet;
