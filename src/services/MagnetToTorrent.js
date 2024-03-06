import React, { useState } from 'react';
import { AppBar, Box, Button, Card, CardContent, Container, TextField, Toolbar, Typography, LinearProgress } from '@mui/material';

function MagnetToTorrent() {
  const [magnetLink, setMagnetLink] = useState('');
  const [downloading, setDownloading] = useState(false);

  const handleChange = (event) => {
    setMagnetLink(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setDownloading(true);

    if (!magnetLink) {
      alert('Please paste a magnet link first.');
      setDownloading(false);
      return;
    }

    try {
      const response = await fetch('https://' + process.env.REACT_APP_API_DOMAIN + '/m2t', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `magnet_link=${encodeURIComponent(magnetLink)}`,
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'downloaded_torrent.torrent';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        const error = await response.json();
        alert(error.error || 'An error occurred while converting the magnet link.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the form.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Magnet To Torrent</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Paste Magnet Link
            </Typography>
            {downloading && <LinearProgress />}
            <form onSubmit={handleSubmit} noValidate autoComplete="off">
              <TextField
                label="Magnet Link"
                variant="outlined"
                fullWidth
                value={magnetLink}
                onChange={handleChange}
                sx={{ mt: 2, mb: 2 }}
              />
              <Button type="submit" variant="contained" color="primary" disabled={downloading} sx={{ display: 'block' }}>
                Convert and Download
              </Button>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default MagnetToTorrent;
