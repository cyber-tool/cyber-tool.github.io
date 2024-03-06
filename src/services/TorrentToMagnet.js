import React, { useState } from 'react';
import { AppBar, Box, Button, Card, CardContent, Container, LinearProgress, Toolbar, Typography, TextField, IconButton, Tooltip } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FileCopyIcon from '@mui/icons-material/FileCopy';

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

  const handleCopy = async () => {
    if (magnetLink) {
      await navigator.clipboard.writeText(magnetLink);
      // alert('Copied to clipboard!');
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
        <Box sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Magnet Link"
            variant="outlined"
            value={magnetLink}
            multiline
            rows={4} // Adjust the number of rows as needed
            InputProps={{
              endAdornment: (
                <Tooltip title="Copy">
                  <IconButton onClick={handleCopy}>
                    <FileCopyIcon />
                  </IconButton>
                </Tooltip>
              ),
            }}
            sx={{ mt: 2 }}
          />
        </Box>
      )}
      </Container>
    </Box>
  );
}

export default TorrentToMagnet;
