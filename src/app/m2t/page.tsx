'use client'
import React, { useState, FormEvent } from 'react';
import { Box, Button, Card, CardContent, Container, TextField, Typography, LinearProgress, useTheme } from '@mui/material';
import { useSnackbar } from '../../components/SnackbarProvider';

function MagnetToTorrent() {

  const theme = useTheme();
  const { showMessage } = useSnackbar();

 const [magnetLink, setMagnetLink] = useState('');
 const [downloading, setDownloading] = useState(false);

 const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMagnetLink(event.target.value);
 };

 const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setDownloading(true);

    if (!magnetLink) {
      showMessage('Please paste a magnet link first.', 'warning');
      setDownloading(false);
      return;
    }

    try {
      const response = await fetch('https://' + process.env.NEXT_PUBLIC_API_DOMAIN + '/m2t', {
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
        showMessage(error.error || 'An error occurred while converting the magnet link.', 'error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      showMessage('An error occurred while submitting the form.', 'error');
    } finally {
      setDownloading(false);
    }
 };

 return (
    <Box>
      <br/>
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
                rows={6}
                onChange={handleChange}
                sx={{
                  mt: 2, mb: 2,
                  '& .MuiInputBase-input': {
                    color: theme.palette.secondary.dark,
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: theme.palette.secondary.dark,
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.secondary.contrastText,
                  },
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.secondary.dark,
                  },
                }}
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
