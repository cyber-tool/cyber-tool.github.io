import React, { useState } from 'react';
import { Box, Button, Card, CardContent, Container, TextField, Typography, LinearProgress } from '@mui/material';

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

        const nameMatch = magnetLink.match(/&dn=([^&]+)/);
        const hashMatch = magnetLink.match(/btih:([^&]+)/);
        let fileName = 'downloaded_torrent';
        if (nameMatch && nameMatch[1]) {
          fileName = decodeURIComponent(nameMatch[1]);
        } else if (hashMatch && hashMatch[1]) {
          fileName = hashMatch[1];
        }

        const a = document.createElement('a');
        a.href = url;
        a.download = `${fileName}.torrent`;
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
        <hr/>
          <Typography align='center' sx={{ color: 'primary.main' }} variant="h3">Magnet To Torrent</Typography>
        <hr/>
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
                multiline
                rows={4}
                onChange={handleChange}
                sx={{ mt: 2, mb: 2 }}
                color='secondary'
              />
              <Button type="submit" variant="contained" color="secondary" disabled={downloading} sx={{ display: 'block' }}>
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
